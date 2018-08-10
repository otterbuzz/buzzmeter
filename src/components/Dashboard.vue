<template>
  <div class="buzzDashboard container">
    <div class="refreshBar progress">
      <div class="progress-bar bg-buzzOrange" role="progressbar" :style="'width: ' + count + '%'" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="row">
      <div class="topics col-4">
        <div v-for="(topic, index) in trendingTopics" :key="index" class="card bg-buzzGrey text-white mb-3">
          <div class="card-body" v-scroll-to="'.buzzNavbar'" @click="displayTweets(topic.name, 'Tweets')" @click.ctrl="displayTweets(topic.name, 'Basic')">
            <h5 class="card-title" :class="{ 'text-buzzOrange': topic.name == hashtag }">{{ topic.name }}</h5>
            <p class="tweetCount card-text text-right" v-if="topic.tweet_volume">{{ topic.tweet_volume }} tweets</p>
          </div>
        </div>
      </div>
      <div class="col-8">
        <h2>{{ hashtag }} </h2>
        <Linechart class="chart" :styles="{height: '400px', position: 'relative'}" :chart-data="datacollection" :options="{layout: {
            padding: {
                left: 10,
                right: 23,
                top: 23,
                bottom: 10
            }
        }, legend: { display: false }, responsive: true, maintainAspectRatio: false}"/>
        <Tweets class="tweets" :hashtag="hashtag" :displayMode="displayMode"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Tweets from '@/components/Tweets'
import Linechart from '@/components/Linechart'
export default {
  name: 'Dashboard',
  data() {
    return {
      trendingTopics: null,
      hashtag: null,
      displayMode: 'Tweets',
      count: 0,
      datacollection: null
    }
  },
  components: {
    Tweets,
    Linechart
  },
  methods: {
    shuffle(array) {
      let counter = array.length;
      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          let index = Math.floor(Math.random() * counter);
          // Decrease counter by 1
          counter--;
          // And swap the last element with it
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      return array;
    },
    fillData () {
      this.datacollection = {
        labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40'],
        datasets: [
          {
            label: 'tweets',
            borderColor: '#ef8239',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ef8239',
            pointBorderColor: '#ef8239',
            data: this.shuffle([40, 54, 48, 38, 61, 47, 51, 50, 49])
          }
        ]
      }
    },
    displayTweets(hashtag, displayMode) {
      this.hashtag = hashtag
      this.displayMode = displayMode
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
              this.hashtag = this.hashtag ? this.hashtag : response.data[0].trends[0].name
            })
        }
        this.count = (this.count + 1) % 100
    }, 1000);

    this.fillData()
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
