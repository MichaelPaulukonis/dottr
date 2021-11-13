import saveAs from 'file-saver'
import { datestring, filenamer } from './filelib'
import debounce from 'debounce'
import Scribble from './p5.scribble'

export default function ($p5) {
  let namer = () => { }
  let scribble = null
  const grounds = {
    black: '#000',
    white: '#fff'
  }

  const modes = [
    'pixel',
    'average',
    'brightest'
  ]

  const initialStats = {
    pixels: 7,
    inset: 0,
    outset: 25,
    margin: 50
  }

  let params = {
    ground: grounds.black,
    square: false,
    circle: true,
    dirty: true,
    average: true,
    colorMode: 0,
    scribble: false,
    img: null,
    image: {
      data: null,
      name: ''
    },
    canvas: null,
    pixelizationSlider: null,
    insetSlider: null, // TODO: actual space between pixels
    outsetSlider: null,
    marginSlider: null,
    margin: 0
  }

  const toggle = bool => !bool

  const toggleSquare = () => { params.square = toggle(params.square) }
  const toggleCircle = () => { params.circle = toggle(params.circle) }

  const toggleGround = () => { params.ground = params.ground === grounds.white ? grounds.black : grounds.white }

  const setParams = ({ newParams = {}, sliders }) => {
    params = { ...params, ...newParams }
    params.pixelizationSlider.elt.value = sliders.pixels
    params.insetSlider.elt.value = sliders.inset
    params.marginSlider.elt.value = sliders.margin
  }

  // based on https://sighack.com/post/averaging-rgb-colors-the-right-way
  const getAverageRGBCircle = (img, x, y, radius) => {
    let r = 0
    let g = 0
    let b = 0
    let num = 0

    /* Iterate through a bounding box in which the circle lies */
    for (let x2 = x - radius; x2 < x + radius; x2++) {
      for (let y2 = y - radius; y2 < y + radius; y2++) {
        /* If the pixel is outside the canvas, skip it */
        if (x2 < 0 || x2 >= img.width || y2 < 0 || y2 >= img.height) { continue }

        /* If the pixel is outside the circle, skip it */
        if ($p5.dist(x, y, x2, y2) > radius) { continue }

        const ii = (x2 + (y2 * img.width)) * 4
        const [rc, gc, bc] = img.pixels.slice(ii, ii + 4) || [0, 0, 0, 0]
        // const c = $p5.color(rc, gc, bc, a)
        r += rc * rc
        g += gc * gc
        b += bc * bc
        num++
      }
    }
    /* Return the sqrt of the mean of squared R, G, and B sums */
    return $p5.color(Math.sqrt(r / num), Math.sqrt(g / num), Math.sqrt(b / num))
  }

  // based on https://sighack.com/post/averaging-rgb-colors-the-right-way
  const getBrightest = (img, x, y, radius) => {
    let bmax = 0
    let cmax = null

    /* Iterate through a bounding box in which the circle lies */
    for (let x2 = x - radius; x2 < x + radius; x2++) {
      for (let y2 = y - radius; y2 < y + radius; y2++) {
        /* If the pixel is outside the canvas, skip it */
        if (x2 < 0 || x2 >= img.width || y2 < 0 || y2 >= img.height) { continue }

        /* If the pixel is outside the circle, skip it */
        if ($p5.dist(x, y, x2, y2) > radius) { continue }

        const ii = (x2 + (y2 * img.width)) * 4
        const [rc, gc, bc, ac] = img.pixels.slice(ii, ii + 4) || [0, 0, 0, 0]
        const c = $p5.color(rc, gc, bc, ac)
        const b = $p5.brightness(c)
        if (b > bmax) {
          cmax = c
          bmax = b
        }
      }
    }
    return cmax
  }

  const getColor = ({ img, x, y, pixelSize }) => {
    const i = ((x * pixelSize) + ((y * pixelSize) * img.width)) * 4
    const [r, g, b, a] = img.pixels.slice(i, i + 4) || [0, 0, 0, 0]
    const color = $p5.color(r, g, b, a)
    return color
  }

  const pixelGrid = ({ pixelSize, img }) => {
    const width = Math.floor(img.width / pixelSize)
    const height = Math.floor(img.height / pixelSize)
    const pixels = new Array(width * height).fill({})
      .map((p, i) => ({
        x: Math.floor(i / height),
        y: i % height
      }))
    return {
      pixels,
      width,
      height
    }
  }

  const pixelSize = () => Math.floor(params.image.data.width / pixelCount())
  const pixelCount = () => params.pixelizationSlider.value()

  const redraw = () => {
    params.dirty = false

    const pxsz = pixelSize()
    const image = params.image.data
    const margin = params.marginSlider.value()
    const outset = params.outsetSlider.value()
    const addon = outset * pixelCount()
    const newWidth = Math.floor(image.width / pxsz) * pxsz + (2 * margin) + addon
    const newHeight = Math.floor(image.height / pxsz) * pxsz + (2 * margin) + addon
    $p5.resizeCanvas(newWidth, newHeight)

    params.image.data.loadPixels()
    $p5.background(params.ground)
    const insetSize = pxsz - (pxsz * (params.insetSlider.value() / 100)) || pxsz

    $p5.push()
    $p5.translate(margin, margin)

    const grid = pixelGrid({ pixelSize: pxsz, img: image, outset })
    grid.pixels.forEach(p => {
      let color = null
      switch (params.colorMode) {
        case 0:
          color = getColor({ img: params.image.data, x: p.x, y: p.y, pixelSize: pxsz })
          break

        case 1: {
          const radius = Math.floor(pxsz / 2)
          const x = (p.x * pxsz) + radius
          const y = (p.y * pxsz) + radius
          color = getBrightest(params.image.data, x, y, radius)
        }
          break

        case 2:
        default: {
          const radius = Math.floor(pxsz / 2)
          const x = (p.x * pxsz) + radius
          const y = (p.y * pxsz) + radius
          color = getAverageRGBCircle(params.image.data, x, y, radius)
        }
      }

      $p5.fill(color)
      // UGH THIS MATH
      // half of outset needs to be on either side
      // and there's so much crap in here I don't know what's going on
      if (params.square) {
        $p5.square((p.x * (pxsz + outset)) + (pxsz - insetSize) + outset / 2, (p.y * (pxsz + outset)) + (pxsz - insetSize + outset) / 2, insetSize)
      }
      if (params.circle) {
        if (params.scribble) {
          scribble.scribbleEllipse((p.x * pxsz) + pxsz / 2, (p.y * pxsz) + pxsz / 2, insetSize, insetSize)
        } else {
          $p5.circle((p.x * (pxsz + outset)) + pxsz / 2, (p.y * (pxsz + outset)) + pxsz / 2, insetSize)
        }
      }
    })
    $p5.pop()
  }

  const saver = (canvas, name) => {
    canvas.toBlob(blob => saveAs(blob, name))
  }

  const savit = () => {
    console.log('saving canvas: ')
    namer = filenamer(`dottr.${params.image.name}.${datestring()}`)
    saver($p5.drawingContext.canvas, namer() + '.png')
  }

  const imageReady = (pImage) => {
    params.image.data.loadPixels()
    params.image.size = {
      width: params.image.data.width,
      height: params.image.data.height
    }

    const parent = params.canvas.elt.parentElement.parentElement

    const scale = Math.min(
      (window.innerWidth * 0.8) / params.image.data.width,
      (parent.offsetHeight * 0.8) / params.image.data.height
    )

    $p5.resizeCanvas(params.image.data.width, params.image.data.height)
    params.canvas.elt.style.transform = `scale(${scale < 1 ? scale : 1})`

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
    params.canvas = canvas

    scribble = new Scribble($p5)

    $p5.pixelDensity(1)
    $p5.image(params.image.data, 0, 0, params.image.data.width, params.image.data.height)
    $p5.noStroke()
    params.pixelizationSlider = $p5.createSlider(2, 100, initialStats.pixels, 1)
      .parent('simple-gui')
      .style('width', '200px')
      .input(debounce(redraw, 200))
    params.insetSlider = $p5.createSlider(0, 99, initialStats.inset, 1)
      .parent('simple-gui')
      .style('width', '200px')
      .input(debounce(redraw, 200))
    params.outsetSlider = $p5.createSlider(0, 99, initialStats.outset, 1)
      .parent('simple-gui')
      .style('width', '200px')
      .input(debounce(redraw, 200))
    params.marginSlider = $p5.createSlider(0, 200, initialStats.margin, 1)
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
    } else if ($p5.key === 'b') {
      toggleGround()
      params.dirty = true
    } else if ($p5.key === 'd') {
      setParams({ sliders: initialStats })
      params.dirty = true
    } else if ($p5.key === 'f') {
      params.colorMode = (params.colorMode + 1) % modes.length
      params.dirty = true
    } else if ($p5.key === 'z') {
      params.scribble = !params.scribble
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
