<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

/*Colors and fonts */
.text-buzzOrange {
  color: #ef8239
}
.bg-buzzOrange {
  background-color: #ef8239
}
.text-buzzGrey {
  color: #363636
}
.bg-buzzGrey {
  background-color: #363636
}
.lobster {
  font-family: 'Lobster';
}
</style>
