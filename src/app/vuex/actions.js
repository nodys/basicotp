import * as Mut from './mutation-types.js'
import * as api from '../api/api.js'
import * as utils from '../api/utils.js'

let timeRunnerInterval = null

export const loadKeys = ({ commit, state }) => {
  api.loadKeys().then((keys) => {
    commit(Mut.UPDATE_ALL_KEYS, { keys })
  })
  .catch((error) => {
    // TODO: Display error message...
    console.error(error)
  })
}

export const saveKeys = ({ commit, state }) => {
  api.saveKeys([...state.keys])
  .catch((error) => {
    // TODO: Display error message...
    console.error(error)
  })
}

export const addKey = ({ commit, state }, payload) => {
  let label = payload.label || 'no name'
  let key = utils.cleanKey(payload.key)
  commit(Mut.ADD_KEY, {
    label,
    key
  })
}

export const updateKey = ({ commit, state }, payload) => {
  let item = state.keys.find(key => key.key === payload.key)
  if (!item) { return }
  commit(Mut.UPDATE_KEY, { item, value: payload })
}

export const deleteKey = ({ commit, state }, payload) => {
  let item = state.keys.find(key => key.key === payload.key)
  if (!item) { return }
  if (confirm('Do you really want to remove the key ' + item.label + '?')) {
    commit(Mut.DELETE_KEY, { key: item.key })
  }
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
