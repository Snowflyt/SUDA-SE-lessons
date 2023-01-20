<template>
  <div class="layout">
    <AppHeader />
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin: 10px;
  padding-left: $page-padding-left-right;
  padding-right: $page-padding-left-right;
}
</style>
