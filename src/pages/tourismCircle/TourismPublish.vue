<template>
  <view>
    <nav-bar>
      <div slot="left">
        <back-img></back-img>
      </div>
    </nav-bar>
    <textarea class="input-contenet" @input="inputChange" auto-height="true" type="text" placeholder="说说您眼中的柯桥..."></textarea>
    <publish-grid class="publish-grid" :listImg="files" :showDeleteButtom="true"></publish-grid>
    <img class="addImg" src="@/static/tourismCircle/images/add.png" @click="getImgs" alt="">
    <view @click="setLocation" class="set-location">
      <span class="set-location-content">{{location}}</span>
    </view>
    <publish-button @click.native="addCircle" class="p-page-head-button"></publish-button>
  </view>
</template>

  <script>
  import PublishGrid from "@/components/tourismCircle/PublishGrid";
  import PublishButton from "@/components/tourismCircle/PublishButton";
  import NavBar from "@/components/navbar/NavBar";
  import BackImg from "@/components/tourismCircle/BackImg";

  import {aboutCircle,uploadImage} from "@/components/tourismCircle/request/request"
  export default {
    name: "TourismPublish",
    components: {
      PublishGrid,
      PublishButton,
      NavBar,
      BackImg
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
            this.location = res.name||res.address
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
            this.showBar(data,'/pages/tourismCircle/TourismCircleHome')
          })
        }
      },
      goBack(){
        uni.navigateTo({
          url:"/pages/tourismCircle/TourismCircleHome"
        })
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
    },
    onShow(){
      this.checkLogin("发布新动态需登录",'/pages/tourismCircle/TourismCircleHome')
    }
  }
</script>

<style scoped>
  .left-back{
    width: 22rpx;
    height: 44rpx;
  }
  .input-contenet{
    width: 600rpx;
    position: relative;
    left: 44rpx;
    top:100rpx
  }
  .addImg{
    width:118rpx ;
    height:118rpx ;
    position: relative;
    left: 44rpx;
    top:140rpx
  }
  .publish-grid{
    position: relative;
    left: 44rpx;
    top:140rpx;
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
    top: 216rpx;
  }
  .set-location-content{
    width:101rpx;
    height:24rpx;
    font-size:20rpx;
    font-weight:bold;
    color:rgba(52,49,48,1);
    position: relative;
    top:140rpx;
    left: 44rpx;
  }
</style>