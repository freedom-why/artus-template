<template>
  <div class="flex-space-between height-inherit">
    <div class="box-template left-box">
      <slot name="left"></slot>
    </div>
    <div class="box-template right-box">
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.box-template {
  //background: #36373a;
  border: none;
  padding: 10px;

}
.left-box {
  height: 100%;
  width: 25%;
  min-width: 150px;
}

.right-box {
  width: calc(75% - 10px);
  min-width: 440px;
  margin-left: 10px;
}

</style>
