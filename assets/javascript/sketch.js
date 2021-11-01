import saveAs from 'file-saver'
import { datestring, filenamer } from './filelib'
import debounce from 'debounce'

export default function ($p5) {
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
    },
    pixelizationSlider: null,
    insetSlider: null,
    resizeToPixels: null,
    margin: 0
  }

  const toggle = bool => !bool

  const toggleSquare = () => { params.square = toggle(params.square) }
  const toggleCircle = () => { params.circle = toggle(params.circle) }

  const pixelGrid = ({ pixelSize, img }) => { // eslint-disable-line no-unused-vars
    const width = Math.floor($p5.width / pixelSize)
    const height = Math.floor($p5.height / pixelSize)
    const pixels = new Array(width * height).fill({})
      .map((p, i) => ({
        x: Math.floor(i / width),
        y: i % width
      }))
    let index = 0
    const reset = () => {
      index = 0
    }

    // TBH, I can't see why we'd do this
    // instead of mapping over the entire array
    const hasNext = () => index < pixels.length
    const next = () => {
      index += 1
      return hasNext() ? pixels[index] : null
    }

    return {
      pixels,
      width,
      height,
      iter: next,
      reset
    }
  }

  const redraw = () => {
    params.dirty = false

    // "pixelSize" is really the number of pixels in width
    // min 2, max 100
    const pixelSize = Math.floor($p5.width / params.pixelizationSlider.value())

    // not right - we crop off a portion of the image
    // but we don't ignore those pixels
    // so, we have to stop reading those
    // heh.
    // const newWidth = Math.floor($p5.width / pixelSize) * pixelSize
    // const newHeight = Math.floor($p5.height / pixelSize) * pixelSize

    // $p5.resizeCanvas(newWidth, newHeight)

    // don't go by image width/height
    // GO BY THE PIXELS (square, circle, whatever)
    params.image.data.loadPixels()
    $p5.background('#000')
    const backtrack = Math.round(pixelSize / 2)
    const insetSize = pixelSize - (pixelSize * (params.insetSlider.value() / 100)) || pixelSize

    for (let x = 0; x < $p5.width + backtrack; x += pixelSize) {
      for (let y = 0; y < $p5.height + backtrack; y += pixelSize) {
        const i = (x + y * $p5.width) * 4
        const [r, g, b, a] = params.image.data.pixels.slice(i, i + 4)
        $p5.fill(r, g, b, a)
        if (params.square) {
          $p5.square(x, y, pixelSize)
        }
        if (params.circle) {
          // TODO: inset s/b relative to size of pixel, not absolute
          // const size = pixelSize - params.insetSlider.value()
          $p5.circle(x - backtrack, y - backtrack, insetSize)
        }
      }
    }
  }

  const redrawOriginal = () => { // eslint-disable-line no-unused-vars
    params.dirty = false

    const pixelSize = Math.floor($p5.width / params.pixelizationSlider.value())
    // $p5.resizeCanvas(params.image.data.width, params.image.data.height)

    // don't go by image width/height
    // GO BY THE PIXELS (square, circle, whatever)
    params.image.data.loadPixels()
    $p5.background('#000')
    const backtrack = Math.round(pixelSize / 2)
    for (let x = 0; x < $p5.width + backtrack; x += pixelSize) {
      for (let y = 0; y < $p5.height + backtrack; y += pixelSize) {
        const i = (x + y * $p5.width) * 4
        const [r, g, b, a] = params.image.data.pixels.slice(i, i + 4)
        $p5.fill(r, g, b, a)
        if (params.square) {
          $p5.square(x, y, pixelSize)
        }
        if (params.circle) {
          const size = pixelSize - params.insetSlider.value()
          $p5.circle(x - backtrack, y - backtrack, size)
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
    params.pixelizationSlider = $p5.createSlider(2, 100, 20, 1)
      .parent('simple-gui')
      .style('width', '200px')
      .input(debounce(redraw, 200))
    params.insetSlider = $p5.createSlider(0, 99, 0, 1)
      .parent('simple-gui')
      .style('width', '200px')
      .input(debounce(redraw, 200))
    params.resizeToPixels = $p5.createCheckbox('resize to pixels', false)
      .parent('simple-gui')
  }

  $p5.keyTyped = () => {
    if ($p5.key === '1') {
      toggleSquare()
      params.dirty = true
    } else if ($p5.key === '2') {
      toggleCircle()
      params.dirty = true
    } else if ($p5.key === 's') {
      savit()
    }
    return false
  }

  $p5.draw = () => {
    if (params.dirty) {
      redraw()
    }
  }
}
