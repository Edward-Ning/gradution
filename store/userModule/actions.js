export const setUser = ({commit}, user) => {
  commit('userStatus', user)
}
export const setPermission = ({commit}, url) => {
  commit('userPermission', url)
}
export const confirmBgKey = ({commit}, bgKey) => {
  commit('bgKeyValue', bgKey)
}
