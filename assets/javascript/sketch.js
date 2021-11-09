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

  const initialStats = {
    pixels: 7,
    inset: 25,
    margin: 50
  }

  let params = {
    ground: grounds.black,
    square: false,
    circle: true,
    dirty: true,
    fast: true,
    scribble: false,
    img: null,
    image: {
      data: null,
      name: ''
    },
    canvas: null,
    pixelizationSlider: null,
    insetSlider: null,
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
    // assumes x,y is the center of circle
    // .... is it?
    for (let x2 = x - radius; x2 < x + radius; x2++) {
      for (let y2 = y - radius; y2 < y + radius; y2++) {
        /* If the pixel is outside the canvas, skip it */
        if (x2 < 0 || x2 >= img.width || y2 < 0 || y2 >= img.height) { continue }

        /* If the pixel is outside the circle, skip it */
        if ($p5.dist(x, y, x2, y2) > r) { continue }

        const ii = (x2 + (y2 * img.width)) * 4
        const [rc, gc, bc] = img.pixels.slice(ii, ii + 4) || [0, 0, 0, 0]
        // const c = $p5.color(rc, gc, bc, a)

        r += rc * rc
        g += gc * gc
        b += bc * bc

        /* Get the color from the image, add to a running sum */
        // const c = img.get(x2, y2)
        // // const rc2 = $p5.red(c)
        // // const gc2 = $p5.green(c)
        // // const bc2 = $p5.blue(c)

        // // if (rc !== rc2 || gc !== gc2 || bc !== bc2) {
        // //   // console.log(`${rc}:${gc}:${bc} - ${rc2}:${gc2}:${bc2}`)
        // //   difCount++
        // // }

        // // r += rc2 * rc2
        // // g += gc2 * gc2
        // // b += bc2 * bc2

        // r += $p5.red(c) * $p5.red(c)
        // g += $p5.green(c) * $p5.green(c)
        // b += $p5.blue(c) * $p5.blue(c)
        num++
      }
    }
    /* Return the sqrt of the mean of squared R, G, and B sums */
    return $p5.color(Math.sqrt(r / num), Math.sqrt(g / num), Math.sqrt(b / num))
  }

  // based on https://sighack.com/post/averaging-rgb-colors-the-right-way
  const getAverageRGBCircleWorks = (img, x, y, radius) => {
    let r = 0
    let g = 0
    let b = 0
    let num = 0

    /* Iterate through a bounding box in which the circle lies */
    // assumes x,y is the center of circle
    // .... is it?
    for (let i = x - radius; i < x + radius; i++) {
      for (let j = y - radius; j < y + radius; j++) {
        /* If the pixel is outside the canvas, skip it */
        if (i < 0 || i >= img.width || j < 0 || j >= img.height) { continue }

        /* If the pixel is outside the circle, skip it */
        if ($p5.dist(x, y, i, j) > r) { continue }

        /* Get the color from the image, add to a running sum */
        const c = img.get(i, j)
        r += $p5.red(c) * $p5.red(c)
        g += $p5.green(c) * $p5.green(c)
        b += $p5.blue(c) * $p5.blue(c)
        num++
      }
    }
    /* Return the sqrt of the mean of squared R, G, and B sums */
    return $p5.color(Math.sqrt(r / num), Math.sqrt(g / num), Math.sqrt(b / num))
  }

  const getColor = ({ img, x, y, pixelSize }) => {
    // const img = params.image.data // external, doh

    const i = ((x * pixelSize) + ((y * pixelSize) * img.width)) * 4
    const [r, g, b, a] = img.pixels.slice(i, i + 4) || [0, 0, 0, 0]
    const color = $p5.color(r, g, b, a)
    return color
  }

  const pixelGrid = ({ pixelSize, img }) => {
    const width = Math.floor(img.width / pixelSize)
    const height = Math.floor(img.height / pixelSize)
    const pixels = new Array((width) * (height)).fill({})
      .map((p, i) => ({
        x: Math.floor(i / (height)),
        y: i % (height)
      }))
    return {
      pixels,
      width,
      height
    }
  }

  const pixelSize = () => Math.floor(params.image.data.width / params.pixelizationSlider.value())

  const redraw = () => {
    params.dirty = false

    const pxsz = pixelSize()
    const image = params.image.data
    const margin = params.marginSlider.value()
    const newWidth = Math.floor(image.width / pxsz) * pxsz + (2 * margin)
    const newHeight = Math.floor(image.height / pxsz) * pxsz + (2 * margin)
    $p5.resizeCanvas(newWidth, newHeight)

    params.image.data.loadPixels()
    $p5.background(params.ground)
    const insetSize = pxsz - (pxsz * (params.insetSlider.value() / 100)) || pxsz

    $p5.push()
    $p5.translate(margin, margin)

    const grid = pixelGrid({ pixelSize: pxsz, img: image })
    grid.pixels.forEach(p => {
      // const color = params.fast
      //   ? getColor({ img: params.image.data, x: p.x, y: p.y, pixelSize: pxsz })
      //   : getAverageRGBCircle(params.image.data, p.x, p.y, pxsz)
      let color = null
      if (params.fast) {
        color = getColor({ img: params.image.data, x: p.x, y: p.y, pixelSize: pxsz })
      } else {
        const x = (p.x * pxsz) + (pxsz / 2)
        const y = (p.y * pxsz) + (pxsz / 2)
        color = getAverageRGBCircle(params.image.data, x, y, pxsz)
      }
      $p5.fill(color)
      if (params.square) {
        $p5.square((p.x * pxsz) + (pxsz - insetSize) / 2, (p.y * pxsz) + (pxsz - insetSize) / 2, insetSize)
      }
      if (params.circle) {
        if (params.scribble) {
          scribble.scribbleEllipse((p.x * pxsz) + pxsz / 2, (p.y * pxsz) + pxsz / 2, insetSize, insetSize)
        } else {
          $p5.circle((p.x * pxsz) + pxsz / 2, (p.y * pxsz) + pxsz / 2, insetSize)
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

    // hah-hah, the numbers are inconsistent
    // and not right oh well
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
      params.fast = !params.fast
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
