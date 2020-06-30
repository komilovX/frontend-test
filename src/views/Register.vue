<template>
  <div class="login">
    <form class="form" @submit.prevent="submitHandler">
      <h2 class="form-title text-center mb2">Регистрация</h2>
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
            class="error-text invalid"
            >Введите корректный адрес электронной почты</small
          >
        </div>
        <div class="input-field">
          <label class="label" for="name">Имя</label>
          <input
            v-model.trim="name"
            type="text"
            class="input"
            :class="{ invalid: $v.name.$dirty && !$v.name.required }"
            id="name"
          />
          <span class="error-text" v-if="$v.name.$dirty && !$v.name.required"
            >Поле не должно быть пустым</span
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
        <div class="input-field">
          <label class="label" for="confirmPassword"
            >Подтверждение пароля</label
          >
          <input
            v-model.trim="repeatPassword"
            type="password"
            class="input"
            :class="{
              invalid: $v.repeatPassword.$dirty && !$v.repeatPassword.required
            }"
            id="confirmPassword"
          />
          <span
            class="error-text"
            v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.required"
            >Поле не должно быть пустым</span
          >
          <small
            v-else-if="$v.repeatPassword.$dirty && !$v.repeatPassword.minLength"
            class="error-text"
            >Минимальная длина пароля
            {{ $v.repeatPassword.$params.minLength.min }} символов, Сейчас
            {{ $v.repeatPassword.$model.length }}</small
          >
          <span
            class="error-text"
            v-else-if="
              $v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword
            "
            >Подтверждение пароля не совпадают</span
          >
        </div>
      </div>
      <div class="form-action mb2">
        <button type="submit" class="btn btn-primary" style="width: 100%">
          Создать аккаунт
        </button>
      </div>
    </form>
    <div class="action-link mt2 text-center">
      <router-link to="/" tag="a" class="text-center">Главная</router-link> |
      <router-link to="/login" tag="a" class="text-center">Войти</router-link>
    </div>
  </div>
</template>
<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    email: '',
    password: '',
    name: '',
    repeatPassword: ''
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    name: { required },
    repeatPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      await this.$store.dispatch('register', formData)
      this.$message.success('Пользователь успешно создала')
      this.$router.push('/login')
    }
  }
}
</script>
