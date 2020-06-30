import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import comments from './comments'
import products from './products'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {},
  getters: {
    error: state => state.error
  },
  modules: {
    auth,
    comments,
    app,
    products
  }
})
