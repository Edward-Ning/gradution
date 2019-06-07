export const userStatus = (state, user) => {
  if (user) {
    state.currentUser = user
    state.isLogin = true
    state.url = ''
  } else {
    state.currentUser = ''
    state.isLogin = false
  }
}
export const userPermission = (state, url) => {
  state.url = url
}
export const bgKeyValue = (state, bgKey) => {
  if (bgKey) {
    state.bgKey = bgKey
  } else {
    state.bgKey = ''
  }
}
