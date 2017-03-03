<template lang="html">
  <div class="qr-code fullbleed">
    <header>
      <span class="button" @click="leaveQr">✕</span>
    </header>
    <section>
      <img :src="qrCodeSrc" :alt="current.label">
      <div>{{current.label}}</div>
      <div class="secret">{{current.key | formatKey}}</div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import qr from 'qr-image'
export default {
  filters: {
    formatKey (key) {
      return key.toUpperCase().match(/.{4}/g).join('-')
    }
  },

  computed: {
    ...mapGetters(['current']),
    qrCodeSrc () {
      let uriKey = encodeURIComponent(this.current.key)
      let uriLabel = encodeURIComponent(this.current.label)
      let url = `otpauth://totp/${uriLabel}?secret=${uriKey}`
      let data = qr.imageSync(url, { type: 'png' })
      return 'data:image/png;base64,' + data.toString('base64')
    }
  },

  methods: {
    ...mapActions(['leaveQr'])
  }
}
</script>

<style lang="stylus" scoped>
.qr-code {
  display: flex
  flex-direction: column
}

.qr-code header {
  padding: .5rem
  flex-shrink: 0
  display: flex
  justify-content: flex-end
}

.qr-code section {
  padding: .5rem
  flex-grow: 1
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
}

.secret {
  font-size: .7rem
  color: #666
  font-family: Monaco, monospace
}

</style>
