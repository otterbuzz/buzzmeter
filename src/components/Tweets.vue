<template>
<div class="container">
  <h1>{{ hashtag }}</h1>
  <div v-for="(tweet, index) in tweets" :key="index">
    <h5>{{ tweet.user.screen_name }}</h5>
    <p class="text-muted">{{ tweet.full_text }}</p>
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

</style>
