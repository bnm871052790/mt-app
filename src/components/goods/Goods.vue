<template>
    <div class="goods">
        <!-- 左 -->
        <div class="menu-wrapper" ref="menuScroll">
            <ul>
                <!-- 专场 -->
                <li class="menu-item" :class="{'current':currentIndex === 0}" @click="selectMenu(0)">
                    <p class="text">
                        <img :src="container.tag_icon" class="icon" v-if="container.tag_icon">
                        {{container.tag_name}}
                    </p>   
                </li>
                <!-- 其他菜单 -->
                <li class="menu-item" v-for="(item,index) in goods" :key="index"  :class="{'current':currentIndex === index + 1}" @click="selectMenu(index + 1)">
                    <p class="text">
                        <img :src="item.icon" v-if="item.icon" class="icon">
                        {{item.name}}
                    </p>
                    <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
                </li>
            </ul>
        </div>
        <!-- 右 -->
        <div class="foods-wrapper"  ref="foodScroll">
            <ul>
                <!-- 专场 -->
                <li class="container-list food-list-hook">
                     <div v-for="(item,index) in container.operation_source_list" :key="index">
                        <img :src="item.pic_url">
                    </div>
                </li>
                <!-- 其他内容 -->
                <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
                    <h3 class="title">
                        {{item.name}}
                    </h3>
                    <ul>
                        <li class="food-item" v-for="(food,index) in item.spus" :key="index" @click="showDetail(food)">
                            <div class="icon" :style="head_bg(food.picture)"></div>
                            <div class="content">
                                <h3 class="name">{{food.name}}</h3>
                                <p class="desc" v-if="food.description">{{food.description}}</p>
                                <div class="extra">
                                    <span class="saled">{{food.month_saled_content}}</span>
                                    <span class="praise">{{food.praise_content}}</span>
                                </div>
                                <img class="product" :src="food.product_label_picture">
                                <p class="price">
                                <span class="text">${{food.min_price}}</span>
                                <span class="unit">/{{food.unit}}</span>
                                </p>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <app-cartcontrol :food="food"></app-cartcontrol>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 购物车 -->
        <app-shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></app-shopcart>

        <!-- 商品详情 -->
       <app-product-detail :food="selectFood" ref="foodView"></app-product-detail>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import Shopcart from '../shopcart/Shopcart'
import CartControl from '../cartcontrol/CartControl'
import ProductDetail from '../productDetail/ProductDetail'

export default {
    data() {
        return {
            container:{},
            goods:[],
            poiInfo:{},
            listHeight:[],
            menuScroll:{},
            foodScroll:{},
            scrollY:0,
            selectFood:{}
        }
    },
    created() {
        this.$axios.get('/api/goods').then(res => {
            if(res.data.code == 0) {
                this.poiInfo = res.data.data.poi_info;
                this.container = res.data.data.container_operation_source;
                this.goods = res.data.data.food_spu_tags;

                // DOM已经更新
                this.$nextTick(() => {
                    //执行滚动方法
                    this.initScroll()
                    // 计算分类的区间高度
                    this.calculateHeight()
                    // 监听滚动的位置
                    // 根据滚动位置确认下标,与左侧对应
                    // 通过下标实现点击左侧,滚动右侧
                })
            }
        })
    },
    methods: {
        head_bg(imgName) {
            return `background-image: url(${ imgName })`
        },
        initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuScroll,{
                click:true
            })
            this.foodScroll = new BScroll(this.$refs.foodScroll, {
                probeType:3, //实时派发 scroll 事件
                click:true
            })

             // foodScroll 监听事件
            this.foodScroll.on('scroll',pos => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        calculateHeight() {
            let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
            let height = 0;

            this.listHeight.push(height)

            for(let i = 0; i < foodList.length; i++ ) {
                height += foodList[i].clientHeight;
                this.listHeight.push(height)    
            }
        },
        selectMenu(index) {
            let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook");
            let element = foodlist[index];

            // 滚动到对应元素的位置
            this.foodScroll.scrollToElement(element,250)
        },
        calculateCount(spus) {
            let count = 0;
            spus.forEach((food) => {
                if(food.count > 0) {
                    count += food.count;
                }
            });
            return count;
        },
        showDetail(food) {
            this.selectFood = food;

            this.$refs.foodView.showView()
        }
    },
    computed: {
        currentIndex() {
            for(let i= 0; i< this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];

                if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }
            return 0;
        },
         selectFoods(){
            let foods = [];
            this.goods.forEach((myfoods) => {
                myfoods.spus.forEach((food) => {
                    if(food.count > 0){
                        foods.push(food)
                    }
                })
            })

            return foods
        }
    },
    components: {
        "app-shopcart":Shopcart,
        "app-cartcontrol":CartControl,
        "app-product-detail":ProductDetail
    }
}
</script>

<style scoped>
    .goods {
        display: flex;
        position: absolute;
        top: 190px;
        bottom: 51px;
        width: 100%;
        overflow: hidden;
    }

    .goods .menu-wrapper {
        flex:0 0 85px;
        background-color: #f4f4f4;
    }

    .goods .foods-wrapper {
        flex: 1;
    }


    /* Menu */
    .goods .menu-wrapper .menu-item{
        position: relative;
        padding: 16px 23px 15px 10px;
        border-bottom: 1px solid #E4E4E4;
    }

    .goods .menu-wrapper .menu-item .text{
        display: -webkit-box;
        font-size: 13px;
        color: #333333;
        line-height: 17px;
        vertical-align: middle;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .goods .menu-wrapper .menu-item .text .icon{
        width: 15px;
        height: 15px;
        vertical-align: middle;
    }

    /* 专场样式 */
    .goods .foods-wrapper .container-list{
        padding: 11px 11px 0 11px;
        border-bottom: 1px solid #E4E4E4;
    }

    .goods .foods-wrapper .container-list img{
        width: 100%;
        margin-bottom: 11px;
        border-radius: 5px;
    }   

    /* 具体分类商品布局 */ 
    .goods .foods-wrapper .food-list{
        padding: 11px;
    }

    .goods .foods-wrapper .food-list .title{
        padding-left: 7px;
        margin-bottom: 12px;
        height: 13px;
        font-size: 13px;
        background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
        background-size: 2px 10px;
    }


    .goods .foods-wrapper .food-list .food-item{
        display: flex;
        position: relative;
        margin-bottom: 25px;
    }

    .goods .foods-wrapper .food-list .food-item  .icon{
        flex: 0 0 63px;
        margin-right: 11px;
        height: 75px;
        background-position: center;
        background-size: 120% 100%;
        background-repeat: no-repeat;
    }
    .goods .foods-wrapper .food-list .food-item .content{
        flex: 1;
    }

    /* 具体内容样式 */ 
    .goods .foods-wrapper .food-list .food-item .content .name{
        margin-bottom: 10px;
        padding-right: 27px;
        font-size: 16px;
        line-height: 21px;
        color: #333333;
    }

    .goods .foods-wrapper .food-list .food-item .content .desc{
        margin-bottom: 8px;
        font-size: 10px;
        line-height: 19px;
        color: #bfbfbf;
        
        /* 超出部分显示省略号*/
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .goods .foods-wrapper .food-list .food-item .content .extra{
        margin-bottom: 7px;
        font-size: 10px;
        color: #BFBFBF;
    }
    .goods .foods-wrapper .food-list .food-item .content .extra .saled{
        margin-right: 14px;
    }
    .goods .foods-wrapper .food-list .food-item .content .product{
        height: 15px;
        margin-bottom: 6px;
    }
    .goods .foods-wrapper .food-list .food-item .content .price{
        font-size: 0;
    }
    .goods .foods-wrapper .food-list .food-item .content .price .text{
        font-size: 14px;
        color: #fb4e44;
    }
    .goods .foods-wrapper .food-list .food-item .content .price .unit{
        font-size: 12px;
        color: #BFBFBF;
    }


    /* 当前选中 */
    .goods .menu-wrapper .menu-item.current{
        margin-top: -1px;       
        background: white;
        font-weight: bold;
    }
    .goods .menu-wrapper .menu-item:first-child.current{
        margin-top: 1px;
    }

    .goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper{
        position: absolute;
        right: 0;
        bottom: 0;
    }

        
    .goods .menu-wrapper .menu-item .num{
        position: absolute;
        right: 5px;
        top: 5px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        color: white;
        background: red;
        text-align: center;
        font-size: 7px;
        line-height: 13px;
    }

</style>


