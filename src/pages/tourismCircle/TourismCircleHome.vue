<template>
  <view class="tourism-circle">
    <view class="t-page-head" style="position:fixed;z-index: 10;background-color:#fff;">
      <span class="t-page-head-title">分享你眼中的柯桥</span>
      <publish-button @click.native="gotoPublish" class="t-page-head-button"></publish-button>
    </view>
    <view class="uni-list">
      <view v-for="(item,index) in tourPublish " :key="index" class="t-page-content">
        <img class="my-title" :src="item.circleUserAvatar" alt="">
        <span class="my-name">{{item.circleUserName}}</span>
        <span class="my-circle-time">{{item.circleTime}}</span>
        <p class="my-circle-introduction">{{item.circleContent}}</p>
        <publish-grid class="publish-grid" :listImg="getImg(index)"></publish-grid>
        <span v-if="item.circleLocation!='定位地址'" class="set-location-content">{{item.circleLocation}}</span>
        <img class="like" @click="giveALike" src="@/static/z/images/like.png" alt="">
        <view class="split-line"></view>
      </view>
    </view>
    <uni-load-more style="margin-top: 100rpx;" :status="status"  :icon-size="16" :content-text="contentText" />

  </view>
</template>

<script>
  import PublishButton from "@/components/tourismCircle/PublishButton";
  import PublishGrid from "@/components/tourismCircle/PublishGrid";
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

  import {aboutCircle} from "@/components/tourismCircle/request/request"

  var dateUtils = require('../../common/util.js').dateUtils;


  export default {
    name: "TourismCircleHome",
    data() {
      return {
        tourPublish: [],
        listImg:[],
        currentPage:1,
        reload: false,
        status: 'more',
        contentText: {
          contentdown: '上拉加载更多',
          contentrefresh: '加载中',
          contentnomore: '没有更多'
        }
      }
    },
    components: {
      PublishButton,
      PublishGrid,
      uniLoadMore
    },
    methods: {
      getImg(index){
        let pic = []
        pic = (this.tourPublish[index].circlePictures.split(','))
        pic.pop()
        return pic
      },
      giveALike(){
      //  点赞
      },
      gotoPublish(){
        uni.navigateTo({
          url: '/pages/tourismCircle/TourismPublish'
        });
      },
      getList() {
        let currentPage = this.currentPage
        let _self = this
        if (this.currentPage>1) {
          //说明已有数据，目前处于上拉加载
          this.status = 'loading';
        }
        aboutCircle({
          url: "/circle/getCurrentCircle",
          data:{
            currentPage
          }
        }).then(data => {
          let [err, res] = data
          if(res.data.code==="SUCCESS"){
            if(res.data.data.length===0){
              _self.status = 'nomore';
            }
            else{
              let list = this.setTime(res.data.data);
              this.tourPublish = this.reload ? list : this.tourPublish.concat(list);
              this.currentPage+=1;
              this.reload = false;
              uni.stopPullDownRefresh();
            }
          }else{
            console.log('fail' + JSON.stringify(res.data));
          }
        })
      },
      setTime: function(items) {
        var newItems = [];
        items.forEach(e => {
          newItems.push({
            circleId:e.circleId,
            circleUserId:e.circleUserId,
            circleUserAvatar: e.circleUserAvatar,
            circleUserName: e.circleUserName,
            circleTime: e.circleTime,
            circleLikeNum:e.circleLikeNum,
            circleContent: e.circleContent,
            circlePictures: e.circlePictures,
            circleLocation:e.circleLocation
          });
        });
        return newItems;
      }
    },
    onLoad() {
      this.getList();
    },
    onPullDownRefresh() {
      this.reload = true;
      this.currentPage=1;
      this.getList();
    },
    onReachBottom() {
      this.status = 'more';
      this.getList();
    },
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
    margin-top: 20rpx;;
  }
  .my-name{
    width:113rpx;
    height:27rpx;
    font-size:28rpx;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(52,49,48,1);
    position: relative;
    bottom: 20rpx;
    left: 30rpx;
    /*margin: 0 0 0 30rpx;*/
  }
  .my-circle-time{
    width:285rpx;
    height:12rpx;

    font-size:12rpx;
    text-align: right;
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
    margin-top: 59rpx;;
  }
  .like{
    width: 121rpx;
    height: 59rpx;
    position: relative;
    float: right;
    /*left:596rpx;*/
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
    text-align: center;
    font-weight:bold;
    color:rgba(52,49,48,1);

    position: relative;
    /*bottom: 45rpx;*/
    left: 119rpx;
    overflow: hidden;
  }
</style>