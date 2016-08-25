import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

Vue.use(Vuex);
Vue.use(Router);

const state = {
	count: 1
};

const mutations = {
	INCREMENT(state){
		state.count ++;
	}
};

let VStore = new Vuex.Store({
	state,
	mutations
});

export {Vue,VStore,Router};