<template lang="pug">
#app
  #title pixel8r

  modal(name="about")
    About

  modal(name="help", height="auto", :draggable="true")
    Help

  button(@click="help") help
  button(@click="about") About

  div
    #simple-gui
    .parent
      #sketch-holder
      // Our sketch will go here!
    noscript
      p JavaScript is required to view the contents of this page.

</template>

<script>
import P5 from 'p5'
import Sketch from '@/assets/javascript/sketch.js'
import VModal from 'vue-js-modal'
import Help from '@/components/help'
import About from '@/components/about'

let dottr

export default {
  components: {
    VModal,
    Help,
    About
  },
  mounted () {
    const builder = (p5Instance) => {
      dottr = new Sketch(p5Instance) // eslint-disable-line no-new
    }

    new P5(builder, 'sketch-holder') // eslint-disable-line no-new
  },
  methods: {
    canvas () {
      return document.getElementsByTagName('canvas')[0]
    },
    about () {
      this.$modal.show('about')
    },
    help () {
      this.$modal.show('help')
    }
  }
}
</script>

<style>
  #title {
  background: linear-gradient(90deg, #7fff00, #fb33db);
  line-height: 1.5em;
  font-weight: 600;
  width: 25vw;
  letter-spacing: 0.1em;
  margin-bottom: 1em;
  padding: 1rem;
  font-size: 1.65em;
}

.parent {
  max-width: 100vw;
  max-height: 75vh;
  /* width: 100% */
}

#defaultCanvas0 {
  position: relative;
  top: 40px; left: 40px;
  right: 40px;
  transform-origin: left top;
}

#app > button {
  display: inline-block;
  padding: 1rem 2rem;
  margin: 0 1rem 1rem 0;
  height: 3rem;
  background-color: #6C5CFF;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  border: 0;
  text-align: center;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

button:hover {
  background-color: #574bc1;
}

button:focus {
  outline: none;
}

button:active {
  transform: scale(0.99);
}

</style>
