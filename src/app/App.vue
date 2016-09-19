<template lang="html">
  <div id="app">
    <div class="keylist">
      <nv-key-item v-for="item in keys" :item="item"></nv-key-item>
    </div>
  </div>
</template>
<script>
import NvKeyItem from './components/KeyItem.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
    // return {
    //   keys: [
    //     {
    //       key: 'mkklvoj24eumpdgesokxrfprwl2ezbyl',
    //       label: 'Foobar'
    //     },
    //     {
    //       key: 'mkklvoj24eumpdgesokxrfprwl2ezbya',
    //       label: 'Another'
    //     }
    //   ]
    // }
  },
  computed: {
    keys () {
      console.log('Get keys...', this.$store)
      return []
    }
  },
  created () {
    console.log('test', this.$store)
  },
  destroyed () {

  },
  methods: {

  },
  components: {
    NvKeyItem
  }
}
</script>
<style lang="css" scoped>
.keylist > * {
  border-bottom: 1px solid #ccc;
}
</style>
