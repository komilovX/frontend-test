<template>
  <div class="navbar">
    <div class="left">
      <div class="burger" @click="burgerHandler">
        <div class="burger--button">&nbsp;</div>
      </div>
      <router-link tag="h1" class="navbar-title" to="/"
        >Frontend Test</router-link
      >
    </div>
    <div class="right">
      <a v-if="isAuth" href="#" @click.prevent="logout">Выход</a>
      <a v-else href="#" @click.prevent="login">Вход</a>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    async login() {
      this.$router.push('/login')
    },
    async logout() {
      const answer = confirm('Вы действительно хотите выйти')
      if (answer) {
        await this.$store.dispatch('logout')
      }
    },
    burgerHandler() {
      this.$store.commit('changeNavigation', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  height: 50px;
  padding: 0 1rem;
  box-shadow: 0 2px 1rem rgba(0, 0, 0, 0.1);
  .left {
    display: flex;
    align-items: center;
  }
  .burger {
    height: 3rem;
    cursor: pointer;
    padding: 0 1rem;
    margin-right: 1rem;
    background-color: #eee;

    &--button {
      position: relative;
      margin-top: 1.5rem;
      &,
      &::after,
      &::before {
        width: 3rem;
        height: 2px;
        background-color: #333;
        display: inline-block;
      }

      &::after,
      &::before {
        content: '';
        position: absolute;
        left: 0;
      }

      &::before {
        top: -0.6rem;
      }

      &::after {
        top: 0.6rem;
      }
    }
  }
  &-title {
    color: #2c3e50;
    cursor: pointer;
  }
}
</style>
