<template>
  <view>
    <view class="p-page-head">
      <img @click="goBack" class="left-back" src="@/static/z/images/left.png" alt="">
    </view>
    <textarea class="input-contenet" auto-height="true" type="text" placeholder="说说您眼中的柯桥..."></textarea>
    <publish-grid class="publish-grid" :listImg="files" :showDeleteButtom="true"></publish-grid>
    <img class="addImg" src="@/static/z/images/add.png" @click="getImgs" alt="">
    <publish-button class="p-page-head-button"></publish-button>
  </view>
</template>

  <script>
  import PublishGrid from "@/components/tourismCircle/PublishGrid";
  import PublishButton from "@/components/tourismCircle/PublishButton";
  export default {
    name: "TourismPublish",
    components: {
      PublishGrid,
      PublishButton
    },
    data(){
      return {
        files:[]
      }
    },
    methods:{
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
      }
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
</style>