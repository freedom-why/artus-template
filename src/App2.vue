<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>

</script>

<style scoped>

</style>
