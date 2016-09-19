import * as Mut from './mutation-types.js'

export const addKey = ({ commit, state }, payload) => {
  let label = payload.label || 'no name'
  let key = payload.key.replace(/[^a-z2-7]+/g, '').slice(0, 32)
  commit(Mut.ADD_KEY, {
    label,
    key
  })
}
