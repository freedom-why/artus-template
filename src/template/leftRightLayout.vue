<!--左右布局-->
<template>
  <div class="template-style">
    <div class="header-btn-box" v-if="templateHeader">
      <slot name="header"></slot>
    </div>
    <div class=" flex-space-between" :class="templateHeader?'betweenMain':'contentHeight'">
      <div class="template-left" :style="{'width': props.leftWith}">
        <slot name="left"></slot>
      </div>
      <div class="template-right" :style="`width: calc(100% - ${props.leftWith} - 10px)`">
        <slot name="right"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  leftWith: {
    type: String,
    default: '45%'
  },
  templateHeader: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>


</style>
