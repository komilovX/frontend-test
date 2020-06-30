import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import MessagePlugin from '@/utils/message.plugin'
import AppLoading from '@/components/AppLoading'
import router from './router'
import store from './store'
import './styles/index.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate)
Vue.use(MessagePlugin)

Vue.component('app-loading', AppLoading)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyCMGE9p4hig6C8-RSCOVUNM0qbAmf3jpRg',
  authDomain: 'komilov-frontend.firebaseapp.com',
  databaseURL: 'https://komilov-frontend.firebaseio.com',
  projectId: 'komilov-frontend',
  storageBucket: 'komilov-frontend.appspot.com',
  messagingSenderId: '830157775398',
  appId: '1:830157775398:web:ae6b96a01ca8a0c1527ce7'
})

let app

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('setToken', user.refreshToken)
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
