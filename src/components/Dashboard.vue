<template>
  <div class="container">
    <div class="refreshBar progress">
      <div class="progress-bar bg-warning" role="progressbar" :style="'width: ' + count + '%'" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="row">
      <div class="topics col-4">
        <div v-for="(topic, index) in trendingTopics" :key="index"  class="card bg-dark text-white mb-3">
          <div class="card-body" @click="displayTweets(topic.name)">
            <h5 class="card-title">{{ topic.name }}</h5>
            <p class="tweetCount card-text text-right text-warning" v-if="topic.tweet_volume">{{ topic.tweet_volume }} tweets</p>
          </div>
        </div>
      </div>
      <div class="col-8">
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
.topics .card {
  cursor: pointer;
}

.refreshBar {
  margin: 18px 0;
}

.tweetCount {
  font-size: 0.9em;
}
</style>
