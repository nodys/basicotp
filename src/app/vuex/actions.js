import * as Mut from './mutation-types.js'
import * as api from '../api/api.js'
import * as utils from '../api/utils.js'

let timeRunnerInterval = null

let secret = null

export const setSecret = (store, payload) => {
  secret = payload.secret
  if (store.state.keys) {
    store.commit(Mut.SET_MAIN_VIEW, { mainView: 'running' })
    if (store.state.keys.length) {
      store.dispatch('saveKeys')
    }
  } else {
    return store.dispatch('loadKeys')
  }
  // return store.dispatch('loadKeys')
}

export const defineSecret = (store, payload) => {
  store.commit(Mut.SET_MAIN_VIEW, { mainView: 'define-secret' })
}

export const loadKeys = ({ commit, state }, payload = {}) => {
  if (payload.secret) {
    secret = payload.secret
  }
  // if (!secret) {
  //   return commit(Mut.SET_MAIN_VIEW, { mainView: 'enter-secret' })
  // }
  return api.loadKeys(secret)
  .then((keys) => {
    commit(Mut.UPDATE_ALL_KEYS, { keys })
    if (!keys.length) {
      commit(Mut.SET_MAIN_VIEW, { mainView: 'define-secret' })
    } else {
      commit(Mut.SET_MAIN_VIEW, { mainView: 'running' })
    }
  }).catch((error) => {
    console.warn('Unable to load keys', error)
    commit(Mut.SET_MAIN_VIEW, { mainView: 'enter-secret' })
  })
}

export const saveKeys = ({ commit, state }) => {
  if (!secret) {
    return commit(Mut.SET_MAIN_VIEW, { mainView: 'enter-secret' })
  }
  return api.saveKeys([...state.keys], secret)
  .catch((error) => {
    console.warn('Unable to save keys', error)
    commit(Mut.SET_MAIN_VIEW, { mainView: 'enter-secret' })
  })
}

export const addKey = (store, payload) => {
  let label = payload.label || 'no name'
  let key = utils.cleanKey(payload.key)
  let code = utils.getCode(key)
  store.commit(Mut.ADD_KEY, {
    label,
    key,
    code
  })
  return saveKeys(store)
}

export const updateKey = (store, payload) => {
  let item = store.state.keys.find(key => key.key === payload.key)
  if (!item) { return }
  store.commit(Mut.UPDATE_KEY, { item, value: payload })
  return saveKeys(store)
}

export const deleteKey = (store, payload) => {
  let item = store.state.keys.find(key => key.key === payload.key)
  if (!item) { return }
  if (window.confirm('Do you really want to remove the key "' + item.label + '"?')) {
    store.commit(Mut.DELETE_KEY, { key: item.key })
  }
  return saveKeys(store)
}

export const showQr = ({ commit, state }, payload) => {
  let item = state.keys.find(key => key.key === payload.key)
  if (!item) { return }
  // Generate the QR Code, and mutate the view to show QR
  commit(Mut.SET_CURRENT, { current: item })
  commit(Mut.SET_MAIN_VIEW, { mainView: 'show-qr' })
}

export const leaveQr = ({ commit, state }, payload) => {
  commit(Mut.SET_MAIN_VIEW, { mainView: 'running' })
}

export const updateCodes = ({ commit, state }) => {
  let hasChanges = false
  if (!state.keys) {
    return
  }
  let keys = state.keys.map(item => {
    let code = utils.getCode(item.key)
    hasChanges = hasChanges || (item.code !== code)
    return Object.assign({}, item, { code })
  })
  if (hasChanges) {
    commit(Mut.UPDATE_CODES, { keys })
  }
}

export const updateTimeout = ({ commit, state }) => {
  let seconds = (new Date()).getSeconds()
  let timeout = (30 - (seconds % 30)) / 30
  if (state.timeout !== timeout) {
    commit(Mut.UPDATE_TIMEOUT, { timeout })
  }
}

export const startTimeRunner = (store) => {
  timeRunnerInterval = setInterval(() => {
    store.dispatch('updateCodes')
    store.dispatch('updateTimeout')
  }, 100)
}

export const stopTimeRunner = () => {
  if (timeRunnerInterval) {
    clearInterval(timeRunnerInterval)
    timeRunnerInterval = null
  }
}
