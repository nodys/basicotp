import { co } from 'bluebird-co'
import window from 'global/window'
import debounce from 'lodash.debounce'

const localStorage = window.localStorage

// Default browser persistency
var persistency = {
  loadKeys: co.wrap(function * () {
    let serialized = localStorage.getItem('basicnotp-keys') || '[]'
    return JSON.parse(serialized)
  }),

  saveKeys: co.wrap(function * (keys) {
    localStorage.setItem('basicnotp-keys', JSON.stringify(keys))
  })
}

// Replace by electron persistency layer (if any)
if (window.electronPersistency) {
  persistency = window.electronPersistency
}

// The actual client api:
export function loadKeys (secret) {
  return co(function * () {
    let keys = yield persistency.loadKeys(secret)
    return keys
  })
}

var debounceSave = debounce(function (keys, secret) {
  // Cleanup
  let copy = keys.map((item) => {
    return { key: item.key, label: item.label }
  })
  // Save
  persistency
    .saveKeys(copy, secret)
    .catch(error => {
      console.warn('Unable to save data!', error)
    })
}, 500)

export function saveKeys (keys, secret) {
  return co(function * () {
    debounceSave(keys, secret)
  })
}
