<template>
  <div id="app">
    <TheHeader/>
    <TheMenu/>
    <ThePage/>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
import ThePage from './components/layout/ThePage.vue'

export default {
  name: 'App',
  components: {
    TheHeader, TheMenu, ThePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
