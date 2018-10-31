<template>
  <div class="header">
    <!-- 顶部通栏 开始 -->
    <div class="top-wrapper">
			<div class="back-wrapper">
				<span class="icon-arrow_lift"></span>
			</div>

			<form class="search-wrapper">
				<span class="search-icon"></span>
				<input class="search-bar" type="text" placeholder="搜索店内商品" />
			</form>

			<div class="more-wrapper">
				<a class="spelling-bt" href="#">拼单</a>
				<div class="more-bt">
					<i class="s-radius"></i>
					<i class="s-radius"></i>
					<i class="s-radius"></i>
				</div>
			</div>
		</div>
    <!-- 顶部通栏 结束 -->

    <!-- 主题内容 开始 -->
    <div class="content-wrapper">
			<div class="icon" :style="head_bg"></div>
			<div class="name">
				<h3>{{poiInfo.name}}</h3>
			</div>
			<div class="collect">
				<img src="./img/star.png" />
				<span>收藏</span>
			</div>
		</div>
    <!-- 主题内容 结束 -->

    
    <!-- 公告内容 开始 -->
    <div class="bulletin-wrapper">
			<img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" />

			<span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
			<div class="detail" v-if="poiInfo.discounts2" @click="showBulletin">
				{{poiInfo.discounts2.length}}个活动
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div> 

    <!-- 公告内容 结束 -->

     <!-- 背景内容 开始 -->
    <div class="bg-wrapper" :style="head_pic_url"></div>
    <!-- 背景内容 结束 -->
    <transition name="bulletin-detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper" @click="closeBulletin">
          <!-- 相关内容容器 -->
          <div class="main-wrapper" :style="detail_bg" @click.stop>
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfo.name}}</h3>
            <!-- 星级评价 -->
            <div class="score">
              <app-star :score="poiInfo.wm_poi_score"></app-star>
              <span>{{poiInfo.wm_poi_score}}</span>
            </div>

            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i> {{poiInfo.shipping_fee_tip}} <i>|</i> {{poiInfo.delivery_time_tip}}
            </p>

            <p class="time">
              配送时间: {{poiInfo.shipping_time}}
            </p>

            <div class="discounts" v-if="poiInfo.discounts2">
              <p>
                <img :src="poiInfo.discounts2[0].icon_url" />
                <span>{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>

          <!-- 关闭内容容器 -->
          <div class="close-wrapper">
            <span class="icon-close" @click="closeBulletin"></span>
          </div>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import Star from '../star/Star'
export default {
  data(){
    return {
      isShow:false
    }
  },
  props:{
    poiInfo:{
      type:Object,
      default:{}
    }
  },
  components:{
    "app-star":Star
  },
  computed:{
    head_pic_url(){
      return `background-image: url(${ this.poiInfo.head_pic_url })`
    },
    head_bg() {
      return `background-image: url(${ this.poiInfo.pic_url })`
    },
    detail_bg() {
      return `background-image: url(${ this.poiInfo.poi_back_pic_url })`
    }
  },
  methods: {
    showBulletin() {
      this.isShow = true;
    },
    closeBulletin() {
      this.isShow = false;
    }
  }
}
</script>

<style scoped>
@import url(../../common/css/icon.css);

.header {
  height: 130px;
  padding-top: 20px;
}


/* 顶部通栏样式 */
.header .top-wrapper {
	position: relative;
}

.header .top-wrapper .back-wrapper {
  position: absolute;
  left:0;
  top: 0;
  width: 50px;
  height: 31px;
  line-height: 31px;
  text-align: center;
}

.header .top-wrapper .back-wrapper span {
  display: inline-block;
  color: white;
}

.header .top-wrapper .search-wrapper {
  width: 100%;
  padding: 0 104px 0 50px;
  /* background-color: pink; */
  box-sizing: border-box;
}

.header .top-wrapper .search-wrapper .search-icon {
  width: 28px;
  height: 31px;
  background: url(./img/search.png) no-repeat 11px center;
  background-size: 13px 13px;
  position: absolute;
}

.header .top-wrapper .search-wrapper .search-bar {
  height: 31px;
  width: 100%;
  border: 0;
  padding-left: 28px;
  line-height: 31px;
  border-radius: 25px;
   /* 去除选中时蓝色边框*/
   outline: none;
}

.header .top-wrapper .more-wrapper {
  width: 65px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px 5px 0 24px;
}


.header .top-wrapper .more-wrapper .spelling-bt {
  float: left;
  width: 30px;
  height: 17px;
  border: 1px solid #fff;
  color: #fff;
  text-decoration: none;
  line-height: 17px;
  text-align: center;
  font-size: 10px;
}

.header .top-wrapper .more-wrapper .more-bt {
  float: right;
  width: 20px;
  height: 24px;
  margin-left: 13px;
  margin-top: 6px;
}

.header .top-wrapper .more-wrapper .more-bt .s-radius {
  float: left;
  margin-right: 1px;
  width: 3px;
  height: 3px;
  border: 1px solid white;
  border-radius: 50%;
}


/* 背景 */
.header .bg-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 150px;
  background-size: 100% 135%;
  background-position: center -12px;
  z-index: -1;
}

/* 主题内容样式 */
.header .content-wrapper {
  padding: 17px 10px 11px;
}

.header .content-wrapper .icon {
  float: left;
  width: 50px;
  height: 50px;
  background-size: 135% 100%;
  background-position: center;
  border-radius: 5px;
}

.header .content-wrapper .name {
  float: left;
  padding: 18px 0 0 12px;
}

.header .content-wrapper .name h3 {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.header .content-wrapper .collect {
  float: right;
  padding-top: 6px;
  width: 25px;
  height: 37px;
  text-align: center;
}

.header .content-wrapper .collect img {
  width: 20px;
  height: 20px;
}

.header .content-wrapper .collect span {
  display: inline-block;
  margin-top: 7px;
  color: #fff;
  font-size: 11px;
}


/* 公告内容样式 */
.header .bulletin-wrapper {
  height: 16px;
  padding: 0 10px;
}

.header .bulletin-wrapper .icon {
  float: left;
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

.header .bulletin-wrapper .text {
  float: left;
  font-size: 11px;
  color: #fff;
  line-height: 16px;
}

.header .bulletin-wrapper .detail {
  float: right;
  color: #fff;
  font-size: 11px;
  line-height: 16px;
}

.header .bulletin-wrapper .detail span {
  float: right;
  font-size: 16px;
  line-height: 16px;
}

/* 公告样式 */
.header .bulletin-detail {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(98, 98, 98, 0.8);
  z-index: 999;
}

.header .bulletin-detail .detail-wrapper {
  width: 100%;
  height: 100%;
  padding: 43px 20px 125px;
  box-sizing: border-box;
}
	
.header .bulletin-detail .detail-wrapper .main-wrapper {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  border-radius: 10px;
  text-align: center;
}
	
.header .bulletin-detail .detail-wrapper .main-wrapper .icon {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-top: 40px;
  background-size: 135% 100%;
  background-position: center;
  border-radius: 5px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .name {
  margin-top: 13px;
  font-size: 15px;
  color: #fff;
}
	
.header .bulletin-detail .detail-wrapper .main-wrapper .score {
  height: 10px;
  margin-top: 6px;
  text-align: center;
  font-size: 0;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score .star {
  display: inline-block;
  margin-right: 7px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score span {
  display: inline-block;
  font-size: 10px;
  color: #fff;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .tip {
  margin-top: 8px;
  font-size: 11px;
  color: #bababc;
}
	
.header .bulletin-detail .detail-wrapper .main-wrapper .tip i {
  margin: 0 7px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .time {
  margin-top: 13px;
  font-size: 11px;
  color: #bababc;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts {
  margin-top: 20px;
  padding: 0 20px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts p {
  padding-top: 20px;
  border-top: 1px solid #BABABC;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts span {
  font-size: 11px;
  line-height: 16px;
  color: #fff;
}

.header .bulletin-detail .detail-wrapper .close-wrapper {
  padding-top: 20px;
  height: 40px;
  text-align: center;
}

.header .bulletin-detail .detail-wrapper .close-wrapper span {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(140, 140, 140, 0.9);
  font-size: 14px;
  line-height: 40px;
  color: #fff;
  background: rgba(118, 118, 118, 0.7);
  border-radius: 50%;
}

/* 公告过度动画 */
.bulletin-detail-enter-active,
.bulletin-detail-leave-active {
  transition: all .6s;
}

.bulletin-detail-enter,
.bulletin-detail-leave-to {
  opacity: 0;
}

.bulletin-detail-enter .detail-wrapper .main-wrapper,
.bulletin-detail-leave-to .detail-wrapper .main-wrapper{
  transition: all .6s;
  transform: translate(0,20%)
}

.bulletin-detail-leave,
.bulletin-detail-enter-to  {
  opacity: 1;
}

.bulletin-detail-leave .detail-wrapper .main-wrapper,
.bulletin-detail-enter-to .detail-wrapper .main-wrapper{
  transition: transform .6s;
  transform: translate(0,0)
} 

</style>

