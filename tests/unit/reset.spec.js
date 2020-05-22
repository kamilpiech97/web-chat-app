import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Reset from '@/components/ResetPassword'
import VueRouter from 'vue-router'
import flash from 'vue-flash-message';

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(flash)

const wrapper = shallowMount(Reset, { localVue})
wrapper.setData({ email: 'email'})

describe('Reset Front Tests', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  
  test('wrapper has button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  test('button reset is visible', () => {
    expect(wrapper.find('.btn-lg').isVisible()).toBe(true)
  })
  
  test('button login is visible', () => {
    expect(wrapper.find('.btn-info').isVisible()).toBe(true)
  })

  test('button login is visible 2', () => {
    const button = wrapper.find('#login');
    expect(button.exists()).toBe(true);
  })

  test('button login has text', () => {
    const button = wrapper.find('#login');
    expect(button.text()).toBe('Zaloguj się!');
  })
  
  test('wraper is div', () => {
    expect(wrapper.is('div')).toBe(true)
  })
  
  test('wraper check email data', () => {
    expect(wrapper.vm.email).toBe('email')  
  })
  
  test('wraper h3 text test', () => {
    expect(wrapper.find("h2").text()).toBe("Resetowanie hasła");
    })


})


