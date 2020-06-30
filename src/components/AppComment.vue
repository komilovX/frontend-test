<template>
  <form @submit.prevent="submitHandler">
    <app-rate @onChecked="rate = $event" ref="rate" class="mb1" />
    <div class="input-field">
      <textarea
        v-model="comment"
        style="width: 100%"
        placeholder="Text..."
        class="mb1 p1 input"
        :class="{ invalid: $v.comment.$dirty && !$v.comment.required }"
        rows="4"
      />
      <span class="error-text" v-if="$v.comment.$dirty && !$v.comment.required"
        >Поле не должно быть пустым</span
      >
    </div>
    <button type="submit" class="btn btn-success small">
      Добавить
    </button>
  </form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import AppRate from '@/components/AppRate.vue'
export default {
  data: () => ({
    rate: null,
    comment: ''
  }),
  validations: {
    comment: { required }
  },
  props: ['product_id'],
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        date: new Date().getTime(),
        rate: this.rate,
        product_id: this.product_id,
        comment: this.comment
      }
      try {
        await this.$store.dispatch('addComment', formData)
        this.$message.success('Комментарий добавлен')
        this.$refs.rate.clearRate()
        this.comment = ''
      } catch (e) {}
    }
  },
  components: {
    AppRate
  }
}
</script>
