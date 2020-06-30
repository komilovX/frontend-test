<template>
  <ul class="rate" @click="onStarClick">
    <li class="star" data-type="star" data-id="1"></li>
    <li class="star" data-type="star" data-id="2"></li>
    <li class="star" data-type="star" data-id="3"></li>
    <li class="star" data-type="star" data-id="4"></li>
    <li class="star" data-type="star" data-id="5"></li>
  </ul>
</template>
<script>
export default {
  methods: {
    onStarClick($event) {
      if ($event.target.dataset.type) {
        const value = $event.target.dataset.id || 0
        const parent = document.querySelector('.rate')
        const stars = parent.querySelectorAll('.star') || []
        this.$emit('onChecked', +value)
        stars.forEach(node => {
          if (node.dataset.id <= value) {
            node.classList.add('checked')
          } else {
            node.classList.remove('checked')
          }
        })
      }
    },
    clearRate() {
      const parent = document.querySelector('.rate')
      const stars = parent.querySelectorAll('.star') || []
      stars.forEach(node => {
        node.classList.remove('checked')
      })
    }
  }
}
</script>
