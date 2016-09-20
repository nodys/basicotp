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
        <div class="keyadd-button" @click="handleAddKey">+</div>
      </div>
    </div>
  </div>
</template>
<script>
import NvKeyItem from './KeyItem.vue'
import NvFormSecret from './FormSecret.vue'
import NvFormDefineSecret from './FormDefineSecret.vue'
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
    NvFormDefineSecret
  },
  watch: {
    timeout (timeout) {
      this.progressStyle.width = (timeout * 100) + '%'
      this.classes.outoftime = timeout < 0.2
    }
  }
}
</script>
<style lang="css">
#app {
}

.fullbleed {
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.emptylist {
  font-size: 3rem;
  color: #ccc;
  padding: 3rem;
  text-align: center;
}

.keylist {
  flex-grow: 1;
  overflow: auto;
}

.keyadd {
  flex-shrink: 0;
  background: #eee;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #ccc;
}

.keyadd-input {
  flex-grow: 1;
  margin-right: 1rem;
  font-family: Monaco, monospace;
  outline: none;
}

.keyadd-button {
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1.5rem;
  color: #aaa;
  text-align: center;
  border-radius: 2px;
  transition: color 200ms ease-out;
}

.keyadd-button:hover {
  color: #000,
}

.timeout-back {
  background: #eee;
}

.timeout {
  background-color: #008abe;
  height: 5px;
  transition: background-color 5s ease-in-out, width 500ms ease-out;
}

.outoftime .timeout {
  background-color: #be0000;
}

.outoftime .nv-key-item .code {
  color: #ccc
}

.keylist-item {
  border-bottom: 1px solid #ccc;
}




</style>
