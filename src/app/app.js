'use strict'

import Vue from 'vue'
import store from './vuex/store.js'
import App from './components/App.vue'
import initMenu from './init-menu'

// Initialize the electron's menu
initMenu(store)

function createApp () {
  let app = new Vue({
    store,
    render: (h) => h(App)
  })
  return app
}

// Export an application builer
export default createApp
