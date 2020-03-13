<template>
  <div class="page-head-button">
    <img class="page-head-button-bg" src="/static/z/images/page-head-button.png" alt="">
    <span class="page-head-button-content">发布</span>
  </div>
</template>

<script>
  export default {
    name: "PublishButton"
  }
</script>

<style scoped>

  .page-head-button-bg{
    width: 100%;
    height: 100%;
    border:0;
  }
  .page-head-button-content{
    color: #FFF;
    position: relative;
    bottom: 70upx;
    font-size:32upx;
    font-family:Source Han Sans CN;
    font-weight:bold;
  }
</style>