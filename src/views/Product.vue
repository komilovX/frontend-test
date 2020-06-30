<template>
  <div style="position: relative">
    <app-loading v-if="!product" />
    <div v-else class="container">
      <button @click="$router.back()" class="btn btn-text small">&larr;</button>
      <img :src="product.photoUrl" alt="Unsplash" />
      <h2 class="title">
        {{ product.name }}
      </h2>
      <h3 class="price">Цена:&nbsp;{{ product.price }} $</h3>
      <div class="content mb1">
        <p>
          {{ product.text }}
        </p>
      </div>
      <div class="comments">
        <h1 class="text-center mb1">КОММЕНТАРИИ</h1>
        <div>
          <app-comment
            v-if="isAuth"
            class="mb1"
            :product_id="$route.params.id"
            @newComment="addComment($event)"
          />
          <div v-else class="info">
            <h2>Вы может оставить комментарий после авторизации</h2>
            <router-link tag="a" href="#" to="/login">Вход</router-link>
          </div>
        </div>
        <app-comment-list :comments="comments" />
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import AppComment from '@/components/AppComment.vue'
import AppCommentList from '@/components/AppCommentList.vue'
export default {
  data: () => ({
    product: null,
    comments: []
  }),
  methods: {
    addComment(comment) {
      this.comments.push(comment)
    }
  },
  async mounted() {
    firebase
      .database()
      .ref(`/comments/${this.$route.params.id}`)
      .on('value', snapshot => {
        const value = snapshot.val()
        if (value) {
          this.comments = Object.keys(value).map(v => ({ id: v, ...value[v] }))
        }
      })
    try {
      const product = await this.$store.dispatch(
        'getProductById',
        this.$route.params.id
      )
      this.product = product
    } catch (e) {}
  },
  components: {
    AppComment,
    AppCommentList
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 800px;
  padding: 2rem;
  margin: 0 auto;
  .btn {
    font-size: 2rem;
    font-weight: 700;
  }
  img {
    width: 100%;
    max-height: 500px;
  }
  .title {
    font-size: 1.8rem;
    padding: 1rem 0 0.5rem;
  }
  .price {
    font-size: 1.6rem;
    padding: 0.5rem 0;
  }
  .content {
    font-size: 1.6rem;
  }
  .comments {
    padding: 2rem 0;
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // font-size: 1.4rem;
      h2 {
        font-size: 1.6rem;
        margin-bottom: 5px;
        color: #ff5035;
      }
    }
  }
}
</style>
