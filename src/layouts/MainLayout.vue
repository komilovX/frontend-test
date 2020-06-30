<template>
  <div class="main-layout">
    <div class="navigation">
      <app-navigation @closeMenu="closeMenu" :display="isNavigationOpened" />
      <div
        @click="closeMenu"
        class="black-screen"
        :class="{ display: isNavigationOpened }"
      />
    </div>
    <app-navbar />
    <router-view />
  </div>
</template>
<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import messages from '@/utils/messages.js'
export default {
  components: { AppNavbar, AppNavigation },
  computed: {
    isNavigationOpened() {
      return this.$store.getters.navigationStatus
    },
    error() {
      return this.$store.getters.error
    }
  },
  methods: {
    closeMenu() {
      this.$store.commit('changeNavigation', false)
    }
  },
  watch: {
    error(fbError) {
      this.$message.error(messages[fbError.code] || 'Чтота пошло не так')
    }
  }
}
</script>
<style lang="scss" scoped>
.main-layout {
  min-height: 100%;
  background-color: #fafafa;
}
.black-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8888;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.4s ease-in-out;
  opacity: 0;
  visibility: hidden;
  &.display {
    visibility: visible;
    opacity: 1;
  }
}
</style>
