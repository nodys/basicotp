'use strict'

const fs = require('fs-extra-promise')
const co = require('bluebird-co').co
const crypto = require('crypto')
const path = require('path')
const homeOrTmp = require('home-or-tmp')

// Where to find the configuration file (not configurable)
const BASICOTP_FILEPATH = path.resolve(homeOrTmp, '.basicotp')

/**
 * Encrypt data with secret using aes256 cipher
 *
 * @param {string} data
 * @param {string} secret
 *
 * @return {string}
 */
function pDecrypt (data, secret) {
  data = data.trim()
  var result = ''
  var d = crypto.createDecipher('aes256', secret)
  result += d.update(data, 'base64', 'utf8')
  result += d.final('utf8')
  return result
}

/**
 * Decrypt data with secret using aes256 cipher
 *
 * @param {type} data
 * @param {type} secret
 *
 * @return {type}
 */
function pEncrypt (data, secret) {
  data = data.trim()
  var result = ''
  var c = crypto.createCipher('aes256', secret)
  result += c.update(data, 'utf8', 'base64')
  result += c.final('base64')
  return result
}

/**
 * Expose a simple api to persist data on the drive
 */
const persistency = {
  /**
   * Decrypt and load the keys using given secret
   */
  loadKeys: co.wrap(function * (secret) {
    let exists = yield fs.existsAsync(BASICOTP_FILEPATH)
    if (!exists) {
      return []
    }

    let encrypted = yield fs.readJsonAsync(BASICOTP_FILEPATH, 'utf8')

    // Throw if invalid secret
    var decrypted = encrypted.map((entry) => {
      return Object.assign({}, entry, {
        key: pDecrypt(entry.key, secret)
      })
    })

    return decrypted
  }),

  /**
   * Encrypt and save the keys using given secret
   */
  saveKeys: co.wrap(function * (keys, secret) {
    let encrypted = keys.map((entry) => {
      return Object.assign({}, entry, {
        key: pEncrypt(entry.key, secret)
      })
    })
    fs.outputFileAsync(BASICOTP_FILEPATH, JSON.stringify(encrypted, null, 2), 'utf8')
  })
}

module.exports = persistency
