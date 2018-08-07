<template>
  <div class="container">
    <div class="row">
      <div class="topics col-4">
        <div v-for="(topic, index) in trendingTopics" :key="index"  class="card bg-light mb-3">
          <div class="card-body" @click="browseHashtag(topic.name)">
            <h5 class="card-title">{{ topic.name }}<span class="text-muted" v-if="topic.tweet_volume"> - {{ topic.tweet_volume }}</span></h5>
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
      hashtag: null
    }
  },
  components: {
    Tweets
  },
  methods: {
    browseHashtag(hashtag) {
      this.hashtag = hashtag
    }
  },
  mounted(){
    axios
      .get('http://localhost:3000/trending')
      .then(response => this.trendingTopics = response.data[0].trends)

  }
}

</script>

<style>
.topics .card {
  cursor: pointer;
  height: 4em;
}
</style>
