<template>
  <view class="btn">
    <img class="t-page-head-button-bg" src="/static/tourismCircle/images/page-head-button.png" alt="">
    <span class="t-page-head-button-content">发布</span>
  </view>
</template>

<script>
  export default {
    name: "PublishButton"
  }
</script>

<style scoped>
  .btn{
    width: 121rpx;
    height: 62rpx;
  }
  .t-page-head-button-bg{
    width: 100%;
    height: 100%;
    border:0;
  }
  .t-page-head-button-content{
    color: #FFF;
    position: relative;
    bottom: 70rpx;
    font-size:32rpx;
    font-family:Source Han Sans CN;
    font-weight:bold;
  }
</style>