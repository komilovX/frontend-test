import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AppNavbar from '@/components/AppNavbar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AppNavbar.vue', () => {
  let state
  let getters
  let store

  beforeEach(() => {
    getters = {
      isAuthenticated: () => true
    }

    store = new Vuex.Store({
      state,
      getters
    })
  })

  it('When isAuth is true text of tag a should be Выход', () => {
    const wrapper = shallowMount(AppNavbar, {
      store,
      localVue,
      stubs: ['router-link']
    })
    const a = wrapper.find('a')
    expect(a.text()).toContain('Выход')
  })
})
