<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item">
      点餐
      <i class="line"></i>
    </router-link>
    <router-link to="/ratings" class="nav-item">
      评价
      <i class="line"></i>
    </router-link>
    <router-link to="/seller" class="nav-item">
      商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style>
.nav {
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #e4e4e4;
    line-height: 40px;
}

.nav-item {
    position: relative;
    flex: 1;
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    color: #666;
}
.nav .active {
  color: #FFBB22;
}
.nav .active .line {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 20px;
  height: 2px;
  display: inline-block;
  background-color: #ffbb22;
  transform: translateX(-50%);
}
</style>


