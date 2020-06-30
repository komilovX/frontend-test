import firebase from 'firebase/app'
export default {
  mutations: {
    addComment(state, comment) {
      state.comments.unshift(comment)
    }
  },
  actions: {
    async addComment({ commit, dispatch }, { product_id, ...data }) {
      try {
        const uid = await dispatch('getUid')
        const user = await getData(`/users/${uid}`)
        const ref = firebase.database().ref(`/comments/${product_id}`)
        await ref.push({
          user: user.name,
          ...data
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getCommentsById({ commit }, id) {
      try {
        return new Promise(resolve => {
          firebase
            .database()
            .ref(`/comments/${id}`)
            .on('value', function(snapshot) {
              const value = snapshot.val()
              if (value) {
                resolve(Object.keys(value).map(v => ({ id: v, ...value[v] })))
              } else {
                resolve([])
              }
            })
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}

async function getData(ref) {
  return await (
    await firebase
      .database()
      .ref(ref)
      .once('value')
  ).val()
}
