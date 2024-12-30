<template>
  <div class="appInfo">
    <h1 class="appInfo-title">Screenshot</h1>

    <div class="appInfo-content">
      <div class="content-img">
        <img
          v-for="(item, index) in state.screenshots"
          :src="item"
          alt=""
          class="img"
        />
        <p :class="state.screenshots.length === 0 ? '' : 'nodata'">No Data!</p>
      </div>
      <div class="introduce">
        <h1 class="introduce-title">Description</h1>
        <p class="introduce-content">{{ state.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const state = ref({});
const prop = defineProps({
  appDetail: { type: Object, required: true },
});
state.value = prop.appDetail;
</script>

<style lang="less" scoped>
.appInfo {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;

  .appInfo-title {
    font-size: 20px;
    font-weight: bold;
    margin: 20px;
  }

  .appInfo-content {
    margin-top: 40px;
    margin-left: 10px;
    .content-img {
      display: flex;
      flex-wrap: wrap;

      .img {
        margin-right: 20px;
        margin-bottom: 15px;
        border-radius: 10px;
        width: 120px;
      }
    }
    .introduce {
      margin-top: 20px;
      .introduce-title {
        font-size: 20px;
        font-weight: bold;
      }
      .introduce-content {
        font-size: 16px;
        margin-top: 10px;
        line-height: 1.5;
      }
    }
  }
}

.nodata {
  display: none;
}
</style>
