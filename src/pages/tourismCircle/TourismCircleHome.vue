<template>
  <view class="tabs">
	<view class="status_bar"></view>
    <nav-bar class="circle-home">
      <div slot="center">分享你眼中的柯桥</div>
      <div slot="right">
        <publish-button @click.native="gotoPublish" ></publish-button>
      </div>
    </nav-bar>
	<view>
		<circle-content ref="content" ></circle-content>
	</view>
    
  </view>
</template>

<script>
  import CircleContent from "@/components/tourismCircle/CircleContent";
  import PublishButton from "@/components/tourismCircle/PublishButton";
  import NavBar from "@/components/navbar/NavBar";

  export default {
    name: "test",
    components:{
      CircleContent,
      PublishButton,
      NavBar
    },
    methods:{
      gotoPublish(){
        uni.navigateTo({
          url: '/pages/tourismCircle/TourismPublish'
        });
      },
    },
    onshow(){
      this.$refs.content.reload = true;
      this.$refs.content.currentPage=1;
      this.$refs.content.isProfilePage='0';
      this.$refs.content.getList();
    },
    mounted(){
      this.$refs.content.getList()
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
  .tabs{
  	padding-top: var(--status-bar-height);
  }
</style>