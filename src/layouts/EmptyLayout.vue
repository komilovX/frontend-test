<template>
  <div class="empty-layout">
    <router-view />
  </div>
</template>
<script>
import messages from '@/utils/messages.js'
export default {
  computed: {
    error() {
      return this.$store.getters.error
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
.empty-layout {
  height: 100vh;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
