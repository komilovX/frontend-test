import { shallowMount } from '@vue/test-utils'
import AppNavigation from '@/components/AppNavigation.vue'

describe('AppNavbar.vue', () => {
  it('When isAuth is true text of tag a should be Выход', () => {
    const wrapper = shallowMount(AppNavigation, {
      stubs: ['router-link'],
      propsData: {
        display: true
      }
    })
    const nanigation = wrapper.find('.navigation-menu')
    expect(nanigation.classes()).toContain('display')
  })
})
