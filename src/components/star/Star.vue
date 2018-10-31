<template>
    <div class="star">
        <span v-for="(item,index) in itemClasses" :key="index" :class="item" class="star-item"></span>
    </div>
</template>

<script>
// 星星长度 
const LENGTH = 5

// 星星的状态
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
    props: {
        score: {
            type:Number
        }
    },
    computed: {
        itemClasses() {
            let starArr = [];
            // 4.7
            let score = Math.floor(this.score * 2) / 2;
            //半星
            let hasDecimal = score % 1 !== 0 ;
            //全星
            let integer = Math.floor(score);

            for(let i = 0;i < integer; i++ ) {
                starArr.push(CLS_ON)
            }

            if(hasDecimal) {
                starArr.push(CLS_HALF)
            }

            while(starArr.length < LENGTH) {
                starArr.push(CLS_OFF);
            }

            return starArr;
        }
    }
}
</script>

<style>
.star{
    font-size: 0;
}
.star .star-item{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-repeat: no-repeat;
    background-size: 10px 10px;
}
.star .star-item:last-child{
    margin-right: 0;
}

/* 三种图片类型*/
.star .on{
    background-image: url(img/star24_on@2x.png);
}
.star .half{
    background-image: url(img/star24_half@2x.png);
}
.star .off{
    background-image: url(img/star24_off@2x.png);
}
</style>


