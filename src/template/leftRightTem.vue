<template>
  <div class="flex-space-between height-inherit">
    <div class="box-template left-box">
      <slot name="left"></slot>
    </div>
    <div class="box-template right-box">
      <slot name="rightHeader" slotClass="basic-box padding_10  margin-b_10"></slot>
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
::v-deep(.basic-box) {
  background:  $bg-black-2a2b2f;
}
.box-template {
  padding: 20px 10px;
  background: #36373a;
  border: none;
  border-radius: 8px;
  height: inherit;
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
