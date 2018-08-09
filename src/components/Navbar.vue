<template>
  <nav class="buzzNavbar navbar navbar-dark bg-buzzGrey">
    <div class="navTitle navbar-brand">
      <i class="material-icons text-buzzOrange">whatshot</i>
      <span class="lobster font-weight-light">Otter Buzz</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      displayMode: 'Tweets'
    }
  },
  methods: {
    toggleDisplayMode() {
      this.displayMode = this.displayMode == 'Tweets' ? 'Basic' : 'Tweets'
    }
  }
}
</script>

<style>

.buzzNavbar .navTitle{
  font-size: 2em;
}

.buzzNavbar .navTitle i{
  vertical-align: -15%;
  font-size: 1em;
}

</style>
