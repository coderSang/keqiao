<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="center">
      <slot name="center" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.nav-bar {
  height: 86rpx;
  width: 100vw;
  color: #343130;
  font-weight: bold;
  display: flex;
  text-align: center;
  position: fixed;
  z-index: 10;
  background-color:#fff;
}

.left,
.right {
  width: 150rpx;
  margin-top: 20rpx;
}
.center {
  font-size: 40rpx;
  margin-top: 20rpx;
  flex: 1;
}
</style>
