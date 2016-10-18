<template lang="html">
  <div class="qr-code fullbleed">
    <header>
      <span class="button" @click="leaveQr">✕</span>
    </header>
    <section>
      <img :src="qrCodeSrc" :alt="current.label">
      <div>{{current.label}}</div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import qr from 'qr-image'
export default {
  // Data
  // data () { return {} },
  // props: { label: { type: String, required: true }}
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

  // Methods
  methods: {
    ...mapActions(['leaveQr'])
  },

  watch: {},

  // Life Cycle
  // beforeCreate () {},
  // created () {},
  // beforeDestroy () {},
  // destroyed () {},
  // beforeMount () {},
  // mounted () {},
  // beforeUpdate () {},
  // updated () {},
  // activated () {},
  // deactivated () {},

  // Assets
  directives: {},
  transitions: {},
  filters: {},
  components: {}
}
</script>
<style lang="css" scoped>
.qr-code {
  display: flex;
  flex-direction: column;
}
.qr-code header {
  padding: .5rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
}

.qr-code section {
  padding: .5rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
