import saveAs from 'file-saver'
import { datestring, filenamer } from './filelib'

export default function ($p5) {
  const pixelationLevel = 20
  let namer = () => { }
  const params = {
    square: true,
    circle: true,
    dirty: true,
    img: null,
    imageName: '',
    image: {
      data: null,
      name: ''
    }
  }

  const toggle = bool => !bool

  const toggleSquare = () => { params.square = toggle(params.square) }
  const toggleCircle = () => { params.circle = toggle(params.circle) }

  const redraw = () => {
    params.image.data.loadPixels()
    $p5.background(0)
    const backtrack = Math.round(pixelationLevel / 2)
    for (let x = 0; x < $p5.width + backtrack; x += pixelationLevel) {
      for (let y = 0; y < $p5.height + backtrack; y += pixelationLevel) {
        const i = (x + y * $p5.width) * 4
        const r = params.image.data.pixels[i + 0]
        const g = params.image.data.pixels[i + 1]
        const b = params.image.data.pixels[i + 2]
        const a = params.image.data.pixels[i + 3]
        $p5.fill(r, g, b, a)
        if (params.square) {
          $p5.square(x, y, pixelationLevel)
        }
        if (params.circle) {
          $p5.circle(x - backtrack, y - backtrack, pixelationLevel)
        }
      }
    }
  }

  const saver = (canvas, name) => {
    canvas.toBlob(blob => saveAs(blob, name))
  }

  const savit = () => {
    console.log('saving canvas: ')
    namer = filenamer(`dottr.${params.image.name}.${datestring()}`)
    saver($p5.drawingContext.canvas, namer() + '.png')
  }

  const imageReady = () => {
    $p5.resizeCanvas(params.image.data.width, params.image.data.height)
    params.image.data.loadPixels()
    params.imageLoaded = true
    redraw()
  }

  const gotFile = (file) => {
    if (file && file.type === 'image') {
      params.imageLoaded = false
      params.image.data = $p5.loadImage(file.data, imageReady)
      params.image.name = file.name
    } else {
      console.log('Not an image file!')
    }
  }

  $p5.preload = function () {
    params.image.data = $p5.loadImage(require('@/assets/images/ciltone.jpeg'))
    params.image.name = 'ciltone'
  }

  $p5.setup = function () {
    const canvas = $p5.createCanvas(params.image.data.width, params.image.data.height)
    canvas.parent('#sketch-holder')
    canvas.drop(gotFile)
    $p5.pixelDensity(1)
    $p5.image(params.image.data, 0, 0, params.image.data.width, params.image.data.height)
    $p5.noStroke()
  }

  $p5.keyTyped = () => {
    if ($p5.key === 's') {
      toggleSquare()
      params.dirty = true
    } else if ($p5.key === 'c') {
      toggleCircle()
      params.dirty = true
    } else if ($p5.key === 'd') {
      savit()
    }
    return false
  }

  $p5.draw = () => {
    if (params.dirty) {
      params.dirty = false
      redraw()
    }
  }
}
