<template>
  <view>
    <nav-bar class="circle-home">
      <div slot="center">举报不良信息</div>
      <div slot="left">
        <back-img></back-img>
      </div>
    </nav-bar>
    <textarea class="input-contenet" @input="inputChange"
              type="text" placeholder="请输入反馈信息..."></textarea>
    <button @click="confirmFeedback" class="mini-btn feedback-btn" type="warn" size="mini">提交</button>
  </view>
</template>

<script>
  import NavBar from "@/components/navbar/NavBar";
  import BackImg from "@/components/tourismCircle/BackImg";

  import {aboutCircle} from "@/components/tourismCircle/request/request"

  export default {
    name: "TourismFeedBack",
    data(){
      return{
        //举报信息
        content:"",
        cid:"",
        uid:""
      }
    },
    components:{
      NavBar,
      BackImg
    },
    methods:{
      //返回
      goback(){
        uni.navigateTo({
          url:"/pages/tourismCircle/TourismCircleHome"
        })
      },
      //监听举报内容
      inputChange(e){
        this.content = e.detail.value
      },
      //举报
      confirmFeedback(){
        //为空判断
        if(this.content===""){
          uni.showToast({
            title: "举报信息信息不为空",
            duration: 1000,
            icon:"none"
          })
        }
        else{
          let feedbackContent = "用户:"+this.uid+" 旅游圈id:"+this.cid + "举报信息:"+ this.content
          //调用接口
          aboutCircle({
            url: "/about/addFeedback",
            data:{
              feedbackType:"举报不良信息",
              feedbackContent:feedbackContent
            }
          })
          .then(data => {
            this.showBar(data,'/pages/tourismCircle/TourismCircleHome')

          })
        }
      },
      //判断用户是否登录

    },
    onShow(){
      this.checkLogin('举报需登录','/pages/tourismCircle/TourismCircleHome')
    },
    onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数

      this.cid = option.cid
      this.uid = option.uid
    }
  }
</script>

<style scoped>
  .input-contenet{
    width: 80vw;
    position: relative;
    left: 10vw;
    top:120rpx;
  }
  .feedback-btn{
    position: relative;
    float: right;
    right: 20rpx;
    top:50rpx;
  }

  .left-back{
    width: 22rpx;
    height: 44rpx;
  }
</style>