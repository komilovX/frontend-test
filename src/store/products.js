import firebase from 'firebase/app'
export default {
  actions: {
    async fetchMainProducts({ commit }) {
      try {
        return new Promise(resolve => {
          rootRef()
            .orderByChild('main')
            .equalTo(true)
            .on('value', function(snapshot) {
              const value = snapshot.val()
              if (value) {
                resolve(Object.keys(value).map(v => ({ id: v, ...value[v] })))
              }
            })
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getProductsByCategory({ commit }, name) {
      try {
        return new Promise(resolve => {
          rootRef()
            .orderByChild('category')
            .equalTo(name)
            .on('value', function(snapshot) {
              const value = snapshot.val()
              if (value) {
                resolve(Object.keys(value).map(v => ({ id: v, ...value[v] })))
              }
            })
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getProductById({ commit }, id) {
      try {
        return (
          await rootRef()
            .child(id)
            .once('value')
        ).val()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}

function rootRef() {
  return firebase.database().ref('products')
}
