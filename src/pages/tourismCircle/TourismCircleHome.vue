<template>
  <view class="tourism-circle">
    <view class="t-page-head">
      <span class="t-page-head-title">分享你眼中的柯桥</span>
      <publish-button class="t-page-head-button"></publish-button>
    </view>

    <view class="t-page-body">
      <view v-for="(item,index) in tourPublish " :key="index" class="t-page-content">
        {{item}}
      </view>
    </view>
  </view>
</template>

<script>
  import PublishButton from "@/components/tourismCircle/PublishButton";
  import {getAllTheme} from "@/components/tourismCircle/request/request"

  export default {
    name: "TourismCircleHome",
    data() {
      return {
        tourPublish: [{
          "code": "SUCCESS",
          "message": "SUCCESS",
          "data": [
            {
              "themeId": 1,
              "themeName": "theme08",
              "themeScenic": null,
              "themeRoute": null,
              "themeInfo": "主题游一个",
              "themeDelete": false,
              "themeCreateTime": null,
              "themeUpdateTime": null,
              "themeDeleteTime": null,
              "themeRemarks": "备注",
              "themePictures": "http://192.168.1.48:9498/static/file/theme/1/picture_0ce2e12479654109ac25f0f87e4d7b80.png,"
            },
            {
              "themeId": 8,
              "themeName": "123",
              "themeScenic": null,
              "themeRoute": null,
              "themeInfo": "123",
              "themeDelete": false,
              "themeCreateTime": null,
              "themeUpdateTime": null,
              "themeDeleteTime": null,
              "themeRemarks": "123",
              "themePictures": "http://192.168.1.48:9498/static/file/theme/8/picture_42b82cdd741a406f854b4060ce3a9f3e.png,"
            },
            {
              "themeId": 10,
              "themeName": "123",
              "themeScenic": null,
              "themeRoute": null,
              "themeInfo": "123",
              "themeDelete": false,
              "themeCreateTime": null,
              "themeUpdateTime": null,
              "themeDeleteTime": null,
              "themeRemarks": "313",
              "themePictures": "http://192.168.1.48:9498/static/file/theme/10/picture_24f3540bd8b64e88b5186194e30ad061.png,"
            },
            {
              "themeId": 13,
              "themeName": "theme081",
              "themeScenic": null,
              "themeRoute": null,
              "themeInfo": "主题游一个1",
              "themeDelete": false,
              "themeCreateTime": null,
              "themeUpdateTime": null,
              "themeDeleteTime": null,
              "themeRemarks": "备注1",
              "themePictures": ""
            },
            {
              "themeId": 14,
              "themeName": "theme08",
              "themeScenic": null,
              "themeRoute": null,
              "themeInfo": "主题游一个",
              "themeDelete": false,
              "themeCreateTime": null,
              "themeUpdateTime": null,
              "themeDeleteTime": null,
              "themeRemarks": "备注",
              "themePictures": "http://192.168.1.48:9498/static/file/theme/14/picture_4be0b6fc21344277b4d6564164828d92.png,"
            }
          ]
        }]
      }
    },
    components: {
      PublishButton
    },
    methods: {
      getData() {
        getAllTheme({
          url: "/theme/getAllTheme",
        }).then(data => {
          let [err, res] = data
          this.tourPublish = res.data
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .tourism-circle{
    width: 100vw;
    height: 100vh;
    /*position: fixed;*/
  }
  .t-page-head {
    height: 128rpx;
    width: 100vw;
    color: #343130;
    box-shadow: 0px 6px 15px 0px rgba(85, 70, 59, 0.23);
  }

  .t-page-head-title {
    font-size: 40rpx;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(52, 49, 48, 1);
    position: relative;
    left: 213rpx;
    top: 66rpx;
  }

  .t-page-head-button {
    width: 121rpx;
    height: 62rpx;
    position: relative;
    float: right;
    text-align: center;
    right: 19rpx;
    top: 58rpx;
  }
</style>