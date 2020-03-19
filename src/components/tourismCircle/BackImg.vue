<template>
  <img @click="goBack" class="left-back" src="@/static/tourismCircle/images/left.png" alt="">
</template>

<script>
  export default {
    name: "BackImg",
    methods: {
      goBack() {
        uni.navigateTo({
          url: "/pages/tourismCircle/TourismCircleHome"
        })
      },
    }
  }
</script>

<style scoped>
  .left-back {
    width: 22rpx;
    height: 44rpx;
  }
</style>