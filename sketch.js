let dollImg;
let mic;
let x, y;
let imgScale;

function preload() {
  // Load your PNG from the assets folder
  dollImg = loadImage("assets/Doll.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // Lock gestures and enable motion access (from p5-phone)
  lockGestures();
  enableGyroTap("Tap to enable motion access");

  // Microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Center position
  x = width / 2;
  y = height / 2;

  // Scale image to fit screen (keep aspect ratio)
  let scaleX = width / dollImg.width;
  let scaleY = height / dollImg.height;
  imgScale = min(scaleX, scaleY) * 0.8; // 80% of screen
}

function draw() {
  background(30);

  // Tilt phone left/right → move doll horizontally
  if (rotationY !== undefined) {
    // rotationY is negative when tilted left, positive when tilted right
    x += rotationY * 0.5; // adjust multiplier for sensitivity
  }

  // Boundaries: keep doll inside screen edges
  let halfW = (dollImg.width * imgScale) / 2;
  if (x < halfW) x = halfW;
  if (x > width - halfW) x = width - halfW;

  // Get microphone volume
  let vol = mic.getLevel();
  let eyeColor = color(map(vol, 0, 0.3, 50, 255), 50, 200);

  // Draw doll image scaled to fit screen
  image(dollImg, x, y, dollImg.width * imgScale, dollImg.height * imgScale);

  // Eye positions scale with image size
  let eyeOffsetX = 0.10 * dollImg.width * imgScale; 
  let eyeSize    = 0.12 * dollImg.width * imgScale;

  noStroke();
  fill(eyeColor);
  ellipse(x - eyeOffsetX, y + 30, eyeSize, eyeSize); // left eye lower
  ellipse(x + eyeOffsetX, y + 30, eyeSize, eyeSize); // right eye lower
}

// Resize canvas and rescale image if screen size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;

  let scaleX = width / dollImg.width;
  let scaleY = height / dollImg.height;
  imgScale = min(scaleX, scaleY) * 0.8;
}
