<template>
  <view>
    <view class="p-page-head">
      <img @click="goBack" class="left-back" src="@/static/z/images/left.png" alt="">
    </view>
    <textarea class="input-contenet" @input="inputChange" auto-height="true" type="text" placeholder="说说您眼中的柯桥..."></textarea>
    <publish-grid class="publish-grid" :listImg="files" :showDeleteButtom="true"></publish-grid>
    <img class="addImg" src="@/static/z/images/add.png" @click="getImgs" alt="">
    <view @click="setLocation" class="set-location">
      <span class="set-location-content">{{location}}</span>
    </view>
    <publish-button @click.native="addCircle" class="p-page-head-button"></publish-button>
  </view>
</template>

  <script>
  import PublishGrid from "@/components/tourismCircle/PublishGrid";
  import PublishButton from "@/components/tourismCircle/PublishButton";

  import {aboutCircle,uploadImage} from "@/components/tourismCircle/request/request"
  export default {
    name: "TourismPublish",
    components: {
      PublishGrid,
      PublishButton,
    },
    data(){
      return {
        files:[],
        content:"",
        location:"定位地址"
      }
    },
    methods:{
      setLocation(){
        uni.chooseLocation({
          success:(res)=>{
            this.location = res.address||res.name
          },
          fail(){
            this.location="定位地址"
          }
        })
      },
      inputChange(e){
        this.content = e.detail.value
      },
      addCircle(){
        if(this.files.length===0&& this.content ===""){
          uni.showToast({
            title: '内容不为空',
            duration: 1000
          });
        }
        else{
          let tempFilePaths=this.files[0]
          uploadImage({
            url:'/circle/addCircle',
            tempFilePaths:tempFilePaths,
            name:"circlePicturesFiles",
            formData: {
              circleContent:this.content,
              circleLocation:this.location
            }
          }).then(data=>{
            let [err, res] = data
            if(err!=null){
              uni.showToast({
                title: '发布失败',
                duration: 1000
              });
            }
            else {
              uni.showToast({
                title: '发布成功',
                duration: 1000
              });
            }
            uni.navigateTo({
              url: 'TourismCircleHome'
            });
          })
        }
      },
      goBack(){
        uni.navigateBack({
          delta: 1
        });
      },
      getImgs(){
        uni.chooseImage({
          success:(results)=>{
            let currentLen = results.tempFilePaths.length+this.files.length
            if(currentLen<=9){
              for(let result of results.tempFilePaths){
                this.files.push(result);
              }
            }
            else{
              uni.showToast({
                title: '最多添加九张图片',
                duration: 1500
              });
            }
          }
        })
      },
      judgeLogin(){
        if(this.$store.state.hasLogin===false){
          uni.showModal({
            title: '提示',
            content: '发布新动态需登录',
            success: function (res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: '/pages/login/LogIn'
                });
              } else if (res.cancel) {
                uni.navigateTo({
                  url: '/pages/tourismCircle/TourismCircleHome'
                })
              }
            }
          });
        }
        else{
          uni.navigateTo({
            url: '/pages/tourismCircle/TourismPublish'
          });
        }
      }
    },
    onShow(){
      this.judgeLogin()
    }
  }
</script>

<style scoped>
  .p-page-head {
    /*height: 128rpx;*/
    height: 86rpx;
    width: 100vw;
    color: #343130;
  }
  .left-back{
    width: 22rpx;
    height: 44rpx;
    position: relative;
    left: 44rpx;
    top:20rpx
  }
  .input-contenet{
    width: 600rpx;
    position: relative;
    left: 44rpx;
    margin-top: 40rpx;
  }
  .addImg{
    width:118rpx ;
    height:118rpx ;
    margin-top: 20rpx;
    position: relative;
    left: 44rpx;
  }
  .publish-grid{
    position: relative;
    left: 44rpx;
    margin-top: 10rpx;
    width: 550rpx;
    /*height: 550rpx;*/
  }
  .p-page-head-button {
    width: 121rpx;
    height: 62rpx;
    position: relative;
    float: right;
    text-align: center;
    right: 19rpx;
    /*top: 58rpx;*/
    top: 216rpx;
  }
  .set-location-content{
    width:101rpx;
    height:24rpx;
    font-size:20rpx;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(52,49,48,1);
    position: relative;
    bottom: 15rpx;
    left: 44rpx;
  }
</style>