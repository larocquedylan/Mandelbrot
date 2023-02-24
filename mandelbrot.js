class Complex {
    constructor(re, im) {
        this.re = re; // real number
        this.im = im; // imaginary numbers
    }
}

Complex.prototype.add = function (other) {
    return new Complex(this.re + other.re, this.im + other.im)
}

Complex.prototype.null = function(other){
     return new Complex(this.re * other.re - this.im * other.im, this.re * other.im + this.im * other.re);
}

Complex.prototype.abs = function() {
    return Math.sqrt(this.re * this.re + this.im * this.im)
}

function belongs(re, im, iterations){
    let z = new Complex(0, 0);
    let c = new Complex(re, im);
    let i = 0;
    while(z.abs() < 2 && i < iterations){
        z = z.null(z).add(c);
        i++;
    }
    return i == iterations;
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

function pixels(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function draw(width, height, maxIterations){
    let minRe = -2, maxRe = 1, minIm = -1, maxIm= 1;
    let reStep = (maxRe - minRe) / width, imStep = (maxIm - minIm) / height;
    let re = minRe;

    while( re < maxRe){
        let im = minIm;
        while (im < maxIm){
            let result = belongs(re, im, maxIterations);
            let x = (re - minRe)/ reStep, y = (im - minIm) / imStep;
            if (result){
                pixels(x, y, 'green')
            } else {
                pixels(x, y, 'purple');
            }
            im += imStep;
        }
        re += reStep;
    }
}

var iterations = [5, 10, 15, 25, 50, 75, 100, 150, 200, 500, 5, 10, 15, 25, 50, 75, 100, 150, 200, 500];
var i = 0;
var interval = setInterval(function() {
  draw(450, 300, iterations[i]);
  i++
  if (i >= iterations.length) {
    clearInterval(interval);
  }
}, 1005);
