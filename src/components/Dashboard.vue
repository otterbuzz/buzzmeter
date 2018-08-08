<template>
  <div class="buzzDashboard container" ref="top">
    <div class="refreshBar progress">
      <div class="progress-bar bg-buzzOrange" role="progressbar" :style="'width: ' + count + '%'" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="row">
      <div class="topics col-6">
        <div v-for="(topic, index) in trendingTopics" :key="index" class="card bg-buzzGrey text-white mb-3">
          <div class="card-body" v-scroll-to="'.buzzNavbar'" @click="displayTweets(topic.name)">
            <h5 class="card-title" :class="{ 'text-buzzOrange': topic.name == hashtag }">{{ topic.name }}</h5>
            <p class="tweetCount card-text text-right" v-if="topic.tweet_volume">{{ topic.tweet_volume }} tweets</p>
          </div>
        </div>
      </div>
      <div class="col-6">
        <Tweets :hashtag="hashtag" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Tweets from '@/components/Tweets'
export default {
  name: 'Dashboard',
  data() {
    return {
      trendingTopics: null,
      hashtag: null,
      count: 0
    }
  },
  components: {
    Tweets
  },
  methods: {
    displayTweets(hashtag) {
      this.hashtag = hashtag
      this.$nextTick(() => {
        this.$refs.top.scrollTop = 0;
      })
    }
  },
  mounted(){
    setInterval(() => {
        if (this.count == 0) {
          axios
            .get('http://localhost:3000/trending')
            .then(response => {
              this.trendingTopics = response.data[0].trends
              this.hashtag = this.hashtag ? this.hashtag : response.data[0].trends[0].name
            })
        }
        this.count = (this.count + 1) % 100
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

.buzzDashboard .tweetCount {
  font-size: 0.9em;
}
</style>
