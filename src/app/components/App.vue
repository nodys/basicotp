<template lang="html">
  <div id="app" :class="classes">
    <div v-if="mainView === 'define-secret'" class="fullbleed">
      <nv-form-define-secret></nv-form-define-secret>
    </div>

    <div v-if="mainView === 'enter-secret'" class="fullbleed">
      <nv-form-secret></nv-form-secret>
    </div>

    <div v-if="mainView === 'running'" class="fullbleed">
      <div class="timeout-back">
        <div class="timeout" :style="progressStyle"></div>
      </div>
      <div class="emptylist" v-show="isEmpty">
        Not keys. Yet.
      </div>
      <div class="keylist">
        <div v-for="item in keys" class="keylist-item">
          <nv-key-item class="flex" :item="item"></nv-key-item>
        </div>
      </div>
      <div class="keyadd">
        <input type="text" class="keyadd-input" v-model="newkey" placeholder="Enter a new 2FA key..." @keyup.enter="handleAddKey">
        <div class="button" @click="handleAddKey">+</div>
      </div>
    </div>

    <div v-if="mainView === 'show-qr'" class="fullbleed">
      <nv-qr-code></nv-qr-code>
    </div>
  </div>
</template>

<script>
import NvKeyItem from './KeyItem.vue'
import NvFormSecret from './FormSecret.vue'
import NvFormDefineSecret from './FormDefineSecret.vue'
import NvQrCode from './QrCode.vue'
import { mapGetters, mapActions } from 'vuex'
import { isValidKey } from '../api/utils.js'

export default {
  data () {
    return {
      progressStyle: {
        width: '100%'
      },
      classes: {
        outoftime: false
      },
      newkey: ''
    }
  },
  methods: {
    ...mapActions(['startTimeRunner', 'loadKeys', 'addKey']),
    handleAddKey (event) {
      if (isValidKey(this.newkey)) {
        this.addKey({ key: this.newkey })
        this.newkey = ''
      }
    }
  },
  computed: {
    ...mapGetters(['keys', 'timeout', 'mainView']),
    isEmpty () {
      return !this.keys || this.keys.length === 0
    }
  },
  created () {
    this.loadKeys()
    this.startTimeRunner()
  },
  components: {
    NvKeyItem,
    NvFormSecret,
    NvFormDefineSecret,
    NvQrCode
  },
  watch: {
    timeout (timeout) {
      this.progressStyle.width = (timeout * 100) + '%'
      this.classes.outoftime = timeout < 0.2
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/index.styl'
</style>
