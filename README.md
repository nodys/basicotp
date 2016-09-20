# BasicOTP

A two-factor authentication application for one-time password based on time.

## Feature

- Based on [electron](http://electron.atom.io/) and [notp](https://www.npmjs.com/package/notp)
- Works for [TOTP](https://tools.ietf.org/html/rfc6238) keys
- Store based on aes256 encryption

## Beta software

This application is essentially an experimentation/demonstration of a desktop application
based on [electron](http://electron.atom.io/), [notp](https://www.npmjs.com/package/notp)
[vuejs](https://vuejs.org/) and [vuex](https://github.com/vuejs/vuex),
[browserify](https://github.com/substack/node-browserify) and
[browserify-hmr](https://github.com/AgentME/browserify-hmr).

*Play with it, use it at your own risk.*

## Getting started

Clone this repository and run `npm install`

- `npm run dev`: To build a developement version in the build folder
- `npm run dev-start`: To start the developement version with electron
- `npm run dev-serve`: To serve the developement version in a http server (see http://localhost:8080)
- `npm run dist`: To build a packaged version

See package.json scripts for details.

## Missing

- [ ] Tests & coverage
- [ ] Documentation
- [ ] Add a [vue-router](https://github.com/vuejs/vue-router)
