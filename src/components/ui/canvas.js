// Celestial Orb cursor — glowing orb that follows the mouse
// with blue/purple orbiting particles.

var ctx;
var animationFrameId;
var particles = [];
var mouse = { x: -999, y: -999 };

var center = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
};

// ── Particle ──────────────────────────────────────────────────────────────────

function Particle(x, y, radius, color, isOrbiter, orbitRadius, speed, angle) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.isOrbiter = isOrbiter;
  this.orbitRadius = orbitRadius;
  this.speed = speed;
  this.angle = angle;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.update = function () {
  if (this.isOrbiter) {
    this.angle += this.speed;
    this.x = center.x + Math.cos(this.angle) * this.orbitRadius;
    this.y = center.y + Math.sin(this.angle) * this.orbitRadius;
  } else {
    this.x = center.x;
    this.y = center.y;
  }
  this.draw();
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildParticles() {
  particles = [];

  // Central glowing orb — drawn separately with a radial gradient (no shadowBlur)
  particles.push(new Particle(center.x, center.y, 7, null, false, 0, 0, 0));

  // Orbiting particles
  for (var i = 0; i < 55; i++) {
    var hue = Math.round(Math.random() * 60 + 200); // 200-260 → blue/violet
    var color = 'hsla(' + hue + ',80%,65%,0.85)';
    particles.push(new Particle(
      0, 0,
      Math.random() * 2.8 + 0.8,
      color,
      true,
      Math.random() * 120 + 60,   // orbitRadius 60-180 px
      (Math.random() * 0.025 + 0.008) * (Math.random() < 0.5 ? 1 : -1), // ± speed
      Math.random() * Math.PI * 2
    ));
  }
}

function resizeCanvas() {
  if (!ctx) return;
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  center.x = window.innerWidth  / 2;
  center.y = window.innerHeight / 2;
}

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function render() {
  if (!ctx || !ctx.running) return;
  animationFrameId = window.requestAnimationFrame(render);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Smooth-follow mouse
  center.targetX = mouse.x;
  center.targetY = mouse.y;
  center.x += (center.targetX - center.x) * 0.08;
  center.y += (center.targetY - center.y) * 0.08;

  // Draw orbiting particles first (plain filled circles — no shadow)
  for (var i = 1; i < particles.length; i++) {
    particles[i].update();
  }

  // Draw central orb last (radial gradient, on top)
  var grd = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 28);
  grd.addColorStop(0,   'rgba(255,255,255,0.95)');
  grd.addColorStop(0.3, 'rgba(200,220,255,0.55)');
  grd.addColorStop(1,   'rgba(150,180,255,0)');
  ctx.beginPath();
  ctx.arc(center.x, center.y, 28, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
}

// ── Public API ────────────────────────────────────────────────────────────────

export function renderCanvas() {
  var el = document.getElementById('canvas');
  if (!el) return;

  ctx         = el.getContext('2d');
  ctx.running = true;

  center.x       = window.innerWidth  / 2;
  center.y       = window.innerHeight / 2;
  center.targetX = center.x;
  center.targetY = center.y;
  mouse.x        = center.x;
  mouse.y        = center.y;

  resizeCanvas();
  buildParticles();

  document.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('focus', function () {
    if (!ctx.running) { ctx.running = true; render(); }
  });

  render();
}

export function destroyCanvas() {
  if (ctx) ctx.running = false;
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  document.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', resizeCanvas);
}
