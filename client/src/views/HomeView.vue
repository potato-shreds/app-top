<template>
  <div>
    <Header></Header>
    <div class="content-wrapper">
      <Filter></Filter>
      <Content></Content>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Filter from "@/components/Filter/Filter.vue";
import Content from "@/components/Content/Content.vue";
import Footer from "@/components/Footer/Footer.vue";
</script>

<style lang="less" scoped>
.content-wrapper {
  padding: 0 60px;
}
</style>
