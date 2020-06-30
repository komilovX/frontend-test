<template>
  <div class="home">
    <div class="wrapper">
      <app-loading v-if="!products.length" />
      <div v-else>
        <h1 class="mb1">{{ categoryName }}</h1>
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
    products: [],
    categories: {
      shirts: 'Футболки',
      trousers: 'Брюки',
      sneakers: 'Кроссовки'
    }
  }),
  components: {
    AppProduct
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const products = await this.$store.dispatch(
          'getProductsByCategory',
          this.$route.params.name
        )
        this.products = products
      } catch (e) {}
    }
  },
  computed: {
    categoryName() {
      console.log(
        'this.$route.params.name',
        this.categories[this.$route.params.name]
      )
      return this.categories[this.$route.params.name]
        ? this.categories[this.$route.params.name]
        : ''
    }
  },
  watch: {
    $route() {
      this.fetchProducts()
    }
  }
}
</script>
