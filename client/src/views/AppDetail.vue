<template>
  <div class="detail-wrapper">
    <div class="detail-header">
      <div class="app-logo">
        <img :src="appDetail.icon" alt="" class="app-logo-img" />
        <div class="app-name">
          <h2>{{ appDetail.title }}</h2>
          <p>Developer：{{ appDetail.developer }}</p>
        </div>
      </div>
      <div class="app-info">
        <ul class="app-info-list">
          <li class="app-info-list-item">
            <p>ID</p>
            <p>
              {{ appDetail.id }}
            </p>
          </li>
          <li class="parting-line"></li>
          <li class="app-info-list-item">
            <p>PrimaryGenre</p>
            <p>
              {{ appDetail.primaryGenre }}
            </p>
          </li>
          <li class="parting-line"></li>

          <li class="app-info-list-item">
            <p>Free</p>
            <p>
              {{ appDetail.free }}
            </p>
          </li>
          <li class="parting-line"></li>

          <li class="app-info-list-item">
            <p>Price</p>
            <p>
              {{ appDetail.price }}
            </p>
          </li>
          <li class="parting-line"></li>
          <li class="app-info-list-item">
            <p>ContentRating</p>
            <p>
              {{ appDetail.contentRating }}
            </p>
          </li>
          <li class="parting-line"></li>

          <li class="app-info-list-item">
            <p>Version</p>
            <p>
              {{ appDetail.version }}
            </p>
          </li>
          <li class="parting-line"></li>

          <li class="app-info-list-item">
            <p>Score</p>
            <p>
              {{ appDetail.score }}
            </p>
          </li>
          <li class="parting-line"></li>

          <li class="app-info-list-item">
            <p>Released</p>
            <p>
              {{ appDetail.released }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="detail-content">
      <div class="detail-content-nav">
        <h2>Summarize</h2>
        <ul class="app-summarize">
          <li
            class="app-summarize-item"
            v-for="(item, index) in navData"
            :key="item.id"
            @click="changeTypeOpen(index)"
            :class="{ isOpen: item.isOpen }"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="detail-content-main">
        <router-view :appDetail="appDetail"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { ElLoading } from 'element-plus';

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = 'http://34.168.85.172:8080';

const route = useRoute();
const router = useRouter();

let appDetail = ref({});

onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  axios
    .get(`/getAppDetail/${route.query.id}`)
    .then((res) => {
      res.data.released = res.data.released.slice(0, 10);
      appDetail.value = res.data;
      router.push({
        path: `/detail/${navData.value[0].router}`,
      });
      loading.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

const navData = ref([
  {
    id: 1,
    title: 'AppInfo',
    router: 'appInfo',
    isOpen: true,
  },
]);

function changeTypeOpen(index) {
  navData.value.forEach((item) => {
    item.isOpen = false;
  });
  if (!navData.value[index].isOpen) {
    navData.value[index].isOpen = true;
  }
  router.push({
    path: `/detail/${navData.value[index].router}`,
  });
}
</script>

<style lang="less" scoped>
.detail-wrapper {
  padding: 40px 14%;
  background-color: #f2f2f5;
  min-height: 100vh;

  .detail-header {
    background-color: #fff;
    padding: 25px;
    border-radius: 10px;
    .app-logo {
      display: flex;

      .app-logo-img {
        width: 70px;
        height: 70px;
        border-radius: 24%;
      }

      .app-name {
        margin-left: 20px;
        margin-top: 10px;
        h2 {
          color: #222;
          font-size: 18px;
          font-weight: 600;
        }
        p {
          color: #999;
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
    .app-info {
      margin-top: 10px;
      padding: 0 25px;
      .app-info-list {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .parting-line {
          margin-top: 8px;
          height: 40px;
          border-right: 1px solid #bbbbbb;
        }

        .app-info-list-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            margin-top: 16px;
          }
        }
      }
    }
  }

  .detail-content {
    flex: 1;
    padding-top: 20px;
    display: flex;
    .detail-content-nav {
      width: 240px;
      background-color: #fff;
      border-radius: 10px;

      h2 {
        padding: 20px 20px 10px 20px;
      }
      .app-summarize {
        display: flex;
        flex-direction: column;
        .app-summarize-item {
          padding: 10px 10px 10px 25px;
          cursor: pointer;
          &:hover {
            background-color: #f2f2f5;
          }
        }
      }
    }

    .detail-content-main {
      flex: 1;
      margin-left: 20px;
      background-color: #ffffff;
      border-radius: 10px;
    }
  }
}

.isOpen {
  background-color: #e1e3e1;
}
</style>
