import firebase from 'firebase/app'
export default {
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    }
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await dispatch('getUid')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}`)
          .set({
            name
          })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getUid({ commit }) {
      try {
        const user = await firebase.auth().currentUser
        return user ? user.uid : null
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('clearToken')
        commit('clearError')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
}
