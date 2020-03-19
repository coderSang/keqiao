<template>
  <view class="tourism-circle">
    <nav-bar class="circle-home">
      <div slot="center">TA眼中的柯桥</div>
      <div slot="left">
        <back-img></back-img>
      </div>
    </nav-bar>
    <circle-content ref="content"></circle-content>
  </view>
</template>

<script>
  import CircleContent from "@/components/tourismCircle/CircleContent";
  import NavBar from "@/components/navbar/NavBar";
  import BackImg from "@/components/tourismCircle/BackImg";
  export default {
    name: "TourismCircleProfile",
    components: {
      CircleContent,
      NavBar,
      BackImg
    },
    methods:{
      goBack(){
        uni.navigateTo({
          url:"/pages/tourismCircle/TourismCircleHome"
        })
      },
    },
    mounted(){
      if(this.checkLogin('查看个人信息需登录','/pages/tourismCircle/TourismCircleHome')){
        this.$refs.content.profileAttr.uid = this.$route.query.uid
        this.$refs.content.isProfilePage = 1
        this.$refs.content.getList()
      }
    },
    onPullDownRefresh() {
      this.$refs.content.reload = true;
      this.$refs.content.currentPage=1;
      this.$refs.content.getList();
    },
    onReachBottom() {
      this.$refs.content.status = 'more';
      this.$refs.content.getList();
    },
  }
</script>

<style scoped>
  .circle-home{
    box-shadow: 0 6rpx 15rpx 0 rgba(85, 70, 59, 0.23);
  }
  .tourism-circle{
    width: 100vw;
    height: calc(100% - 7.3%);
  }
  .left-back{
    width: 22rpx;
    height: 44rpx;
  }
</style>

