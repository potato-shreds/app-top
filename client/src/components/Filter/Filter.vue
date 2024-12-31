<template>
  <div class="filter-container">
    <div class="filter-list">
      <div class="filter-col">
        <div class="filter-type">榜单类型</div>
        <div class="filter-content">
          <ul class="item-list">
            <li v-for="(item, index) in typeList" :key="item.id">
              <span
                class="btn-i"
                :class="item.isOpen ? 'open' : ''"
                @click="changeTypeOpen(index)"
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="filter-col">
        <div class="filter-type">地区</div>
        <div class="filter-content">
          <ul class="item-list">
            <li v-for="(item, index) in regionList">
              <span
                class="btn-i"
                :class="item.isOpen ? 'open' : ''"
                @click="changeRegionOpen(index)"
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="filter-list">
      <div class="filter-col">
        <div class="filter-type"><span>榜单类别</span></div>
        <div class="filter-content">
          <ul class="item-list">
            <li v-for="(item, index) in categoryList" :key="item.id">
              <span
                class="btn-i"
                :class="item.isOpen ? 'open' : ''"
                style="margin-bottom: 10px"
                @click="changeCategoryOpen(index)"
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted, watch } from 'vue';
import axios from '@/api/axios';
import { useDataStore } from '@/stores/dataStore.js';
import { useSharedState } from '@/hook/useSharedState';
import { ElLoading } from 'element-plus';

const dataStore = useDataStore();
const { state, current } = useSharedState();

const typeList = ref([
  {
    id: 0,
    name: 'PreeGrouping',
    isOpen: true,
  },
  {
    id: 1,
    name: 'Free',
    isOpen: false,
  },
]);
function changeTypeOpen(index) {
  typeList.value.forEach((item) => {
    item.isOpen = false;
  });
  if (!typeList.value[index].isOpen) {
    typeList.value[index].isOpen = true;
  }
}

const regionList = ref([
  {
    id: 0,
    name: 'US',
    isOpen: true,
  },
  {
    id: 1,
    name: 'CN',
  },
]);
function changeRegionOpen(index) {
  regionList.value.forEach((item) => {
    item.isOpen = false;
  });
  if (!regionList.value[index].isOpen) {
    regionList.value[index].isOpen = true;
  }
}

const categoryList = ref([
  {
    id: 0,
    name: 'Productivity',
    isOpen: true,
  },
  {
    id: 1,
    name: 'Books',
    isOpen: false,
  },
  {
    id: 2,
    name: 'Business',
    isOpen: false,
  },
  {
    id: 3,
    name: 'Education',
    isOpen: false,
  },
  {
    id: 4,
    name: 'Entertainment',
    isOpen: false,
  },
  {
    id: 5,
    name: 'Finance',
    isOpen: false,
  },
  {
    id: 6,
    name: 'Food & Drink',
  },
  {
    id: 7,
    name: 'Health & Fitness',
    isOpen: false,
  },
  {
    id: 8,
    name: 'Lifestyle',
  },

  {
    id: 9,
    name: 'Medical',
    isOpen: false,
  },
  {
    id: 10,
    name: 'Music',
    isOpen: false,
  },
  {
    id: 11,
    name: 'Navigation',
    isOpen: false,
  },
  {
    id: 12,
    name: 'News',
    isOpen: false,
  },
  {
    id: 13,
    name: 'Photo & Video',
    isOpen: false,
  },
  {
    id: 14,
    name: 'Reference',
    isOpen: false,
  },
  {
    id: 15,
    name: 'Shopping',
    isOpen: false,
  },
  {
    id: 16,
    name: 'Social Networking',
    isOpen: false,
  },
  {
    id: 17,
    name: 'Sports',
    isOpen: false,
  },
  {
    id: 18,
    name: 'Travel',
    isOpen: false,
  },
  {
    id: 19,
    name: 'Utilities',
    isOpen: false,
  },
  {
    id: 20,
    name: 'Weather',
    isOpen: false,
  },
]);
function changeCategoryOpen(index) {
  categoryList.value.forEach((item) => {
    item.isOpen = false;
  });
  if (!categoryList.value[index].isOpen) {
    categoryList.value[index].isOpen = true;
  }
}

watch(
  [typeList.value, regionList.value, categoryList.value],
  ([newTypeList, newRegionList, newCategoryList]) => {
    setHeaderTitle(newTypeList, newRegionList, newCategoryList);
  },
  {
    immediate: true,
  }
);

function setHeaderTitle(newTypeList, newRegionList, newCategoryList) {
  const type = newTypeList.find((item) => item.isOpen);
  const region = newRegionList.find((item) => item.isOpen);
  const category = newCategoryList.find((item) => item.isOpen);
  dataStore.headerTitle = {
    nation: region.name,
    type: type.name,
    category: category.name,
  };
}

function getData(data) {
  if (
    state.value.some(
      (item) =>
        item.type === typeList.value[data.type].name &&
        item.region === regionList.value[data.region].name &&
        item.category === categoryList.value[data.category].name
    )
  ) {
    const stateData = {};
    stateData.type = typeList.value.find((item) => item.isOpen).name;
    stateData.region = regionList.value.find((item) => item.isOpen).name;
    stateData.category = categoryList.value.find((item) => item.isOpen).name;
    current.value = {
      type: stateData.type,
      region: stateData.region,
      category: stateData.category,
    };
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  axios
    .get('/getData', {
      params: data,
    })
    .then((res) => {
      const stateData = {};
      stateData.data = res.data;
      stateData.type = typeList.value.find((item) => item.isOpen).name;
      stateData.region = regionList.value.find((item) => item.isOpen).name;
      stateData.category = categoryList.value.find((item) => item.isOpen).name;
      state.value.push(stateData);
      current.value = {
        type: stateData.type,
        region: stateData.region,
        category: stateData.category,
      };
      loading.close();
    })
    .finally(() => {
      loading.close();
    });
}

onMounted(() => {
  // Get the first page of data
  getData({
    type: typeList.value.findIndex((item) => item.isOpen),
    region: regionList.value.findIndex((item) => item.isOpen),
    category: categoryList.value.findIndex((item) => item.isOpen),
  });
});

onUpdated(() => {
  getData({
    type: typeList.value.findIndex((item) => item.isOpen),
    region: regionList.value.findIndex((item) => item.isOpen),
    category: categoryList.value.findIndex((item) => item.isOpen),
  });
});
</script>

<style lang="less" scoped>
.filter-container {
  width: 100%;
  .filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .filter-col {
      display: flex;
      align-items: center;
      .filter-type {
        color: #222;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 600;
        height: 25px;
        line-height: 25px;
        margin-right: 18px;
      }
      .filter-content {
        .item-list {
          display: flex;
          flex-wrap: wrap;
          .btn-i {
            border: 1px solid #d6d6d6;
            border-radius: 6px;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            height: 30px;
            line-height: 28px;
            padding-left: 10px;
            padding-right: 10px;
            text-align: center;
            margin-right: 10px;
            &:hover {
              background-color: #e9e8e8;
            }
          }
          .open {
            color: #00b38a;
            border: 1px solid #00b38a;
          }
          li:last-child {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
