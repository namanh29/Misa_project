import Vue from 'vue';
import VueX from 'vuex';
import {toastMessage} from './toastMessage'
Vue.use(VueX)

export const store = new VueX.Store({
    state: {
      
    },
    modules: {
        toastMessage
    }
});