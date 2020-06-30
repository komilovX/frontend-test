<template>
  <div class="error">
    <h1>404</h1>
    <h2 class="mb1">Page Not Found</h2>
    <router-link tag="a" to="/">Главная</router-link>
  </div>
</template>
<style lang="scss" scoped>
.error {
  text-align: center;
  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 3rem;
  }
}
</style>
