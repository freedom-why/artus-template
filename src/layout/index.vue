<template>
  <div class="box-style">
    <div class="flex-start" style="height: 100%;">
      <div class="left-nav-style">
        <el-menu
            :default-active="route.path"
            class="nav-list"
            background-color="rgba(0,0,0,0)"
            text-color="#909499"
            router
            active-text-color="#fff">
          <sidebar-item v-for="(route,index) in routes" :key="route.path" :item="route"/>
        </el-menu>
      </div>
      <div class="child-content">
        <router-view v-slot="{ Component,route }">
          <transition name="animate__animated animate__fadeOut" mode="out-in"
                      enter-active-class="animate__fadeInUp" leave-active-class="animate__fadeOutUp">
            <component style="height: 100%" :is="Component" :key="route.name"/>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const {options: {routes}} = useRouter()

</script>

<style lang="scss" scoped>
.box-style {
  height: 100%;
}

.left-nav-style {
  width: 200px;
  position: relative;
  padding: 15px;
  background: rgb(36, 37, 38);
  border-radius: 8px;
  height: 100%;
}

.child-content {
  height: 100%;
  width: calc(100% - 200px);
}

.nav-list {
  border: none !important;
}

::v-deep(.el-menu-item) {
  border-radius: 4px;
  height: 42px;
  line-height: 42px;

  &:hover {
    color: #fff !important;
    background: none;
  }
}

::v-deep(.el-menu-item.is-active) {
  background: $--color-theme !important;
}
</style>
