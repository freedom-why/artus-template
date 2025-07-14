<template>
  <div style="height: 100%;">
    <el-config-provider :locale="zhCn" :namespace="nameSpace">
      <router-view v-slot="{ Component,route }">
        <transition name="fade-transform">
          <keep-alive :include="include">
            <component v-if="Component " :is="formatComponentInstance(Component,route)" :key="route.name"/>
          </keep-alive>
        </transition>
      </router-view>
    </el-config-provider>
  </div>
</template>
<script setup>
import { h, inject, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import BASE_API from '@/api/config.js'

const nameSpace = BASE_API.nameSpace
let gateway = import.meta.env.VITE_GATEWAY
const cachedViews = inject('cachedViews')
let include = ref([])

cachedViews((d) => {
  if (d.length === 0) return
  include.value = d
})


function formatComponentInstance (component, route) {
  let wrapper;
  if (component) {
    const wrapperName = gateway + route.path;
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName);
      return wrapper
    }
    wrapper = {
      name: wrapperName,
      render () {
        return h(component);
      },
    };
    wrapperMap.set(wrapperName, wrapper);
    return h(wrapper);
  }
}
</script>


