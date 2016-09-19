import notp from 'notp'
import b32 from 'thirty-two'

export function cleanKey (key) {
  return key.replace(/[^a-z2-7]+/g, '').slice(0, 32)
}

export function isValidKey (key) {
  return /^[a-z2-7]{32}$/.test(cleanKey(key))
}

export function getCode (key) {
  return notp.totp.gen(b32.decode(cleanKey(key)), {})
}
