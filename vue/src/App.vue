<template>
  <div id="app">
    
    <TheMenu/>
    <TheHeader/>
    <ThePage/>
    <ToastMessage :newToast="$store.state.toastMessage.toast"/>
  </div> 
  
  
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
import ThePage from './components/layout/ThePage.vue'
import ToastMessage from './components/base/ToastMessage/index.vue'

export default {
  name: 'App',
  components: {
    TheHeader, TheMenu,
    ThePage, ToastMessage
  }
}
</script>

<style lang='css' src='./css/layout/main.css'>
  /* @import url('css/layout/main.css'); */
</style>
