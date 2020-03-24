import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		userId:""
	},
	mutations: {
		login(state, payload) {
			state.hasLogin = true;
			state.loginProvider = payload.username;
			state.userId = payload.userid;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
	},
	getters:{

	},
	actions: {
	}
})

export default store
