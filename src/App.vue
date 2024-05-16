<template>
  <div style="height: 100%;">
    <el-config-provider :locale="locale" :namespace="nameSpace">
      <router-view v-slot="{ Component,route }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component  :is="Component" :key="route.name"/>
        </transition>
      </router-view>
    </el-config-provider>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import BASE_API from '@/api/config.js'
export default defineComponent({
  setup() {
    return {
      nameSpace: BASE_API.nameSpace,
      locale: zhCn,
    }
  },
})
</script>

