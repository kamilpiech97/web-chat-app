import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Profile from '@/components/Profile'
import flash from 'vue-flash-message';


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(flash)
describe('Profile.vue', () => {


    const state = {
        user: {
            avatar: 'avatar',
            nickname: 'Kamil',
        },
    }

    const store = new Vuex.Store({
        state,
    })


    const wrapper = shallowMount(Profile, { data() {
            return {
                avatar: 'avatar',
                nickname: 'Kamil',
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
    
    test('wraper exit button text test', () => {
        expect(wrapper.find(".btn-danger").text()).toBe("Zamknij");
    })

    test('wraper input nickname test not null', () => {
        expect(wrapper.vm.nickname).toBe('Kamil')
    })
    
    test('wraper input avatar test not null', () => {
        expect(wrapper.vm.avatar).toBe('avatar')
    })

    

})