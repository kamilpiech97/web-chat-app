import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import List from '@/components/List'


const localVue = createLocalVue()

localVue.use(Vuex)

describe('List.vue', () => {



        const state = {
            user: {
                nickname: 'Kamil'
            },
        }

        const store = new Vuex.Store({
            state,
        })
        
        const wrapper = shallowMount(List, { store, localVue })
    

    it('renders "state.user" in first p tag', () => {
        const p = wrapper.find('p')
        expect(p.text()).toBe(state.user.nickname.toString())
    })

    it('renders "state.user" in first p tag and equal', () => {
        const p = wrapper.find('p')
        expect(wrapper.find('p').text()).toEqual('Kamil')
    })

})