<template>
  <div class="navigation-menu" :class="{ display }">
    <div class="header">
      <router-link tag="h2" class="title" to="/">Frontend Test</router-link>
      <span @click="closeMenu" class="close-button">&#9746;</span>
    </div>
    <ul class="category">
      <li
        class="category-item"
        v-for="c in categories"
        :key="c.name"
        @click="changeCategory(c.url)"
      >
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [
        { name: 'Футболки', url: '/category/shirts' },
        { name: 'Брюки', url: '/category/trousers' },
        { name: 'Кроссовки', url: '/category/sneakers' }
      ]
    }
  },
  props: ['display'],
  methods: {
    closeMenu() {
      this.$emit('closeMenu')
    },
    changeCategory(url) {
      this.$router.push(url).catch(() => {})
      this.closeMenu()
    }
  }
}
</script>
<style lang="scss" scoped>
.navigation-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #fff;
  transition: margin 0.4s ease-in-out;
  width: 250px;
  margin-left: -250px;
  &.display {
    margin-left: 0;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    .title {
      font-size: 2rem;
      cursor: pointer;
    }
    .close-button {
      display: inline-block;
      cursor: pointer;
      font-size: 2.5rem;
    }
  }
}
.category {
  margin-top: 2rem;
  &-item {
    padding: 1.5rem;
    cursor: pointer;
    font-size: 1.8rem;
    border-bottom: 1px solid #eee;
    &:first-child {
      border-top: 1px solid #eee;
    }
    &:hover {
      background-color: #eee;
      color: #2e91fc;
    }
  }
}
</style>
