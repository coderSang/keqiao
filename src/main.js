import Vue from 'vue'
import App from './App'
import store from "./store";
Vue.config.productionTip = false

Vue.prototype.showBar = function(data,target=''){
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
        duration: 1000
      });
      setTimeout(()=>{
        if(target===''){
          uni.navigateBack({
            delta: 1
          });
        }
        else {
          uni.navigateTo({
            url: target
          });
        }

      },2000)
      return true
    }
  }
  return false
}

Vue.prototype.checkLogin = function(content,target){
  if(this.$store.state.hasLogin===false){
    uni.showModal({
      title: '提示',
      content: content,
      //提示登录
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/login/LogIn'
          });
        }
        //取消登录
        else if (res.cancel) {
          uni.navigateTo({
            url: target
          });
        }
      }
    });
    return false
  }
  else{
    return true
  }
}

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
