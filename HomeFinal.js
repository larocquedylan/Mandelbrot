const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let pixelSize = 3;

let photo;

function preload() {
  photo = loadImage('./uber.jpeg', (img) => {
    img.resize(img.width / pixelSize, img.height / pixelSize);
  });
}

function setup() {
  photo.loadPixels();
  drawAscii();
}

function drawAscii() {
  let asciiOutput = '';

  for (let j = 0; j < photo.height; j++) {
    for (let i = 0; i < photo.width; i++) {
      let pixelIndex = (i + j * photo.width) * 4;
      const r = photo.pixels[pixelIndex + 0];
      const g = photo.pixels[pixelIndex + 1];
      const b = photo.pixels[pixelIndex + 2];

      const brightness = (r + g + b) / 3;
      const character = mapBrightnessToCharacter(brightness);

      let fillColor;
      if (brightness > 128) {
        fillColor = color(0, 0, 255 - (brightness - 128) * 2);
      } else {
        fillColor = color(255);
      }

      const fillRgb = `rgb(${fillColor.levels[0]}, ${fillColor.levels[1]}, ${fillColor.levels[2]})`;
      const wrappedCharacter = `<span style="color:${fillRgb}">${character}</span>`;
      asciiOutput += wrappedCharacter;
    }
    asciiOutput += '<br>';
  }

  document.getElementById('ascii-output').innerHTML = asciiOutput;
}

function mapBrightnessToCharacter(brightness) {
  const index = floor(map(brightness, 0, 169, density.length, 0));
  return density.charAt(index);
}
