import * as mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
export const companyModule = {
  namespaced: true,
  state: {
    bgKey: 'company-message'
  },
  mutations: mutations,
  getters: getters,
  actions: actions
}
