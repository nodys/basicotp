<template lang="html">
  <div class="host">
    <h1>Please define your main password</h1>
    <p>In order to encrypt and decrypt your password file, please defined your main password.</p>
    <input type="password" @keyup.enter="submit" v-model="secret">
    <input placeholder="Please confirm" type="password" @keyup.enter="submit" v-model="confirm">
    <div>
      <button @click="submit"> OK </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      secret: '',
      confirm: ''
    }
  },
  methods: {
    submit () {
      if (this.secret.trim() && (this.secret === this.confirm)) {
        this.$store.dispatch('setSecret', { secret: this.secret })
        this.confirm = ''
        this.secret = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
/* Todo: Move out */
.host {
  padding: 2rem
  text-align: center
  display: flex
  flex-direction: column
  align-items: center
}

.host > * {
  margin: .5rem 0
}
</style>
