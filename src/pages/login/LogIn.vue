<template>
  <view>
    <view class="p-page-head">
      <img @click="goBack" class="left-back" src="@/static/z/images/left.png" alt="">
    </view>
    <view class="welcome">
      登陆后更精彩
    </view>
    <input class="input-box" placeholder="请输入用户名" @input="nameInput">
    <input class="input-box" placeholder="请输入密码" @input="pwInput" password="true">
    <button class="input-box loginBtn" value="确认"  @click="getLogin">确认</button>
    <div class="register">注册</div>
  </view>

</template>

<script>
  import {aboutCircle} from "@/components/tourismCircle/request/request"
  export default {
    name: "LogIn",
    data(){
      return{
        username:"",
        password:""
      }
    },
    methods:{
      nameInput(e){
        this.username = e.detail.value
      },
      pwInput(e){
        this.password = e.detail.value
      },
      getLogin(){
        const username =this.username
        const password = this.password
        aboutCircle({
          url: "/login",
          method:"POST",
          data:{
            username:username,
            password:password,
          },
          header:{"Content-Type": "application/x-www-form-urlencoded"}
        }).then(data =>{
          let [err, res] = data
          if(err!=null){
            uni.showToast({
              title: '出现错误',
              duration: 1000
            });
          }
          else{
            if (res.data.code==="FAIL"){
              uni.showToast({
                title: res.data.message,
                duration: 1000
              });
            }
            else{
              uni.showToast({
                title: '登录成功',
                duration: 1000
              });
              this.$store.commit('login',username)
              uni.navigateBack({
                delta: 1
              });
            }
          }
          })

      },
      goBack(){
        uni.navigateBack({
          delta: 1
        });
      },
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
  .welcome{
    width:273rpx;
    height:40rpx;
    font-size:42rpx;
    font-weight:bold;
    color:rgba(52,49,48,1);

    position: relative;
    left: 93rpx;
    margin: 60rpx 0;
  }
  .input-box{
    width:559rpx;
    height:67rpx;
    background:rgba(255,255,255,1);
    box-shadow:0rpx 6rpx 15rpx 0rpx rgba(85,70,59,0.23);
    border-radius:34rpx;

    position: relative;
    left:95rpx ;
    margin: 50rpx 0;

    text-align: center;
  }
  
  .loginBtn{
    background-color: #c71c1d;
    height: 80rpx;
    color: #ffffff;
  }

  .register{
    width:56rpx;
    height:27rpx;
    font-size:28rpx;
    font-weight:bold;
    color:rgba(52,49,48,1);
    position: relative;
    float: right;
    right: 100rpx;
  }
</style>