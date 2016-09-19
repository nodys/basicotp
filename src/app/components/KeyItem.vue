<template lang="html">
  <div class="item" :class="classes">
    <div class="label">{{label}}</div>
    <div class="code">{{code}}</div>
    <div class="timeout" :style="timeout"></div>
  </div>
</template>
<script>
import notp from 'notp'
import b32 from 'thirty-two'

export default {
  props: ['item'],
  data () {
    return {
      code: '301365',
      timeout: {
        width: '50%'
      },
      classes: {
        outoftime: true
      }
    }
  },
  computed: {
    label () {
      return this.item.label
    }
  },
  created () {
    this.intervalTimeout = setInterval(() => {
      let seconds = (new Date()).getSeconds()
      let progress = 100 - (seconds % 30 * 100 / 30)
      this.timeout = Object.assign({}, this.timeout, { width: progress + '%' })
      this.classes.outoftime = seconds % 30 > 25
      this.updateCode()
    }, 100)
  },
  destroyed () {
    clearInterval(this.intervalTimeout)
  },
  methods: {
    updateCode () {
      // let raw = b32.decode(this.item.key.replace(/\s+/g, ''))
      // let code = notp.totp.gen(raw, {})
      // this.code = code
    }
  },
  components: {},
  watch: {
    // key (key) {
    //   console.log('key change', key)
    //   this.updateCode()
    // }
  }
}
</script>
<style lang="css" scoped>

.item {

}

.label {
  text-align: center;
}

.code {
  text-align: center;
  font-family: monospace;
  font-size: 2rem;
  box-sizing: border-box;
  min-height: 2rem;
}

.key {
  text-align: center;
  font-family: monospace;
  font-size: 0.8rem;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

.timeout {
  background-color: #008abe;
  height: 5px;
  transition: background-color 1s ease-in-out;
}

.item .timeout {
  background-color: #be0000;
}

.item .code {
  color: #999;
}

</style>
