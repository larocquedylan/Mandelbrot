const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let pixelSize = 3;

let photo;

function preload() {
  photo = loadImage('./uber.jpeg', (img) => {
    img.resize(img.width / pixelSize, img.height / pixelSize);
  });
}

function setup() {
  createCanvas(556, 755);
  const ctx = drawingContext;
  ctx.imageSmoothingEnabled = false;
  if (ctx instanceof CanvasRenderingContext2D) {
    ctx.canvas.willReadFrequently = true;
  }
}

function draw() {
  background(0, 0, 230);

  let w = width / photo.width;
  let h = height / photo.height;

  photo.loadPixels();

  for (let i = 0; i < photo.width; i++) {
    for (let j = 0; j < photo.height; j++) {
      let pixelIndex = (i + j * photo.width) * 4;
      const r = photo.pixels[pixelIndex + 0];
      const g = photo.pixels[pixelIndex + 1];
      const b = photo.pixels[pixelIndex + 2];

      const brightness = (r + g + b) / 3;
      const character = mapBrightnessToCharacter(brightness);

      noStroke();

      let fillColor;
      if (brightness > 128) {
        fillColor = color(0, 0, 255 - (brightness - 128) * 2);
      } else {
        fillColor = color(255);
      }
      fill(fillColor);

      textSize(7.41);
      text(character, i * w, j * h);
    }
  }
}

function mapBrightnessToCharacter(brightness) {
  const index = floor(map(brightness, 0, 169, density.length, 0));
  return density.charAt(index);
}
