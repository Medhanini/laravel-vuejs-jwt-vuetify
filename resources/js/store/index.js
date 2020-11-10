import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

import auth from './auth'

export default new Vuex.Store({
    modules:{
        auth
    }
})