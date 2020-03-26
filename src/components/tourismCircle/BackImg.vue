<template>
  <div class='left-back' @click="goBack"></div>
</template>

<script>
  export default {
    name: "BackImg",
    methods: {
      goBack() {
        uni.switchTab({
			url: "/pages/tourismCircle/TourismCircleHome"
        })
      },
    }
  }
</script>

<style scoped>
  .left-back {
	position: relative;
	left: 15rpx;
    width: 22rpx;
    height: 44rpx;
	background: url('../../static/tourismCircle/images/left.png') center center no-repeat ;
	background-size:22rpx 44rpx;
  }
</style>