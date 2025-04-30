<template>
  <SystemLayle :templateHeader="false">
    <template #header>
      <div v-auth="'change'" class="">
        <el-button type="primary">按钮模板</el-button>
      </div>
    </template>
    <artus-table></artus-table>
  </SystemLayle>
</template>

<script setup>
import { ref } from 'vue'
import SystemLayle from "@/template/systemLayle.vue"
</script>

<style scoped>

</style>
