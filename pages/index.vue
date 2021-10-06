<template lang="pug">
#app
  #title pixel8r

  button#focus(@click="setFocus") focus on canvas

  div
    #sketch-holder
      // Our sketch will go here!
    noscript
      p JavaScript is required to view the contents of this page.

</template>

<script>
import P5 from 'p5'
import Sketch from '@/assets/javascript/sketch.js'

let pchrome

export default {
  components: {
  },
  data () {
    return {
      currentText: 'placeholder',
      params: {}
    }
  },
  mounted () {
    const builder = (p5Instance) => {
      pchrome = new Sketch({ p5Instance }) // eslint-disable-line no-new
    }

    new P5(builder, 'sketch-holder') // eslint-disable-line no-new
  },
  methods: {
    setFocus () {
      this.canvas().focus()
    },
    canvas () {
      return document.getElementsByTagName('canvas')[0]
    }
  }
}
</script>

<style scoped>
/* @import "@/assets/css/core.css"; */
#title {
  background: linear-gradient(90deg, #f0f, #ff0);
  line-height: 1.5em;
  font-weight: 600;
  width: 25vw;
  letter-spacing: 0.1em;
  margin-bottom: 1em;
  padding: 1rem;
  font-size: 1.65em;
}

#bodycopy {
  width: 100%;
  height: 90%;
}

.text-controls {
  float: right;
}
</style>
