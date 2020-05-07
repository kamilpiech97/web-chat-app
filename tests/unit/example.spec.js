import { mount } from '@vue/test-utils'
import Login from '@/components/Login'


const wrapper = mount(Login)
describe('Login Front Tests', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  
  test('wrapper has button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  test('button login is visible', () => {
    expect(wrapper.find('.btn-lg').isVisible()).toBe(true)
  })

  test('wraper is div', () => {
    expect(wrapper.is('div')).toBe(true)
  })

})


