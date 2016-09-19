const co = require('bluebird-co').co

export function loadKeys () {
  return co(function * () {
    return [
      {
        key: 'mkklvoj26eumpdgesokxrfprwl2ezbyl',
        label: 'Foobar',
        code: '-'
      },
      {
        key: 'mkklvoj24eumpdgesokxrfprwl2ezbya',
        label: 'Another',
        code: '-'
      },
      {
        key: 'mkzlvoj24eumpdgesokxrfprwl2ezbya',
        label: 'lol',
        code: '-'
      }
    ]
  })
}

export function saveKeys (keys) {
  //
}
