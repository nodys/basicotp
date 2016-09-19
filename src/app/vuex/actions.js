import * as Mut from './mutation-types.js'
import * as api from '../api/api.js'
import * as utils from '../api/utils.js'

let timeRunnerInterval = null

export const loadKeys = ({ commit, state }) => {
  return api.loadKeys().then((keys) => {
    commit(Mut.UPDATE_ALL_KEYS, { keys })
  })
  .catch((error) => {
    // TODO: Display error message...
    console.error(error)
  })
}

export const saveKeys = ({ commit, state }) => {
  return api.saveKeys([...state.keys])
  .catch((error) => {
    // TODO: Display error message...
    console.error(error)
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

export const updateCodes = ({ commit, state }) => {
  let hasChanges = false
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
