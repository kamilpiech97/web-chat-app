import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Register from '@/components/Register'
import VueRouter from 'vue-router'
import flash from 'vue-flash-message';

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(flash)

const wrapper = shallowMount(Register, { localVue })
wrapper.setData({ email: 'email', password: 'password', nickname: 'nickname' })

describe('Register Front Tests', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('wrapper has button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  test('button Register is visible', () => {
    expect(wrapper.find('#register').isVisible()).toBe(true)
  })

  test('button login is exists', () => {
    const button = wrapper.find('#register');
    expect(button.exists()).toBe(true);
  })

  test('button register has text', () => {
    const button = wrapper.find('#register');
    expect(button.text()).toBe('Zarejestruj');
  })

  test('button login has text', () => {
    const button = wrapper.find('#login');
    expect(button.text()).toBe('Zaloguj się!');
  })

  test('button login is visible', () => {
    const button = wrapper.find('#login');
    expect(button.exists()).toBe(true);
  })

  test('wraper is div', () => {
    expect(wrapper.is('div')).toBe(true)
  })

  test('wraper check email data', () => {
    expect(wrapper.vm.email).toBe('email')
  })

  test('wraper check password data', () => {
    expect(wrapper.vm.password).toBe('password')
  })

  test('wraper check nickname data', () => {
    expect(wrapper.vm.nickname).toBe('nickname')
  })

})


