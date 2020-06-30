export default {
  state: {
    navigation: false
  },
  mutations: {
    changeNavigation(state, status) {
      state.navigation = status
    }
  },
  actions: {},
  getters: {
    navigationStatus: state => state.navigation
  }
}
