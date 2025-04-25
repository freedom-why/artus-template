<template>
  <leftRightTem>
    <template v-slot:left>
      weqweqweqw
    </template>
    <template v-slot:right>
      <div v-auth="'change'" class="flex-start basic-box padding_10 margin-b_10">
        <el-button type="primary">按钮模板</el-button>
      </div>
      <artus-table></artus-table>
    </template>
  </leftRightTem>
</template>
<script setup>
import LeftRightTem from '@/template/leftRightTem.vue'


</script>
