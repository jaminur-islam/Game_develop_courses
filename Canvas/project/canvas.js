const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const mouse = {
  x: undefined,
  y: undefined,
};

const colorArray = [
  "#C1FF33",
  "#0F4FEC",
  "#EC340F",
  "#49F50D",
  "#30F50D",
  "#0DEEF5",
];

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", (evt) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
});

let maxRadius = 40;
let minRadius = 2;

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

let circleArray = [];

const init = () => {
  circleArray = [];
  for (let i = 0; i < 2000; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
init();

//============================================ Test ============================================//

/* c.fillStyle = "red";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "green";
c.fillRect(400, 100, 100, 100);
c.fillStyle = "yellow";
c.fillRect(300, 300, 100, 100);
 */
// line
/* c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa35a3";
c.stroke(); */

// arc / Circle

/* for (let i = 1; i < 4000; i++) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  c.beginPath();
  c.arc(x, y, 50, 0, Math.PI * 2, false);
  c.strokeStyle = "blue";
  c.stroke();
}
 */
/* c.beginPath();
c.arc(300, 300, 50, 0, Math.PI * 2, false);
c.strokeStyle = "blue";
c.stroke();
let x = Math.random() * window.innerWidth;
let y = Math.random() * window.innerHeight; */
