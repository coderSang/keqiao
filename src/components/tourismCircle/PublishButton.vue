<template>
  <view class="btn">
    <div class="t-page-head-button-bg"></div>
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
    width: 121rpx;
    height: 62rpx;
    border:0;
	 background: url('../../static/tourismCircle/images/page-head-button.png') center center no-repeat;
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