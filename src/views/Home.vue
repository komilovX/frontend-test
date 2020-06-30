<template>
  <div class="home">
    <div class="wrapper">
      <app-loading v-if="!products.length" />
      <div v-else>
        <h1 class="mb1">Главная</h1>
        <div class="row">
          <app-product v-for="p in products" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppProduct from '@/components/AppProduct.vue'
export default {
  data: () => ({
    products: []
  }),
  components: {
    AppProduct
  },
  async mounted() {
    const products = await this.$store.dispatch('fetchMainProducts')
    this.products = products
  }
}
</script>
