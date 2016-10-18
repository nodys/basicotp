import * as Mut from './mutation-types.js'

export default {
  [Mut.UPDATE_ALL_KEYS]: (state, payload) => {
    state.keys = payload.keys
  },

  [Mut.ADD_KEY]: (state, payload) => {
    let newKey = Object.assign({}, payload)
    if (state.keys.find(k => k.key === newKey.key)) {
      return
    } else {
      state.keys.push(Object.assign({}, {
        label: 'no name'
      }, payload))
    }
  },

  [Mut.UPDATE_KEY]: (state, { item, value }) => {
    Object.assign(item, value)
  },

  [Mut.DELETE_KEY]: (state, payload) => {
    let item = state.keys.find(key => key.key === payload.key)
    let index = state.keys.indexOf(item)
    if (index < 0) { return }
    state.keys.splice(index, 1)
  },

  [Mut.UPDATE_CODES]: (state, payload) => {
    payload.keys.forEach(item => {
      let stateKey = state.keys.find(k => k.key === item.key)
      if (stateKey) {
        let index = state.keys.indexOf(stateKey)
        state.keys.splice(index, 1, Object.assign({}, stateKey, {
          code: item.code
        }))
      }
    })
  },

  [Mut.UPDATE_TIMEOUT]: (state, payload) => {
    state.timeout = payload.timeout
  },

  [Mut.SET_MAIN_VIEW]: (state, payload = {}) => {
    state.mainView = payload.mainView
  },

  [Mut.SET_CURRENT]: (state, payload = {}) => {
    console.log('Set Current', payload.current)
    state.current = payload.current
  }
}
