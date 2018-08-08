<template>
<div>
  <h1>{{ hashtag }}</h1>
  <div class="tweet card bg-dark text-white" v-for="(tweet, index) in tweets" :key="index">
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ tweet.full_text}}</p>
        <footer class="blockquote-footer">{{ '@' + tweet.user.screen_name }} |<span class="text-warning"> {{tweet.retweet_count }} RT</span> | <span class="text-warning"> {{tweet.favorite_count }} FAV</span> | {{ tweet.created_at }}</footer>
      </blockquote>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Tweets',
  props: ['hashtag'],
  data() {
    return {
      tweets: null,
      currentHashtag: null
    }
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
.tweet {
  margin: 10px 0;
}
</style>
