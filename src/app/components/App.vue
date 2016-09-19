<template lang="html">
  <div id="app" :class="classes">
    <div class="timeout" :style="progressStyle"></div>
    <div class="keylist">
      <div v-for="item in keys" class="keylist-item">
        <nv-key-item class="flex" :item="item"></nv-key-item>
      </div>
    </div>
  </div>
</template>
<script>
import NvKeyItem from './KeyItem.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      progressStyle: {
        width: '100%'
      },
      classes: {
        outoftime: false
      }
    }
  },
  methods: {
    ...mapActions(['startTimeRunner', 'loadKeys'])
  },
  computed: {
    ...mapGetters(['keys', 'timeout'])
  },
  created () {
    this.loadKeys()
    this.startTimeRunner()
  },
  components: {
    NvKeyItem
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
