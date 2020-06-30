<template>
  <div class="product">
    <figure class="product--image">
      <img :src="product.photoUrl" alt="Unsplash" />
      <figcaption class="product--title">
        <h3>Цена:&nbsp;{{ product.price }} $</h3>
      </figcaption>
    </figure>
    <div class="product--content">
      <p class="product--text mb2">
        {{ product.name }}
      </p>
      <button
        @click="$router.push(`/product/${product.id}`)"
        class="btn btn-primary small"
      >
        Посмотреть
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.product {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
  &--image {
    max-height: 220px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 220px;
    }
  }
  &--title {
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    padding: 1rem;
    h3 {
      font-size: 1.6rem;
      color: #fff;
    }
  }
  &--content {
    padding: 1rem;
  }
  &--text {
    font-size: 1.5rem;
  }
}
</style>
