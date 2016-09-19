'use strict'

import Vue from 'vue'
import store from './vuex/store.js'
import App from './components/App.vue'
import domready from 'domready'

// Bootstrap application
domready(() => {
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    store,
    render: (h) => h(App)
  })

  window.store = store
})
