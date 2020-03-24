<template>
  <view>
    <nav-bar >
      <div slot="left">
        <img @click="goBack" class="left-back" src="@/static/tourismCircle/images/left.png" alt="">
      </div>
    </nav-bar>
    <view class="welcome">登陆后更精彩</view>
    <input class="input-box i-box" placeholder="请输入用户名" @input="nameInput">
    <input class="input-box i-box" placeholder="请输入密码" @input="pwInput" password="true">
    <button class="input-box loginBtn" value="确认"  @click="getLogin">确认</button>
    <div class="register">注册</div>
  </view>

</template>

<script>
  import NavBar from "@/components/navbar/NavBar";

  import {aboutCircle} from "@/components/tourismCircle/request/request"
  export default {
    name: "LogIn",
    data(){
      return{
        username:"",
        password:""
      }
    },
    components:{
      NavBar
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
          const userid = data[1].data.data.userId
          if(this.showBar(data)){
            this.$store.commit('login',{username,userid})
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
  .left-back{
    width: 22rpx;
    height: 44rpx;
  }
  .welcome{
    width:273rpx;
    height:40rpx;
    font-size:42rpx;
    font-weight:bold;
    color:rgba(52,49,48,1);

    position: relative;
    top:106rpx;
    left: 93rpx;
  }
  .input-box{
    width:559rpx;
    height:67rpx;
    background:rgba(255,255,255,1);
    box-shadow:0rpx 6rpx 15rpx 0rpx rgba(85,70,59,0.23);
    border-radius:34rpx;

    position: relative;

    top:200rpx;
    margin-top: 30rpx;

    text-align: center;
  }

  .i-box{
    left:95rpx ;
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
    top:250rpx;
  }
</style>