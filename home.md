const density = 'Ñ@#W$9876543210?!abc;:+=-,.\_ ';

let photo;

function preload() {
photo = loadImage('./uber.jpeg');
}

function setup() {
createCanvas(556, 755);
}

function draw() {
background(220);
image(photo, 0, 0, width, height);

// what are the size of the squares?
let w = width / photo.width;
let h = height / photo.height;

// load pixels
photo.loadPixels();

// how to access each individual pixel of the canvas
// [R,G,B,A, _, _, _, _, _ .... npixel*4] i.e. 1 pixel takes 4 spots of the array our picture is 556*4 = 2224 W, 755*4 = 3020

// the sequence of pixels counts from (x,y)=(0,0) and works to the right. If our screen is 1280 px wide, then the pixel number of (0,1) would be 1281
// so if the (x,y) cordinates on the screen/canvas is (2,6) the number pixel would be {x + y _ width} = {2+6 _ 1280} = 10240
// so the way to find the number value for a given pixel are is by multiplying that whole thing by 4, cos remember r,g,b,a.

// to test this, we could load the pixels
//loadPixels();
// pixels [0] = 255
// pixels [1] = 255
// pixels [2] = 255
// pixels [3] = 255
// updatePixels();
// This would render the first pixels on the canvas as white
// You can use this to chnage every pixel!

// how to do it more efficiently? use a for loop that goes through every x, and then make another nested for loop that goes through every y for every x
for (let i = 0; i < photo.width; i++) {
for (let j = 0; j < photo.width; j++) {
let pixelIndex = (i + j _ photo.width) _ 4;
const r = photo.pixels[pixelIndex + 0];
const g = photo.pixels[pixelIndex + 1];
const b = photo.pixels[pixelIndex + 2];

      noStroke();
      fill(r, g, b);
      square(i * w, j * h, w);
    }

}
updatePixels();
}

---

learnings
manipulating the color gradient took awhile for to figure out.
