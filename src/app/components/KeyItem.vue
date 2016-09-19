<template lang="html">
  <div class="nv-key-item item">
    <div class="flex">
      <div class="label">
        <input class="label-input" type="text" v-model="label" @input="updateLabel">
      </div>
      <div class="code">{{item.code}}</div>
      <!-- <div class="key">{{item.key}}</div> -->
    </div>
    <div class="remove-button" @click="handleRemove">
      ✕
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['item'],
  data () {
    return { }
  },
  computed: {
    label () {
      return this.item.label
    }
  },
  methods: {
    ...mapActions(['deleteKey']),
    updateLabel (event) {
      const label = event.target.value.trim()
      this.$store.dispatch('updateKey', { key: this.item.key, label })
    },
    handleRemove (event) {
      this.deleteKey(this.item)
    }
  }
}
</script>
<style lang="css" scoped>

.item {
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  padding: .5rem;
}

.item > .flex {
  flex-grow: 1;
}

.label {
  text-align: center;
}

.label-input {
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0;
  font-size: inherit;
  background: none;
  border: 0;
  outline: none;
  font-family: inherit;
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
  font-family: Monaco, monospace;
  font-size: 0.7rem;
  display: block;
  width: 100%;
  box-sizing: border-box;
  color: #999;
}

.remove-button {
  cursor: pointer;
  box-sizing: border-box;
  padding: .5rem;
  font-size: 1.5rem;
  color: #ccc;
  text-align: center;
  border-radius: 2px;
  transition: color 200ms ease-out;
}

.remove-button:hover {
  color: #000;
}

</style>
