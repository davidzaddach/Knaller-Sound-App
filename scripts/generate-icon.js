const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawExplosion(ctx, cx, cy, outerR, innerR, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function generateIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  const cx = size / 2;
  const cy = size / 2;

  // Dark background
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, size, size);

  // Outer glow
  const glowGrad = ctx.createRadialGradient(cx, cy, size * 0.2, cx, cy, size * 0.55);
  glowGrad.addColorStop(0, 'rgba(255, 45, 149, 0.5)');
  glowGrad.addColorStop(0.5, 'rgba(255, 45, 149, 0.2)');
  glowGrad.addColorStop(1, 'rgba(255, 45, 149, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, size, size);

  // Outer explosion spikes (orange/yellow)
  drawExplosion(ctx, cx, cy, size * 0.46, size * 0.28, 12);
  const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.46);
  outerGrad.addColorStop(0, '#ff6b2d');
  outerGrad.addColorStop(1, '#ff2d95');
  ctx.fillStyle = outerGrad;
  ctx.fill();

  // Inner explosion (bright yellow/orange)
  drawExplosion(ctx, cx, cy, size * 0.32, size * 0.2, 10);
  const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.32);
  innerGrad.addColorStop(0, '#ffe600');
  innerGrad.addColorStop(0.6, '#ff6b2d');
  innerGrad.addColorStop(1, '#ff2d95');
  ctx.fillStyle = innerGrad;
  ctx.fill();

  // Center bright core
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.12);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.4, '#ffe600');
  coreGrad.addColorStop(1, '#ff6b2d');
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = coreGrad;
  ctx.fill();

  // Sparkle dots
  const sparkles = [
    { x: 0.22, y: 0.18, r: 0.02 },
    { x: 0.78, y: 0.22, r: 0.018 },
    { x: 0.15, y: 0.72, r: 0.015 },
    { x: 0.82, y: 0.75, r: 0.02 },
    { x: 0.5, y: 0.1, r: 0.015 },
    { x: 0.88, y: 0.5, r: 0.012 },
  ];
  sparkles.forEach(s => {
    ctx.beginPath();
    ctx.arc(size * s.x, size * s.y, size * s.r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe600';
    ctx.fill();
  });

  const outDir = path.join(__dirname, '..', 'assets', 'images');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Created: ${filePath} (${size}x${size})`);
}

generateIcon(180, 'icon-180.png');
generateIcon(192, 'icon-192.png');
generateIcon(512, 'icon-512.png');
generateIcon(32, 'favicon-32.png');

console.log('All icons generated!');
