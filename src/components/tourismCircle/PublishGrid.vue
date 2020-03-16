<template>
  <view>
    <view v-if="listImg.length===1">
      <uni-grid style="width: 369rpx;position: relative;left: 124rpx;" :column="1">
        <uni-grid-item style="width: 369rpx;height:369rpx;margin: 5rpx" v-for="(item,index) in listImg" :key="index">
          <img style="width: 369rpx;height:369rpx" :src="item" alt="">
        </uni-grid-item>
      </uni-grid>
    </view>
    <view v-else-if="listImg.length>1&&listImg.length<=4">
      <uni-grid style="width: 369rpx;position: relative;left: 124rpx;" :column="2">
        <uni-grid-item style="width: 174rpx;height:174rpx;margin: 5rpx" v-for="(item,index) in listImg" :key="index">
          <img style="width: 174rpx;height:174rpx" :src="item" alt="">
        </uni-grid-item>
      </uni-grid>
    </view>
    <view v-else-if="listImg.length>4&&listImg.length<=9">
      <uni-grid style="width: 400rpx;position: relative;left: 124rpx;" :column="3">
        <uni-grid-item style="width: 113rpx;height:113rpx;margin: 5rpx" v-for="(item,index) in listImg" :key="index">
          <img style="width: 113rpx;height:113rpx" :src="item" alt="">
        </uni-grid-item>
      </uni-grid>
    </view>
    <view v-else></view>
  </view>
</template>

<script>
  import uniGrid from "@/components/uni-grid/uni-grid.vue"
  import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
  export default {
    name: "PublishGrid",
    components:{
      uniGrid,
      uniGridItem
    },
    props:{
      listImg: {
        type: Array,
        default: []
      },
    },
  }
</script>

<style scoped>

</style>