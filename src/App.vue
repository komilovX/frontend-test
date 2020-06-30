<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script>
import MainLayout from '@/layouts/MainLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    MainLayout,
    EmptyLayout
  }
}
</script>
<style lang="scss" scoped></style>
