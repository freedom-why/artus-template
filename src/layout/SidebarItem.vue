<template>
  <div v-if="!item.hidden">
    <el-menu-item v-if="!item?.children?.length" @click="navFun(item)"
                  :index="resolvePath(item.children?item.children[0]:item)">
      <template #title>
        <div v-if="item?.meta?.title">
          <el-icon>
            <component :is="item?.meta?.icon"></component>
          </el-icon>
          <span>{{ item?.meta?.title }}</span>
        </div>
      </template>
    </el-menu-item>
    <el-sub-menu v-else-if="!item?.meta?.hidden" ref="subMenu" :index="resolvePath(item)">
      <template #title>
        <div v-if="item?.meta?.title">
          <el-icon>
            <component :is="item?.meta?.icon"></component>
          </el-icon>
          <span>{{ item?.meta?.title }}</span>
        </div>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
                    class="nest-menu"/>
    </el-sub-menu>
    <sidebar-item v-else v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
                  class="nest-menu"/>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

import { useRouter } from 'vue-router'

let router = useRouter()
let gateway = import.meta.env.VITE_GATEWAY
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
})

let data = reactive({
  onlyOneChild: {},
})
const resolvePath = () => {
  const {path: routePath, parentPath} = props.item
  return routePath

}
const navFun = ({path, parentPath}) => {
  // let url = parentPath ? parentPath : gateway + path
  router.push(path)
  // window.history.pushState({}, '', url)
}
</script>
