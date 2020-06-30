<template>
  <div>
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <div class="info">
        <h3>{{ comment.user }}</h3>
        <span class="date">{{ dateFormatter(comment.date) }}</span>
        <app-rate-static v-if="comment.rate" :value="comment.rate" />
      </div>
      <div class="data">
        {{ comment['comment'] }}
      </div>
    </div>
  </div>
</template>
<script>
import AppRateStatic from '@/components/AppRateStatic.vue'
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  methods: {
    dateFormatter(date) {
      return new Date(date).toLocaleDateString('ru-RU')
    }
  },
  components: {
    AppRateStatic
  }
}
</script>
<style lang="scss" scoped>
.comment {
  display: flex;
  padding: 1rem;
  min-height: 100px;
  border-bottom: 1px solid #ccc;
  .info {
    flex: 0 0 25%;
    font-size: 1.3rem;
    h3 {
      margin-bottom: 4px;
    }
    .date {
      display: inline-block;
      padding: 4px 2px;
    }
  }
  .data {
    font-size: 1.3rem;
    flex: 1;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    .info {
      display: flex;
      align-items: center;
      flex: 0;
      & > * {
        margin-right: 5px;
      }
    }
  }
}
</style>
