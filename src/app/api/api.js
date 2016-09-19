const co = require('bluebird-co').co
const window = require('global/window')
const localStorage = window.localStorage
const debounce = require('lodash.debounce')

// Default browser persistency
var debounceSave = debounce(function (keys) {
  localStorage.setItem('basicnotp-keys', JSON.stringify(keys))
}, 500)

var persistency = {
  loadKeys: co.wrap(function * () {
    let serialized = localStorage.getItem('basicnotp-keys') || '[]'
    return JSON.parse(serialized)
  }),

  saveKeys: co.wrap(function * (keys) {
    debounceSave(keys)
  })
}

// Replace by electron persistency layer (if any)
if (window.electronPersistency) {
  persistency = window.electronPersistency
}

// The actual client api:
export function loadKeys () {
  return co(function * () {
    let keys = yield persistency.loadKeys()
    keys.map(item => item.code = '-')
    return keys
  })
}

export function saveKeys (keys) {
  return co(function * () {
    // Cleanup
    let copy = keys.map((item) => {
      return { key: item.key, label: item.label }
    })
    // Save
    persistency.saveKeys(copy)
  })
}
