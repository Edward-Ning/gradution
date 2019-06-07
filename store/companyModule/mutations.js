export const bgKeyValue = (state, bgKey) => {
  if (bgKey) {
    state.bgKey = bgKey
  } else {
    state.bgKey = ''
  }
}
