<template>
  <view>
    <button @click="mycircle">我的旅游圈</button>
  </view>
</template>

<script>
  export default {
    name: "Profile",
    methods:{
      //跳转到我的旅游圈
      mycircle(){
        uni.navigateTo({
          url: "/pages/tourismCircle/TourismCircleProfile"
        });
      }
    }
  }
</script>

<style scoped>

</style>