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
        if(this.checkLogin('查看个人信息需登录','/pages/profile/Profile')) {
          let name = this.$store.state.loginProvider
          let id = this.$store.state.userId
          let targetUrl = "/pages/tourismCircle/TourismCircleProfile?uid="+id+"&circleUserName="+name
          uni.navigateTo({
            url: targetUrl
          });
        }

      }
    }
  }
</script>

<style scoped>

</style>