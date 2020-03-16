<template>
  <view class="tourism-circle">
    <view class="t-page-head" style="position:fixed;z-index: 10;background-color:#fff;">
      <span class="t-page-head-title">分享你眼中的柯桥</span>
      <publish-button @click.native="gotoPublish" class="t-page-head-button"></publish-button>
    </view>
    <scroll-view v-for="(item,index) in tourPublish " :key="index" class="t-page-content">
      <img class="my-title" src="@/static/z/images/title.jpg" alt="">
      <span class="my-name">{{item.themeName}}</span>
      <span class="my-circle-time">2020-03-04 16:00</span>
      <p class="my-circle-introduction">安康寺是安昌古镇上一座规模颇大的寺庙，建筑显然是翻新的，宏伟壮观。</p>
      <publish-grid class="publish-grid" :listImg="listImg"></publish-grid>
      <div class="setLocation">
        <span class="setLocationContent">定位地址</span>
      </div>
      <img class="like" @click="giveALike" src="@/static/z/images/like.png" alt="">
      <view class="split-line">
      </view>
    </scroll-view>

  </view>
</template>

<script>
  import PublishButton from "@/components/tourismCircle/PublishButton";
  import {getCurrentCircle} from "@/components/tourismCircle/request/request"
  import PublishGrid from "@/components/tourismCircle/PublishGrid";

  export default {
    name: "TourismCircleHome",
    data() {
      return {
        tourPublish: [],
        listImg: [
          "http://img3m6.ddimg.cn/31/9/27916546-1_e_3.jpg",
          "http://img3m6.ddimg.cn/31/9/27916546-2_e_3.jpg",
          "http://img3m6.ddimg.cn/31/9/27916546-3_e_3.jpg",
          "http://img3m6.ddimg.cn/31/9/27916546-4_e_3.jpg",
          "http://img3m6.ddimg.cn/31/9/27916546-2_e_3.jpg",
          "http://img3m6.ddimg.cn/31/9/27916546-3_e_3.jpg",
          "http://img3m6.ddimg.cn/31/9/27916546-4_e_3.jpg"
        ],
      }
    },
    components: {
      PublishButton,
      PublishGrid
    },
    methods: {
      giveALike(){
      //  点赞
      },
      getData() {
        getCurrentCircle({
          url: "/theme/getAllTheme",
        }).then(data => {
          let [err, res] = data
          this.tourPublish = res.data.data
        })
      },
      gotoPublish(){
        uni.navigateTo({
          url: 'TourismPublish?id=1&name=uniapp'
        });
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .tourism-circle{
    width: 100vw;
    /*height: 92.7vh;*/
    height: calc(100% - 7.3%);
    /*overflow: hidden;*/
    /*position: fixed;*/
  }
  .t-page-head {
    /*height: 128rpx;*/
    height: 86rpx;
    width: 100vw;
    color: #343130;
    box-shadow: 0 6rpx 15rpx 0 rgba(85, 70, 59, 0.23);
  }

  .t-page-head-title {
    font-size: 40rpx;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(52, 49, 48, 1);
    position: relative;
    left: 213rpx;
    /*top: 66rpx;*/
    top:24rpx;
  }

  .t-page-head-button {
    width: 121rpx;
    height: 62rpx;
    position: relative;
    float: right;
    text-align: center;
    right: 19rpx;
    /*top: 58rpx;*/
    top: 16rpx;
  }

  .t-page-content{
    position: relative;
    top: 120rpx;
    margin: 0rpx 15rpx 0rpx 15rpx;

  }
  .my-title{
    width: 78.4rpx;
  }
  .my-name{
    width:113rpx;
    height:27rpx;
    font-size:28rpx;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(52,49,48,1);
    margin: 0 0 10rpx 30rpx;
  }
  .my-circle-time{
    width:255rpx;
    height:12rpx;
    font-size:12rpx;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(52,49,48,1);
    position: relative;
    float: right;
    margin-top: 49rpx;
  }
  .my-circle-introduction{
    position: relative;
    margin-left: 120rpx;
    margin-top: 20rpx;
    width: 586rpx;
    font-size:24rpx;
    font-weight:bold;
    color:rgba(52,49,48,1);
  }

  .publish-grid{
    position: relative;
    left: 124rpx;
    width: 550rpx;
  }

  .split-line{
    width:100vw;
    height:2rpx;
    background: rgba(0, 0, 0,0.2);
    box-shadow:0rpx 0rpx 25rpx 2rpx rgba(232,232,232,1);
  }
  .like{
    width: 121rpx;
    height: 59rpx;
    position: relative;
    left:596rpx;
  }
  .setLocation{
    width:187rpx;
    height:30rpx;
    background:rgba(241,235,226,1);
    box-shadow:0rpx 0rpx 5rpx 0rpx rgba(41,34,34,0.26);
    opacity:0.7;
    border-radius:15px;
    position: relative;
    left: 119rpx;
  }
  .setLocationContent{
    width:83rpx;
    height:19rpx;
    font-size:20rpx;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(52,49,48,1);
    position: relative;
    bottom: 15rpx;
    left: 40rpx;
  }
</style>