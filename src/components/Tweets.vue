<template>
  <div class="buzzTweets text-buzzGrey" ref="tweetList">
    <h1 style="display: none;">{{ hashtag }}</h1>
    <div class="tweets">
      <Tweet v-if="displayMode == 'Tweets'" v-for="tweet in tweets" :id="tweet.id_str" :key="tweet.id">
        <div v-if="tweet.id == tweets[0].id" class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </Tweet>
      <div v-if="displayMode == 'Basic'" v-for="tweet in tweets" :key="tweet.id" class="card mb-3 text-buzzGrey">
        <div class="card-header">{{ "@" + tweet.user.screen_name }} - {{ tweet.created_at.split(' +')[0] }} - {{ tweet.favorite_count }} FAV - {{ tweet.retweet_count }} RT</div>
        <div class="card-body text-dark">
          <p class="card-text">{{ tweet.full_text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Tweet } from 'vue-tweet-embed'
export default {
  name: 'Tweets',
  props: ['hashtag', 'displayMode'],
  data() {
    return {
      tweets: null,
      currentHashtag: null
    }
  },
  components: {
    Tweet
  },
  beforeUpdate() {
    if (this.hashtag && this.currentHashtag != this.hashtag) {
      axios
        .get('http://localhost:3000/tweets?hashtag=' + this.hashtag.replace('#', ''))
        .then(response => {
          this.tweets = response.data.statuses
          this.currentHashtag = this.hashtag
        })
    }
  }
}
</script>

<style>
  .buzzTweets .card {
    margin: 10px 0;
  }
  
  .spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #ef8239;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
</style>
