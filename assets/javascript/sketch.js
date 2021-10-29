import saveAs from 'file-saver'
import { datestring, filenamer } from './filelib'

export default function ($p5) {
  let img
  const pixelationLevel = 20
  let namer = () => { }
  let imageName = ''
  const params = {
    square: true,
    circle: true,
    dirty: true
  }

  const toggle = bool => !bool

  const toggleSquare = () => { params.square = toggle(params.square) }
  const toggleCircle = () => { params.circle = toggle(params.circle) }

  const redraw = () => {
    img.loadPixels()
    $p5.background(0)
    const backtrack = Math.round(pixelationLevel / 2)
    for (let x = 0; x < $p5.width + backtrack; x += pixelationLevel) {
      for (let y = 0; y < $p5.height + backtrack; y += pixelationLevel) {
        const i = (x + y * $p5.width) * 4
        const r = img.pixels[i + 0]
        const g = img.pixels[i + 1]
        const b = img.pixels[i + 2]
        const a = img.pixels[i + 3]
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
    namer = filenamer(`dottr.${imageName}.${datestring()}`)
    saver($p5.drawingContext.canvas, namer() + '.png')
  }

  $p5.preload = function () {
    img = $p5.loadImage(require('@/assets/images/ciltone.jpeg'))
    imageName = 'ciltone'
  }

  $p5.setup = function () {
    const canvas = $p5.createCanvas(img.width, img.height)
    canvas.parent('#sketch-holder')
    $p5.pixelDensity(1)
    $p5.image(img, 0, 0, img.width, img.height)
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
