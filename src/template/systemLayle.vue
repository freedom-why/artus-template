<!--认证中心模块布局-->
<template>
  <div class="template-style">
    <div class="header-btn-box" v-if="templateHeader">
      <slot name="header"></slot>
    </div>
    <div class="template-content"   :class="templateHeader?'':'contentHeight'">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  templateHeader:{
    type:Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>



</style>
