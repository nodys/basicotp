'use strict'
import domready from 'domready'
import createApp from './app.js'

// Bootstrap application
domready(() => {
  let app = createApp()
  app.$mount('#app')
  window.app = app // For demo
})
