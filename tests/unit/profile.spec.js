import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Profile from '@/components/Profile'


const localVue = createLocalVue()
localVue.use(Vuex)

describe('Profile.vue', () => {


    const state = {
        user: {
            avatar: null,
            nickname: 'Kamil',
        },
    }

    const store = new Vuex.Store({
        state,
    })


    const wrapper = shallowMount(Profile, { data() {
            return {
                nickname: null,
                avatar: null
            }
        },
        store, localVue
    })

    test('wraper h3 text test', () => {
        expect(wrapper.find("h3").text()).toBe("Edycja konta");
    })

    
    test('wraper save button text test', () => {
        expect(wrapper.find(".btn-green").text()).toBe("Zapisz");
    })

    test('wraper input nickname null', () => {
        expect(wrapper.find({ ref: "nickname"}).text()).toBe("");
    })

    test('wraper input nickname test not null', () => {
        expect(wrapper.vm.nickname).toBe('Kamil')
    })
    
    test('wraper input avatar test not null', () => {
        expect(wrapper.vm.avatar).toBe(null)
    })

    

})