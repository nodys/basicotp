import * as Mut from './mutation-types.js'

export default {
  [Mut.ADD_KEY]: (state, payload) => {
    let newKey = Object.assign({}, payload)
    if (state.keys.find(k => k.key === newKey.key)) {
      return
    } else {
      state.keys.push(newKey)
    }
  }
}
