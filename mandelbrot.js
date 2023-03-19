// class Complex {
//     constructor(re, im) {
//         this.re = re; // real number
//         this.im = im; // imaginary numbers
//     }
// }

// Complex.prototype.add = function (other) {
//     return new Complex(this.re + other.re, this.im + other.im)
// }

// Complex.prototype.null = function(other){
//      return new Complex(this.re * other.re - this.im * other.im, this.re * other.im + this.im * other.re);
// }

// Complex.prototype.abs = function() {
//     return Math.sqrt(this.re * this.re + this.im * this.im)
// }

// function belongs(re, im, iterations){
//     let z = new Complex(0, 0);
//     let c = new Complex(re, im);
//     let i = 0;
//     while(z.abs() < 2 && i < iterations){
//         z = z.null(z).add(c);
//         i++;
//     }
//     return i == iterations;
// }

// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext("2d");

// function pixels(x, y, color){
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, 1, 1);
// }

// function draw(width, height, maxIterations){
//     let minRe = -2, maxRe = 1, minIm = -1, maxIm= 1;
//     let reStep = (maxRe - minRe) / width, imStep = (maxIm - minIm) / height;
//     let re = minRe;

//     while( re < maxRe){
//         let im = minIm;
//         while (im < maxIm){
//             let result = belongs(re, im, maxIterations);
//             let x = (re - minRe)/ reStep, y = (im - minIm) / imStep;
//             if (result){
//                 pixels(x, y, 'green')
//             } else {
//                 pixels(x, y, 'purple');
//             }
//             im += imStep;
//         }
//         re += reStep;
//     }
// }

// var iterations = [5, 10, 15, 25, 50, 75, 100, 150, 200, 500, 5, 10, 15, 25, 50, 75, 100, 150, 200, 500];
// var i = 0;
// var interval = setInterval(function() {
//   draw(450, 300, iterations[i]);
//   i++
//   if (i >= iterations.length) {
//     clearInterval(interval);
//   }
// }, 1005);

let canvasWidth = 800;
let canvasHeight = 800;
let minX = -2;
let maxX = 2;
let minY = -2;
let maxY = 2;
let maxIter = 100;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(1);
}

function draw() {
  loadPixels();

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      let zx = map(x, 0, canvasWidth, minX, maxX);
      let zy = map(y, 0, canvasHeight, minY, maxY);

      let cX = zx;
      let cY = zy;
      let n = 0;

      while (n < maxIter) {
        let x2 = zx * zx - zy * zy;
        let y2 = 2 * zx * zy;
        zx = x2 + cX;
        zy = y2 + cY;

        if (abs(zx + zy) > 16) {
          break;
        }
        n++;
      }

      let brightness = map(n, 0, maxIter, 0, 255);
      if (n === maxIter) {
        brightness = 0;
      }

      let pixelIndex = (x + y * canvasWidth) * 4;
      pixels[pixelIndex + 0] = brightness;
      pixels[pixelIndex + 1] = brightness;
      pixels[pixelIndex + 2] = brightness;
      pixels[pixelIndex + 3] = 255;
    }
  }

  updatePixels();
  noLoop();
}

function mousePressed() {
  let x = mouseX;
  let y = mouseY;

  if (x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight) {
    let centerX = map(x, 0, canvasWidth, minX, maxX);
    let centerY = map(y, 0, canvasHeight, minY, maxY);

    let rangeX = maxX - minX;
    let rangeY = maxY - minY;

    minX = centerX - rangeX * 0.25;
    maxX = centerX + rangeX * 0.25;
    minY = centerY - rangeY * 0.25;
    maxY = centerY + rangeY * 0.25;

    loop();
  }
}
