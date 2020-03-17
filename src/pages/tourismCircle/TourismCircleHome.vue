<template>
  <view class="tourism-circle">
    <view class="t-page-head" style="position:fixed;z-index: 10;background-color:#fff;">
      <span class="t-page-head-title">分享你眼中的柯桥</span>
      <publish-button @click.native="gotoPublish" class="t-page-head-button"></publish-button>
    </view>
    <scroll-view v-for="(item,index) in tourPublish " :key="index" class="t-page-content">
      <img class="my-title" src="@/static/z/images/title.jpg" alt="">
      <span class="my-name">{{item.circleId}}</span>
      <span class="my-circle-time">{{item.circleTime}}</span>
      <p class="my-circle-introduction">{{item.circleContent}}</p>
      <publish-grid class="publish-grid" :listImg="getImg(index)"></publish-grid>
      <span v-if="item.circleLocation!='定位地址'" class="set-location-content">{{item.circleLocation}}</span>
      <img class="like" @click="giveALike" src="@/static/z/images/like.png" alt="">
      <view class="split-line">
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import PublishButton from "@/components/tourismCircle/PublishButton";
  import PublishGrid from "@/components/tourismCircle/PublishGrid";

  import {aboutCircle} from "@/components/tourismCircle/request/request"
  export default {
    name: "TourismCircleHome",
    data() {
      return {
        tourPublish: [],
        listImg:[]
      }
    },
    components: {
      PublishButton,
      PublishGrid,
    },
    methods: {
      getImg(index){
        let pic = []
        pic.push(this.tourPublish[index].circlePictures.split(',')[0])
        return pic
      },
      giveALike(){
      //  点赞
      },
      getData() {
        aboutCircle({
          url: "/login",
          method: "POST",
          data: {
            username: "z",
            password: "123",
          },
          header: {"Content-Type": "application/x-www-form-urlencoded"}
        }).then(data=>{
          aboutCircle({
            url: "/circle/getCurrentCircle",
          }).then(data => {
            let [err, res] = data
            this.tourPublish = res.data.data
          })
        })

      },
      gotoPublish(){
        uni.navigateTo({
          url: 'TourismPublish'
        });
      }
    },
    onShow() {
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
    position: relative;
    bottom: 10rpx;
    left: 30rpx;
    /*margin: 0 0 0 30rpx;*/
  }
  .my-circle-time{
    width:275rpx;
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
    /*font-weight:bold;*/
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

  .set-location-content{
    display:inline-block;
    width:187rpx;
    height:30rpx;
    background:rgba(241,235,226,1);

    font-size:20rpx;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(52,49,48,1);

    position: relative;
    bottom: 45rpx;
    left: 119rpx;
    overflow: hidden;
  }
</style>