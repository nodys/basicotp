'use strict'

const fs = require('fs-extra-promise')
const co = require('bluebird-co').co
const crypto = require('crypto')
const path = require('path')
const homeOrTmp = require('home-or-tmp')

const BASICNOTP_FILEPATH = path.resolve(homeOrTmp, '.basicnotp')

function pDecrypt (data, secret) {
  data = data.trim()
  var result = ''
  var d = crypto.createDecipher('aes256', secret)
  result += d.update(data, 'base64', 'utf8')
  result += d.final('utf8')
  return result
}

function pEncrypt (data, secret) {
  data = data.trim()
  var result = ''
  var c = crypto.createCipher('aes256', secret)
  result += c.update(data, 'utf8', 'base64')
  result += c.final('base64')
  return result
}

const persistency = {
  loadKeys: co.wrap(function * (secret) {
    let exists = yield fs.existsAsync(BASICNOTP_FILEPATH)
    if (!exists) {
      return []
    }

    let encrypted = yield fs.readJsonAsync(BASICNOTP_FILEPATH, 'utf8')

    // Throw if invalid secret
    var decrypted = encrypted.map((entry) => {
      return Object.assign({}, entry, {
        key: pDecrypt(entry.key, secret)
      })
    })

    return decrypted
  }),

  saveKeys: co.wrap(function * (keys, secret) {
    let encrypted = keys.map((entry) => {
      return Object.assign({}, entry, {
        key: pEncrypt(entry.key, secret)
      })
    })
    fs.outputFileAsync(BASICNOTP_FILEPATH, JSON.stringify(encrypted, null, 2), 'utf8')
  })
}

module.exports = persistency
