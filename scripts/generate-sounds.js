const fs = require('fs');
const path = require('path');

const soundsDir = path.join(__dirname, '..', 'assets', 'sounds');
const SAMPLE_RATE = 44100;

function createBuffer(duration) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  return { samples: new Float64Array(numSamples), numSamples, duration };
}

function writeWav(filePath, buf) {
  const numSamples = buf.numSamples;
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  let o = 0;
  buffer.write('RIFF', o); o += 4;
  buffer.writeUInt32LE(36 + dataSize, o); o += 4;
  buffer.write('WAVE', o); o += 4;
  buffer.write('fmt ', o); o += 4;
  buffer.writeUInt32LE(16, o); o += 4;
  buffer.writeUInt16LE(1, o); o += 2;
  buffer.writeUInt16LE(1, o); o += 2;
  buffer.writeUInt32LE(SAMPLE_RATE, o); o += 4;
  buffer.writeUInt32LE(SAMPLE_RATE * 2, o); o += 4;
  buffer.writeUInt16LE(2, o); o += 2;
  buffer.writeUInt16LE(16, o); o += 2;
  buffer.write('data', o); o += 4;
  buffer.writeUInt32LE(dataSize, o); o += 4;

  let peak = 0;
  for (let i = 0; i < numSamples; i++) peak = Math.max(peak, Math.abs(buf.samples[i]));
  const norm = peak > 0 ? 0.9 / peak : 1;

  for (let i = 0; i < numSamples; i++) {
    const val = Math.max(-32768, Math.min(32767, Math.floor(buf.samples[i] * norm * 32767)));
    buffer.writeInt16LE(val, o);
    o += 2;
  }
  fs.writeFileSync(filePath, buffer);
}

function noise() { return Math.random() * 2 - 1; }

function generateAirhorn() {
  const buf = createBuffer(1.2);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 20, 1) * Math.exp(-t * 0.8);
    const freq = 800 + Math.sin(t * 6) * 30;
    const s = Math.sin(2 * Math.PI * freq * t) * 0.6
            + Math.sin(2 * Math.PI * freq * 2 * t) * 0.25
            + Math.sin(2 * Math.PI * freq * 3 * t) * 0.15;
    buf.samples[i] = s * env;
  }
  return buf;
}

function generateSiren() {
  const buf = createBuffer(1.5);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 10, 1) * (t < 1.3 ? 1 : Math.exp(-(t - 1.3) * 8));
    const freq = 600 + Math.sin(t * 4 * Math.PI) * 400;
    const s = Math.sin(2 * Math.PI * freq * t) * 0.5
            + Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.3
            + Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.2;
    buf.samples[i] = s * env;
  }
  return buf;
}

function generateAlarm() {
  const buf = createBuffer(1.0);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 15, 1) * (t < 0.8 ? 1 : Math.exp(-(t - 0.8) * 10));
    const beep = Math.floor(t * 8) % 2 === 0;
    const freq = beep ? 1200 : 900;
    const s = Math.sin(2 * Math.PI * freq * t) * 0.6
            + Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
    buf.samples[i] = s * env * (beep ? 1 : 0.7);
  }
  return buf;
}

function generateGunShot() {
  const buf = createBuffer(0.5);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const crack = noise() * Math.exp(-t * 80) * 0.8;
    const boom = Math.sin(2 * Math.PI * 60 * t) * Math.exp(-t * 15) * 0.7;
    const body = Math.sin(2 * Math.PI * 120 * t) * Math.exp(-t * 25) * 0.4;
    const tail = noise() * Math.exp(-t * 8) * 0.15;
    buf.samples[i] = crack + boom + body + tail;
  }
  return buf;
}

function generateDjRewind() {
  const buf = createBuffer(1.0);
  let phase = 0;
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 10, 1) * (t < 0.8 ? 1 : Math.exp(-(t - 0.8) * 8));
    const freq = 2000 * Math.exp(-t * 3) + 200;
    phase += freq / SAMPLE_RATE;
    const s = (((phase % 1) * 2 - 1) * 0.4)
            + Math.sin(2 * Math.PI * phase) * 0.4
            + noise() * 0.05;
    buf.samples[i] = s * env;
  }
  return buf;
}

function generatePullUp() {
  const buf = createBuffer(0.8);
  let phase = 0;
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 15, 1) * Math.exp(-t * 2);
    const freq = 150 + t * 800;
    phase += freq / SAMPLE_RATE;
    const scratch = ((phase % 1) * 2 - 1);
    const s = scratch * 0.5 + Math.sin(2 * Math.PI * phase * 2) * 0.3 + noise() * 0.08;
    buf.samples[i] = s * env;
  }
  return buf;
}

function generateBassDrop() {
  const buf = createBuffer(1.5);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 200 * Math.exp(-t * 2) + 30;
    const env = Math.min(t * 30, 1) * Math.exp(-t * 1.2);
    const sub = Math.sin(2 * Math.PI * freq * t) * 0.6;
    const harm = Math.sin(2 * Math.PI * freq * 2 * t) * 0.2 * Math.exp(-t * 3);
    const impact = noise() * Math.exp(-t * 30) * 0.5;
    buf.samples[i] = (sub + harm + impact) * env;
  }
  return buf;
}

function generateReggaeHorn() {
  const buf = createBuffer(0.8);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 20, 1) * (t < 0.6 ? 1 : Math.exp(-(t - 0.6) * 10));
    const vibrato = Math.sin(t * 30) * 8;
    const freq = 466 + vibrato;
    const s = Math.sin(2 * Math.PI * freq * t) * 0.4
            + Math.sin(2 * Math.PI * freq * 2 * t) * 0.25
            + Math.sin(2 * Math.PI * freq * 3 * t) * 0.15
            + Math.sin(2 * Math.PI * freq * 4 * t) * 0.08
            + noise() * 0.03;
    buf.samples[i] = s * env;
  }
  return buf;
}

function generateDancehall() {
  const buf = createBuffer(1.2);
  const bpm = 180;
  const beatLen = 60 / bpm;
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const beatPos = (t % beatLen) / beatLen;
    const kick = Math.sin(2 * Math.PI * 80 * t) * Math.exp(-beatPos * 15) * 0.5;
    const hihat = noise() * Math.exp(-(beatPos - 0.5) * 30) * (beatPos > 0.45 ? 0.25 : 0);
    const snare = noise() * Math.exp(-(beatPos - 0.5) * 20) * (Math.floor(t / beatLen) % 2 === 1 ? 0.3 : 0);
    const skank = Math.sin(2 * Math.PI * 400 * t) * (beatPos > 0.3 && beatPos < 0.45 ? 0.2 : 0);
    const env = Math.min(t * 10, 1) * (t < 1.0 ? 1 : Math.exp(-(t - 1.0) * 8));
    buf.samples[i] = (kick + hihat + snare + skank) * env;
  }
  return buf;
}

function generateCrowd() {
  const buf = createBuffer(1.5);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 3, 1) * (t < 1.2 ? 1 : Math.exp(-(t - 1.2) * 5));
    const wave = Math.sin(t * 3) * 0.3 + 0.7;
    let s = 0;
    for (let h = 0; h < 8; h++) {
      s += noise() * 0.12;
    }
    s += Math.sin(2 * Math.PI * 300 * t + noise() * 2) * 0.1;
    s += Math.sin(2 * Math.PI * 500 * t + noise() * 3) * 0.08;
    buf.samples[i] = s * env * wave;
  }
  return buf;
}

function generateExplosion() {
  const buf = createBuffer(1.2);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const impact = noise() * Math.exp(-t * 20) * 0.9;
    const rumble = Math.sin(2 * Math.PI * 35 * t) * Math.exp(-t * 2) * 0.7;
    const mid = Math.sin(2 * Math.PI * 80 * t) * Math.exp(-t * 5) * 0.4;
    const debris = noise() * Math.exp(-t * 3) * 0.3;
    const crackle = noise() * Math.exp(-t * 1.5) * 0.1 * (Math.random() > 0.7 ? 1 : 0.3);
    buf.samples[i] = impact + rumble + mid + debris + crackle;
  }
  return buf;
}

function generateWhistle() {
  const buf = createBuffer(1.0);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 15, 1) * (t < 0.7 ? 1 : Math.exp(-(t - 0.7) * 6));
    const vibrato = Math.sin(t * 35) * 20;
    const freq = 1800 + vibrato + Math.sin(t * 2.5) * 200;
    const s = Math.sin(2 * Math.PI * freq * t) * 0.5
            + Math.sin(2 * Math.PI * freq * 2 * t) * 0.1
            + noise() * 0.02;
    buf.samples[i] = s * env;
  }
  return buf;
}

function generateFoghorn() {
  const buf = createBuffer(1.8);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 5, 1) * (t < 1.4 ? 1 : Math.exp(-(t - 1.4) * 5));
    const freq = 95 + Math.sin(t * 2) * 5;
    const s = Math.sin(2 * Math.PI * freq * t) * 0.4
            + Math.sin(2 * Math.PI * freq * 2 * t) * 0.25
            + Math.sin(2 * Math.PI * freq * 3 * t) * 0.15
            + Math.sin(2 * Math.PI * freq * 5 * t) * 0.08
            + noise() * 0.06;
    buf.samples[i] = s * env;
  }
  return buf;
}

function generateLionRoar() {
  const buf = createBuffer(1.5);
  let phase = 0;
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 8, 1) * (t < 1.1 ? 1 : Math.exp(-(t - 1.1) * 5));
    const freq = 150 * Math.exp(-t * 0.8) + 50;
    const tremolo = 0.7 + Math.sin(t * 25) * 0.3;
    phase += freq / SAMPLE_RATE;
    const s = Math.sin(2 * Math.PI * phase) * 0.3
            + Math.sin(2 * Math.PI * phase * 2) * 0.2
            + Math.sin(2 * Math.PI * phase * 3) * 0.15
            + ((phase % 1) * 2 - 1) * 0.15
            + noise() * 0.12;
    buf.samples[i] = s * env * tremolo;
  }
  return buf;
}

function generateDubplate() {
  const buf = createBuffer(1.5);
  for (let i = 0; i < buf.numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.min(t * 15, 1) * Math.exp(-t * 1.5);
    const freq = 200;
    let s = Math.sin(2 * Math.PI * freq * t) * 0.4;
    s += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.3;
    const echo1 = (i > SAMPLE_RATE * 0.15) ? buf.samples[i - Math.floor(SAMPLE_RATE * 0.15)] * 0.4 : 0;
    const echo2 = (i > SAMPLE_RATE * 0.3) ? buf.samples[i - Math.floor(SAMPLE_RATE * 0.3)] * 0.2 : 0;
    const echo3 = (i > SAMPLE_RATE * 0.45) ? buf.samples[i - Math.floor(SAMPLE_RATE * 0.45)] * 0.1 : 0;
    buf.samples[i] = (s + echo1 + echo2 + echo3) * env + noise() * 0.02 * env;
  }
  return buf;
}

const generators = {
  airhorn: generateAirhorn,
  siren: generateSiren,
  alarm: generateAlarm,
  gun_shot: generateGunShot,
  dj_rewind: generateDjRewind,
  pullup: generatePullUp,
  bass_drop: generateBassDrop,
  reggae_horn: generateReggaeHorn,
  dancehall: generateDancehall,
  crowd: generateCrowd,
  explosion: generateExplosion,
  whistle: generateWhistle,
  foghorn: generateFoghorn,
  lion_roar: generateLionRoar,
  dubplate: generateDubplate,
};

if (!fs.existsSync(soundsDir)) fs.mkdirSync(soundsDir, { recursive: true });

const existing = fs.readdirSync(soundsDir);
existing.forEach(f => fs.unlinkSync(path.join(soundsDir, f)));

for (const [name, gen] of Object.entries(generators)) {
  const buf = gen();
  writeWav(path.join(soundsDir, `${name}.mp3`), buf);
  console.log(`Generated: ${name}.mp3 (${buf.duration}s)`);
}

console.log('\nDone! 15 reggae/dancehall sounds generated.');
