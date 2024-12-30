<template>
  <el-table
    :data="currentState?.data"
    table-layout="fixed"
    :default-sort="{ prop: 'releaseDate', order: 'descending' }"
  >
    <el-table-column prop="rank" label="rank" sortable />
    <el-table-column prop="id" label="id" />
    <el-table-column prop="appId" label="appId" />
    <el-table-column prop="title" label="title"
      ><template v-slot="scope">
        <a
          class="link"
          :href="`/detail?id=${scope.row.id}`"
          target="_blank"
          style="text-decoration: none; color: black"
        >
          {{ scope.row.title }}
        </a>
      </template>
    </el-table-column>
    <el-table-column prop="category" label="category" />
    <el-table-column
      prop="releaseDate"
      label="releaseDate"
      sortable
      :formatter="formatter"
    />
    <el-table-column prop="" label="">
      <template v-slot="scope">
        <a
          :href="`https://app.sensortower.com/overview/${scope.row.id}`"
          target="_blank"
        >
          <img
            :src="scope.row.icon"
            alt=""
            width="50px"
            style="border-radius: 8px"
          />
        </a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useSharedState } from '@/hook/useSharedState';

const { currentState } = useSharedState();

const formatter = (row) => {
  return row.releaseDate.slice(0, 10);
};
</script>
<style lang="less" scoped>
:deep(.el-table__cell) {
  color: #222222;
}
</style>
