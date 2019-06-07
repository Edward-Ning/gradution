import * as mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
export const userModule = {
  namespaced: true,
  state: {
    currentUser: null,
    isLogin: false,
    bgKey: 'user-message',
    url: '/'
  },
  mutations: mutations,
  getters: getters,
  actions: actions
}
