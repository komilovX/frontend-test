<template>
  <ul class="rate small">
    <li
      class="star"
      v-for="(checked, index) in rateLength"
      :key="index"
      :class="{ checked }"
    />
  </ul>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    rateLength() {
      let array = new Array(5).fill('')
      return array.map((_, index) => (index + 1 <= this.value ? true : false))
    }
  }
}
</script>
