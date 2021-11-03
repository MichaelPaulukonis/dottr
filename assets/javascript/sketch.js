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
    image: {
      data: null,
      name: ''
    },
    pixelizationSlider: null,
    insetSlider: null,
    marginSlider: null,
    margin: 0
  }

  const toggle = bool => !bool

  const toggleSquare = () => { params.square = toggle(params.square) }
  const toggleCircle = () => { params.circle = toggle(params.circle) }

  const getColor = ({ x, y, pixelSize }) => {
    const img = params.image.data // external, doh

    const i = ((x * pixelSize) + ((y * pixelSize) * img.width)) * 4
    const [r, g, b, a] = img.pixels.slice(i, i + 4) || [0, 0, 0, 0]
    const color = $p5.color(r, g, b, a)
    return color
  }

  const pixelGrid = ({ pixelSize, img }) => {
    const width = Math.floor(img.width / pixelSize)
    const height = Math.floor(img.height / pixelSize)
    const pixels = new Array((width + 1) * (height + 1)).fill({})
      .map((p, i) => ({
        x: Math.floor(i / (height + 1)),
        y: i % (height + 1)
      }))
    return {
      pixels,
      width,
      height
    }
  }

  const pixelSize = () => Math.floor($p5.width / params.pixelizationSlider.value())

  const redraw = () => {
    params.dirty = false

    // "pixelSize" is really the number of pixels in width
    // min 2, max 100
    const pxsz = pixelSize()
    const image = params.image.data
    const newWidth = Math.floor(image.width / pxsz) * pxsz
    const newHeight = Math.floor(image.height / pxsz) * pxsz
    $p5.resizeCanvas(newWidth, newHeight)

    // don't go by image width/height
    // GO BY THE PIXELS (square, circle, whatever)
    params.image.data.loadPixels()
    $p5.background('#000')
    const backtrack = Math.round(pxsz / 2)
    const insetSize = pxsz - (pxsz * (params.insetSlider.value() / 100)) || pxsz

    // const width = Math.floor(image.width / pxsz)
    // const height = Math.floor(image.height / pxsz)

    const grid = pixelGrid({ pixelSize: pxsz, img: image })
    // const i = 0
    grid.pixels.forEach(p => {
      const color = getColor({ x: p.x, y: p.y, pixelSize: pxsz })
      $p5.fill(color)
      if (params.square) {
        $p5.square(p.x * pxsz, p.y * pxsz, pxsz)
      }
      if (params.circle) {
        $p5.circle(p.x * pxsz - backtrack, p.y * pxsz - backtrack, insetSize)
      }
    })

    // looks like we can do the grid thing, now...
    // for (let x = 0; x <= width; x += 1) {
    //   for (let y = 0; y <= height; y += 1) {
    //     if (x !== grid.pixels[i]?.x || y !== grid.pixels[i]?.y) {
    //       console.log(`x: ${x} - ${grid.pixels[i]?.x} .y: ${y} - ${grid.pixels[i]?.y}`)
    //     }
    //     i++
    //     const color = getColor({ x, y, pixelSize: pxsz })
    //     $p5.fill(color)
    //     if (params.square) {
    //       $p5.square(x * pxsz, y * pxsz, pxsz)
    //     }
    //     if (params.circle) {
    //       $p5.circle(x * pxsz - backtrack, y * pxsz - backtrack, insetSize)
    //     }
    //   }
    // }
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

  const imageReady = (args) => {
    console.log(args)
    $p5.resizeCanvas(params.image.data.width, params.image.data.height)
    params.image.data.loadPixels()
    params.image.size = {
      width: params.image.data.width,
      height: params.image.data.height
    }
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
    params.marginSlider = $p5.createSlider(0, 100, 0, 1)
      .parent('simple-gui')
      .style('width', '200px')
      .input(debounce(redraw, 200))
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
