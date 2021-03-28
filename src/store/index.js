import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        backgroundColor:'#ffffff',
    },
    mutations: { 
        changeBackgroundColor: (state, data) => {
            state.backgroundColor = data            
        },
    }
});

export default store;