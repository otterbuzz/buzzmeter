<template>
  <div class="buzzDashboard container">
    <div class="refreshBar progress">
      <div class="progress-bar bg-buzzOrange" role="progressbar" :style="'width: ' + count + '%'" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="row">
      <div class="topics col-4">
        <div v-for="(topic, index) in trendingTopics" :key="index" class="card bg-buzzGrey text-white mb-3">
          <div class="card-body" v-scroll-to="'.buzzNavbar'" @click="getTweetsAndStats(topic.name)">
            <h5 class="card-title" :class="{ 'text-buzzOrange': topic.name == selectedTopic }">{{ topic.name }}</h5>
            <p class="tweetCount card-text text-right" v-if="topic.tweet_volume">{{ topic.tweet_volume }} tweets</p>
          </div>
        </div>
      </div>
      <div class="col-8">
        <Linechart class="chart" :styles="{height: '400px', position: 'relative'}" :chart-data="datacollection"/>
        <TweetList class="tweets" :tweets="tweets" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TweetList from '@/components/Tweetlist'
import Linechart from '@/components/Linechart'
export default {
  name: 'Dashboard',
  data() {
    return {
      trendingTopics: null,
      tweets: null,
      selectedTopic: null,
      count: 0,
      datacollection: null
    }
  },
  components: {
    TweetList,
    Linechart
  },
  methods: {
    fillData(labels, data) {
      this.datacollection = {
        labels: labels,
        datasets: [
          {
            label: 'tweets',
            borderColor: '#ef8239',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ef8239',
            pointBorderColor: '#ef8239',
            data: data
          }
        ]
      }
    },
    getTweetsAndStats(hashtag) {
      this.selectedTopic = hashtag
      axios
        .get('http://localhost:3000/tweets?hashtag=' + hashtag.replace('#', ''))
        .then(response => {

          let metrics = response.data.trends[hashtag]
          let labels = metrics.map( metric => metric[0])
          let data = metrics.map( metric => metric[1])
          this.fillData(labels, data)
          this.tweets = response.data.statuses
        })
    }
  },
  mounted(){
    setInterval(() => {
        if (this.count == 0) {
          axios
            .get('http://localhost:3000/trending')
            .then(response => {
              this.trendingTopics = response.data[0].trends.sort((b, a) => {
                return (a.tweet_volume > b.tweet_volume) ? 1 : ((b.tweet_volume > a.tweet_volume) ? -1 : 0)
              })
              if (!this.tweets) {
                this.getTweetsAndStats(this.trendingTopics[0].name)
              }
            })
        }
        this.count = (this.count + 1) % 120
    }, 1000);
  }
}

</script>

<style>
.buzzDashboard .topics .card {
  cursor: pointer;
}

.buzzDashboard .refreshBar {
  margin: 18px 0;
}

.buzzDashboard .tweets {
  margin: auto;
  width: 500px;
}

.buzzDashboard .tweetCount {
  font-size: 0.9em;
}

.chart {
  margin: 10px 0 24px 0;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(54, 54, 54, 0.3);
}
</style>
