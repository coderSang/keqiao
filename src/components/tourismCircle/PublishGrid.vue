<template>
  <view>
    <view v-if="listImg.length===1">
      <uni-grid :column="1" :show-border="false"  :square="false">
        <uni-grid-item style="width: 100%;margin: 3%" v-for="(item,index) in listImg" :key="index">
          <img v-if="showDeleteButtom" @click="deleteImg(index)" class="delete-image" :src="getDeleteImg()" alt="">
          <img @click="viewImg(index)" class="image-content" :src="item" alt="">
        </uni-grid-item>
      </uni-grid>
    </view>
    <view v-else-if="listImg.length===2||listImg.length===4">
      <uni-grid :column="2" :show-border="false" :square="false">
        <uni-grid-item style="width: 46%;height:46%;margin: 2%" v-for="(item,index) in listImg" :key="index">
          <img v-if="showDeleteButtom" @click="deleteImg(index)" class="delete-image" :src="getDeleteImg()" alt="">
          <img @click="viewImg(index)" class="image-content" :src="item" alt="">
        </uni-grid-item>
      </uni-grid>
    </view>
    <view v-else-if="listImg.length>4&&listImg.length<=9||listImg.length===3">
      <uni-grid :column="3" :show-border="false"  :square="false">
        <uni-grid-item style="width: 29%;height:29%;margin: 2%" v-for="(item,index) in listImg" :key="index">
          <img v-if="showDeleteButtom" @click="deleteImg(index)" class="delete-image" :src="getDeleteImg()" alt="">
          <img @click="viewImg(index)" class="image-content" :src="item" alt="">
        </uni-grid-item>
      </uni-grid>
    </view>
    <view v-else></view>
  </view>
</template>

<script>
  import uniGrid from "@/components/uni-grid/uni-grid.vue"
  import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
  export default {
    name: "PublishGrid",
    components:{
      uniGrid,
      uniGridItem
    },
    props:{
      listImg: {
        type: Array,
        default: []
      },
      showDeleteButtom:{
        type:Boolean,
        default: false
      }
    },
    methods:{
      getDeleteImg(){
        return require('@/static/z/images/delete.png')
      },
      deleteImg(index){
        this.listImg.splice(index,1)
      },
      viewImg(index){
        uni.previewImage({
          urls:this.listImg ,
          current:index,
          loop:true,
          longPressActions: {
            itemList: ['保存图片'],
            success: function(data) {
              uni.saveImageToPhotosAlbum({
                filePath: this.listImg[data.index],
                success: function () {
                  uni.showToast({
                    title: '保存成功',
                    duration: 1000
                  });
                }
              });
            },
          }
        });
      }
    }
  }
</script>

<style scoped>
  .delete-image{
    width: 16rpx;
    height:16rpx;
    position: relative;
    left: 90%;
  }
  .image-content{
    width: 100%;
    height:90%;
    margin: auto;
  }
</style>