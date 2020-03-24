<template>
  <view class="tourism-circle">
    <nav-bar class="circle-home">
      <div slot="center">{{name}}眼中的柯桥</div>
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
    data(){
      return{
        name:"TA"
      }
    },
    methods:{
      goBack(){
        uni.navigateTo({
          url:"/pages/tourismCircle/TourismCircleHome"
        })
      },
    },
    mounted(){
      this.$refs.content.profileAttr.uid = this.$route.query.uid
      //将名字转换成大写对比是不是一样的
      //标题栏 我眼中/xxx眼中
      let name = this.$route.query.circleUserName
      let NAME = name.toLocaleUpperCase()
      let username = this.$store.state.loginProvider
      let USERNAME = username.toLocaleUpperCase()
      this.name = (NAME===USERNAME)?"我":name
      //进入到个人界面
      if(NAME===USERNAME){
        this.$refs.content.isProfilePage = 1
      }
      //传到子组件
      this.$refs.content.profileAttr.name = this.$route.query.circleUserName
      this.$refs.content.isProfilePage = 1
      this.$refs.content.getList()
    },
    onPullDownRefresh() {
      this.$refs.content.reload = true;
      this.$refs.content.currentPage=1;
      this.$refs.content.getList();
    },
    onReachBottom() {
      this.$refs.content.status = 'more'
      this.$refs.content.getList()
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

</style>

