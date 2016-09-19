'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters.js'
import * as mutations from './mutations.js'
import * as actions from './actions.js'

Vue.use(Vuex)

const state = {
  keys: [
    {
      key: 'mkklvoj24eumpdgesokxrfprwl2ezbyl',
      label: 'Foobar'
    },
    {
      key: 'mkklvoj24eumpdgesokxrfprwl2ezbya',
      label: 'Another'
    }
  ]
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
