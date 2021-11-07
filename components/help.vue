<template lang="pug">
div#helpbox
    p Move sliders to change parameters
    p Drag-n-drop image onto canvas for a new one
    h3 Keys
    #keys(v-for="key in keymap" v-bind:key='key.key')
        span #[span.key {{ key.keys.join(', ') }} ] {{ key.note }}

</template>

<script>
const keymap = [
  {
    keys: ['1'],
    note: 'Toggle square pixels'
  },
  {
    keys: ['2'],
    note: 'Toggle circle pixels'
  },
  {
    keys: ['b'],
    note: 'Toggle background black | white'
  },
  {
    keys: ['d'],
    note: 'Reset sliders to initial state'
  },
  {
    keys: ['s'],
    note: 'Save'
  }
]

export default {
  data () {
    return { keymap }
  }
}
</script>

<style scoped>
#helpbox {
  margin: 10px;
}

.key {
  font-family: monospace;
}
</style>
