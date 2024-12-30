<template>
  <div class="header">
    <p class="header-content">
      {{ dataStore.headerTitle.nation }} App Store
      {{ dataStore.headerTitle.type }} Top -- {{ dataStore.headerTitle.category }}
    </p>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/dataStore.js";
const dataStore = useDataStore();
</script>
<style lang="less" scoped>
.header {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #657185;
  box-sizing: border-box;
  background: url("https://cdn.qimai.cn/qimai/201901/c7d5895e14dc70b13d976a2dafa3d892.jpg");
  margin-bottom: 20px;
}
.header-content {
  font-size: 26px;
  color: rgb(255, 255, 255);
  font-weight: 800;
  margin: 30px 0;
}
</style>
