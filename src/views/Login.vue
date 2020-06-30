<template>
  <div class="login">
    <form class="form" @submit.prevent="submitHandler">
      <h2 class="form-title text-center mb2">Войти в свой аккаунт</h2>
      <div class="form-content mb2">
        <div class="input-field">
          <label class="label" for="email">Email</label>
          <input
            v-model.trim="email"
            type="email"
            class="input"
            :class="{ invalid: $v.email.$dirty && !$v.email.required }"
            id="email"
          />

          <span class="error-text" v-if="$v.email.$dirty && !$v.email.required"
            >Поле не должно быть пустым</span
          >
          <small
            v-else-if="$v.email.$dirty && $v.email.$invalid"
            class="helper-text invalid"
            >Введите корректный адрес электронной почты</small
          >
        </div>
        <div class="input-field">
          <label class="label" for="password">Пароль</label>
          <input
            v-model.trim="password"
            type="password"
            class="input"
            :class="{ invalid: $v.password.$dirty && !$v.password.required }"
            id="password"
          />
          <span
            class="error-text"
            v-if="$v.password.$dirty && !$v.password.required"
            >Поле не должно быть пустым</span
          >
          <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="error-text"
            >Минимальная длина пароля
            {{ $v.password.$params.minLength.min }} символов, Сейчас
            {{ $v.password.$model.length }}</small
          >
        </div>
      </div>
      <div class="form-action mb2">
        <button type="submit" class="btn btn-primary" style="width: 100%">
          Войти
        </button>
      </div>
    </form>
    <div class="action-link mt2 text-center">
      <router-link to="/" tag="a" class="text-center">Главная</router-link> |
      <router-link to="/register" tag="a" class="text-center"
        >Регистрация</router-link
      >
    </div>
  </div>
</template>
<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('login', formData)
      this.$router.push('/')
    }
  }
}
</script>
