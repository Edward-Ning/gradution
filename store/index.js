import Vue from 'vue'
import Vuex from 'vuex'
import {companyModule} from './companyModule/module'
import {userModule} from './userModule/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    company: companyModule,
    user: userModule
  }
})
