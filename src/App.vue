<template>
  <div id="app">
    <!-- header -->
    <app-header :poiInfo="poiInfo"></app-header>
    <!-- nav -->
    <div class="nav">
      <app-nav></app-nav>
    </div>
    <!-- content -->
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Header from './components/header/Header'
import Nav from './components/nav/Nav'

export default {
  components: {
    "app-header":Header,
    "app-nav":Nav
  },
  data() {
    return {
      poiInfo:{}
    }
  },
  created() {
    this.$axios.get('/api/goods').then(res => {
      if(res.data.code == 0) {
        this.poiInfo = res.data.data.poi_info;
      }
    })
  }
}
</script>

<style>

</style>
