<template>
  <view class="tourism-circle">
    <view class="uni-list">
      <view v-for="(item,index) in tourPublish " :key="index" class="t-page-content">
        <img class="my-title" @click="viewCircle(item.circleId,item.circleUserId,item.circleUserName)" @longpress="longPress(item.circleId,item.circleUserId)" :src="item.circleUserAvatar" alt="">
        <span class="my-name">{{item.circleUserName}}</span>
        <span class="my-circle-time">{{item.circleTime}}</span>
        <p class="my-circle-introduction">{{item.circleContent}}</p>
        <publish-grid class="publish-grid" :listImg="getImg(index)"></publish-grid>
        <span v-if="item.circleLocation!='定位地址'" class="set-location-content">{{item.circleLocation}}</span>
        <view v-if="myCircle(item.circleUserId)" class="give-like">
          <!-- <img class="like" @click="deleteCircle(item.circleId)" src="@/static/tourismCircle/images/circleDelete.png" alt=""> -->
          <div class="unlike" @click="deleteCircle(item.circleId)"></div>
        </view>
        <view v-else class="give-like" >
          <span class="like-num">{{item.circleLikeNum}}</span>
          <!-- <img class="like" @click="giveALike(index)" src="@/static/tourismCircle/images/like.png" alt=""> -->
			<div class="like" @click="giveALike(index)" ></div>
		</view>
        <view class="split-line"></view>
      </view>
    </view>
    <uni-load-more style="position: relative;top:150rpx" :status="status"  :icon-size="16" :content-text="contentText" />

  </view>
</template>

<script>
  import PublishButton from "@/components/tourismCircle/PublishButton";
  import PublishGrid from "@/components/tourismCircle/PublishGrid";
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

  import {aboutCircle} from "@/components/tourismCircle/request/request"
  export default {
    name: "CircleContent",
    data() {
      return {
        //返回数据
        tourPublish: [],
        //当前页
        currentPage:1,
        //重载
        reload: false,
        //状态
        status: 'more',
        //状态信息
        contentText: {
          contentdown: '上拉加载更多',
          contentrefresh: '加载中',
          contentnomore: '没有更多'
        },
        //个人界面的信息
        //isProfilePage判断是不是个人界面
        //isMyCircle判断是不是本人界面
        isMyCircle:0,
        isProfilePage:0,
        profileAttr:{
          uid:"",
          name:"",
        }
      }
    },
    components: {
      PublishButton,
      PublishGrid,
      uniLoadMore
    },
    methods: {
      myCircle(userId){
        /*
            author: z
            time: 2020/3/20
            function:判断是不是自己的内容
        */
        return this.$store.state.userId===userId
      },
      getImg(index){
        let pic = []
        pic = (this.tourPublish[index].circlePictures.split(','))
        pic.pop()
        return pic
      },
      giveALike(index){
        this.tourPublish[index].circleLikeNum++;
      },
      gotoPublish(){
        uni.navigateTo({
          url: '/pages/tourismCircle/TourismPublish'
        });
      },
      getList() {
        //旅游圈
        if(this.isProfilePage===0){
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
        }
        //特定id的旅游圈
        else{
          let currentPage = this.currentPage
          let userId = this.profileAttr.uid
          let _self = this
          if (this.currentPage>1) {
            //说明已有数据，目前处于上拉加载
            this.status = 'loading';
          }
          aboutCircle({
            url: "/circle/getCircleByUserId",
            data:{
              userId,
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
        }
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
      },
      longPress(circleId,circleUserId){
        uni.showActionSheet({
          itemList: ['举报'],
          success: function (res) {
            let targetUrl = "/pages/tourismCircle/TourismFeedBack?uid="+circleId+"&cid="+circleUserId
            uni.navigateTo({
              url:targetUrl
            });
          },
          fail: function (res) {
            console.log(res.errMsg);
          }
        });
      },
      viewCircle(circleId,circleUserId,circleUserName){
        if(this.checkLogin('查看个人信息需登录','/pages/tourismCircle/TourismCircleHome')){
          if(this.isProfilePage===0){
            let targetUrl = "/pages/tourismCircle/TourismCircleProfile?uid="+circleUserId+"&circleUserName="+circleUserName
            uni.navigateTo({
              url: targetUrl
            });
          }
        }
      },
      deleteCircle(circleId){
        /*
            author: z
            time: 2020/3/20
            function:删除自己的朋友圈
        */
        aboutCircle({
          url: "/circle/deleteCircle",
          data:{
            circleId:parseInt(circleId)
          }
        }).then(data => {
          let [err, res] = data
          //报错
          if(err!=null){
            uni.showToast({
              title: res.data.message,
              duration: 1000,
              icon:"none"
            });
          }
          else{
            //失败
            if (res.data.code==="FAIL"){
              uni.showToast({
                title: res.data.message,
                duration: 1000,
                icon:"none"
              });
            }
            //成功
            else{
              uni.showToast({
                title: res.data.message,
                duration: 1000,
                icon:"none"
              });
              this.reload = true;
              this.currentPage=1;
              this.getList();
            }
          }
        })
      }

    },
  }
</script>

<style scoped>
  .tourism-circle{
    width: 100vw;
    height: calc(100% - 7.3%);
  }

  .t-page-content{
    position: relative;
    top: 120rpx;
	margin-bottom: 50rpx;
    /* margin: 0rpx 15rpx 50rpx 15rpx; */
  }
  .my-title{
    width: 78.4rpx;
    margin-top: 20rpx;
	position: relative;
	left: 15rpx;
  }
  .my-name{
    width:113rpx;
    height:27rpx;
    font-size:28rpx;
    font-weight:bold;
    color:rgba(52,49,48,1);
    position: relative;
    bottom: 30rpx;
    left: 30rpx;
  }
  .my-circle-time{
    width:285rpx;
    height:12rpx;

    font-size:20rpx;
    text-align: right;
    font-weight:bold;
    color:rgba(52,49,48,1);

    position: relative;
    float: right;
    top:40rpx;
	right:15rpx
  }

  .my-circle-introduction{
    position: relative;
    width: 586rpx;
    font-size:24rpx;
    color:rgba(52,49,48,1);
    left: 120rpx;
    top:15rpx
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
    position: relative;
    top:59rpx;
  }
  .give-like{
    position: relative;
    float: right;
    right: 20rpx;

  }
  .like{
    width: 38rpx;
    height: 38rpx;
    position: relative;
    right: 20rpx;
	background: url('../../static/tourismCircle/images/like.png') center center no-repeat ;
	background-size:38rpx 38rpx;
  }
  .unlike{
	  width: 38rpx;
	  height: 38rpx;
	  position: relative;
	  right: 20rpx;
	  background: url('../../static/tourismCircle/images/circleDelete.png') center center no-repeat ;
	  background-size:38rpx 38rpx;
	  
  }
  .like-num{
    float: right;
    position: relative;
    color: #828285;
    font-size: 30rpx;
  }
  .set-location-content{
    display:inline-block;
    width:187rpx;
    height:30rpx;
    background:rgba(241,235,226,1);

    font-size:20rpx;
    text-align: center;
    font-weight:bold;
    color:rgba(52,49,48,1);

    position: relative;
    left: 119rpx;
    top:10rpx;
    overflow: hidden;
  }
</style>