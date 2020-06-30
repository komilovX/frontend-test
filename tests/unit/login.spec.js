import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Login from '@/views/Login.vue'
const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()
describe('Login.vue', () => {
  let store
  let actions
  beforeEach(() => {
    actions = {
      login: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })
  it('should contain class invalid if form is invalid', done => {
    const wrapper = shallowMount(Login, {
      localVue,
      store,
      sync: true,
      stubs: ['router-link']
    })
    const form = wrapper.find('form')
    form.trigger('submit')
    Vue.nextTick(() => {
      const input = wrapper.find('.input')
      expect(input.classes('invalid')).toBe(true)
      done()
    })
  })
  it('should not contain class invalid if form is valid', done => {
    const wrapper = shallowMount(Login, {
      localVue,
      router,
      store,
      sync: true,
      stubs: ['router-link']
    })
    wrapper.setData({
      email: 'x@gmail.com',
      password: '123456',
      mock: { $router: { push: () => {} } }
    })
    const form = wrapper.find('form')
    form.trigger('submit')
    Vue.nextTick(() => {
      const input = wrapper.find('.input')
      expect(input.classes('invalid')).toBe(false)
      done()
    })
  })
})
