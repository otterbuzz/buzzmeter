<template>
  <div class="container">
    <div class="row">
      <div class="col s4">
        <div v-for="i in array" :key="i" class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="trendName card-title">#BalanceTonYoutubeur</span>
            <span class="tendance">
              <i class="material-icons">trending_up</i>
              <p>+12.32%</p>
            </span>
          </div>
        </div>
      </div>
      <div class="col s8">
        <div v-for="i in arr" :key="i" class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">@UnRandomDébilos - 17:28:54</span>
            <p>Abusé le comportement de Norman, il faudrait le tuer je pense jpp...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Dashboard',
  data () {
    return {
      array: [1, 2, 3, 4, 5, 6, 7, 8],
      arr: [1, 2, 3, 4, 5, 6, 7]
    }
  }
}
</script>

<style>
.tendance i{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 3em;
}

.tendance p{
  position: absolute;
  right: 10px;
  top: 48px;;
}
</style>
