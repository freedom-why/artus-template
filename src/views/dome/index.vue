<template>
  <leftRightTem class="artus_datalargeScreen_index_left">
    <template v-slot:left>
      weqweqweqw
    </template>
    <template #rightHeader="{slotClass }">
      <div v-auth="'change'" class="flex-start" :class="slotClass">
        <el-button type="primary">按钮模板</el-button>
      </div>
    </template>
    <template v-slot:right>
      <artus-table></artus-table>
    </template>
  </leftRightTem>
</template>
<script setup>
import LeftRightTem from '@/template/leftRightTem.vue'


</script>
