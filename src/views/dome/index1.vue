<template>
<LeftRightLayout :templateHeader="false">
  <template #header>
    <div v-auth="'change'" class="">
      <el-button type="primary">按钮模板</el-button>
    </div>
  </template>
  <template #left>
    asdasdas
  </template>
  <template #right>
    <artus-table></artus-table>
  </template>
</LeftRightLayout>
</template>
<script setup>
import LeftRightLayout from '@/template/leftRightLayout.vue'


</script>
