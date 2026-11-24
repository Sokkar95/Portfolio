/**
 * Generates placeholder PNG assets + a placeholder Resume.pdf at the exact
 * paths the components reference, so the page renders correctly before real
 * artwork is dropped in. Re-run with: node scripts/make-placeholders.mjs
 */
import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES = path.join(__dirname, "..", "public", "images");
const PUBLIC = path.join(__dirname, "..", "public");

/* ----------------------------- PNG encoding --------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++)
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/* ------------------------------ tiny canvas -------------------------- */

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));

class Canvas {
  constructor(w, h, bg = "#000000") {
    this.w = w;
    this.h = h;
    this.px = new Float64Array(w * h * 3);
    const [r, g, b] = hex(bg);
    for (let i = 0; i < w * h; i++) {
      this.px[i * 3] = r;
      this.px[i * 3 + 1] = g;
      this.px[i * 3 + 2] = b;
    }
  }

  blend(x, y, color, alpha) {
    if (alpha <= 0) return;
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    if (xi < 0 || yi < 0 || xi >= this.w || yi >= this.h) return;
    const i = (yi * this.w + xi) * 3;
    const a = Math.min(1, alpha);
    this.px[i] += (color[0] - this.px[i]) * a;
    this.px[i + 1] += (color[1] - this.px[i + 1]) * a;
    this.px[i + 2] += (color[2] - this.px[i + 2]) * a;
  }

  /** Soft radial glow, additive-ish. */
  glow(cx, cy, radius, color, strength = 0.55) {
    const x0 = Math.max(0, Math.floor(cx - radius));
    const x1 = Math.min(this.w, Math.ceil(cx + radius));
    const y0 = Math.max(0, Math.floor(cy - radius));
    const y1 = Math.min(this.h, Math.ceil(cy + radius));
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const d = Math.hypot(x - cx, y - cy) / radius;
        if (d >= 1) continue;
        const fall = (1 - d) ** 2;
        this.blend(x, y, color, fall * strength);
      }
    }
  }

  /** Diagonal linear wash. */
  wash(a, b, t) {
    const ca = hex(a);
    const cb = hex(b);
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const d = (x / this.w + y / this.h) / 2;
        const c = mix(ca, cb, d * t);
        const i = (y * this.w + x) * 3;
        this.px[i] += (c[0] - this.px[i]) * t;
        this.px[i + 1] += (c[1] - this.px[i + 1]) * t;
        this.px[i + 2] += (c[2] - this.px[i + 2]) * t;
      }
    }
  }

  rect(x, y, w, h, color, alpha = 1, radius = 0) {
    for (let py = Math.max(0, y); py < Math.min(this.h, y + h); py++) {
      for (let px = Math.max(0, x); px < Math.min(this.w, x + w); px++) {
        if (radius > 0) {
          const dx = Math.max(x + radius - px - 0.5, px - (x + w - radius) + 0.5, 0);
          const dy = Math.max(y + radius - py - 0.5, py - (y + h - radius) + 0.5, 0);
          if (Math.hypot(dx, dy) > radius) continue;
          const edge = radius - Math.hypot(dx, dy);
          this.blend(px, py, color, alpha * Math.min(1, edge));
        } else {
          this.blend(px, py, color, alpha);
        }
      }
    }
  }

  ellipse(cx, cy, rx, ry, color, alpha = 1, samples = 3) {
    for (let py = Math.max(0, Math.floor(cy - ry - 2)); py < Math.min(this.h, Math.ceil(cy + ry + 2)); py++) {
      for (let px = Math.max(0, Math.floor(cx - rx - 2)); px < Math.min(this.w, Math.ceil(cx + rx + 2)); px++) {
        let hits = 0;
        for (let sy = 0; sy < samples; sy++) {
          for (let sx = 0; sx < samples; sx++) {
            const ox = px + (sx + 0.5) / samples;
            const oy = py + (sy + 0.5) / samples;
            if (((ox - cx) / rx) ** 2 + ((oy - cy) / ry) ** 2 <= 1) hits++;
          }
        }
        if (hits) this.blend(px, py, color, alpha * (hits / (samples * samples)));
      }
    }
  }

  toPNG() {
    const raw = Buffer.alloc((this.w * 3 + 1) * this.h);
    let o = 0;
    for (let y = 0; y < this.h; y++) {
      raw[o++] = 0; // filter: none
      for (let x = 0; x < this.w; x++) {
        const i = (y * this.w + x) * 3;
        raw[o++] = clamp(this.px[i]);
        raw[o++] = clamp(this.px[i + 1]);
        raw[o++] = clamp(this.px[i + 2]);
      }
    }
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(this.w, 0);
    ihdr.writeUInt32BE(this.h, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 2; // colour type: truecolour
    return Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk("IHDR", ihdr),
      chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
      chunk("IEND", Buffer.alloc(0)),
    ]);
  }
}

/* ------------------------------ artwork ------------------------------ */

function avatar() {
  const c = new Canvas(700, 900, "#0C0C0C");
  c.wash("#1A0330", "#0C0C0C", 0.55);
  c.glow(350, 330, 420, hex("#B600A8"), 0.5);
  c.glow(210, 620, 360, hex("#7621B0"), 0.4);
  c.glow(520, 700, 330, hex("#BE4C00"), 0.32);

  // shoulders then head, soft grey silhouette
  c.ellipse(350, 980, 300, 330, hex("#8E9BA6"), 0.95);
  c.ellipse(350, 330, 122, 148, hex("#C2CFD8"), 0.97);
  c.ellipse(350, 640, 250, 300, hex("#A8B6C0"), 0.5);

  return c.toPNG();
}

function appScreen(accent, variant) {
  const W = 1200;
  const H = 750;
  const c = new Canvas(W, H, "#0F0F12");
  c.glow(W * 0.75, 120, 520, hex(accent), 0.3);
  c.rect(0, 0, W, H, hex("#000000"), 0.12);

  // top bar
  c.rect(40, 36, W - 80, 64, hex("#1B1B21"), 1, 18);
  [0, 1, 2].forEach((i) => c.ellipse(78 + i * 26, 68, 8, 8, hex("#3A3A44")));
  c.rect(W - 300, 58, 240, 16, hex("#2E2E38"), 1, 8);

  // side rail
  c.rect(40, 128, 232, H - 200, hex("#16161B"), 1, 20);
  for (let i = 0; i < 5; i++) {
    c.rect(66, 160 + i * 62, 180 - (i % 2) * 46, 14, hex("#2A2A33"), 1, 7);
    c.ellipse(70, 167 + i * 62, 5, 5, hex(accent), 0.7);
  }

  // hero card
  c.rect(304, 128, W - 344, 236, hex("#1A1A20"), 1, 22);
  c.rect(304, 128, W - 344, 236, hex(accent), 0.14, 22);
  c.rect(336, 168, 200, 22, hex("#E6EEF4"), 0.85, 11);
  c.rect(336, 206, 300, 14, hex("#8E9BA6"), 0.5, 7);
  c.rect(336, 236, 240, 14, hex("#8E9BA6"), 0.35, 7);
  c.ellipse(W - 440, 246, 76, 76, hex(accent), 0.4);

  // stat cards
  const stats = [336, 336, 336];
  stats.forEach((sx) => {
    const sy = 396;
    c.rect(sx, sy, 252, 148, hex("#1A1A20"), 1, 18);
    c.rect(sx + 24, sy + 26, 96, 12, hex("#8E9BA6"), 0.45, 6);
    c.rect(sx + 24, sy + 56, 150, 26, hex(accent), 0.75, 10);
    c.rect(sx + 24, sy + 100, 190, 10, hex("#2E2E38"), 1, 5);
  });

  // list rows
  for (let i = 0; i < 3; i++) {
    const ry = 572 + i * 46;
    c.rect(336, ry, W - 376, 40, hex("#17171C"), 1, 12);
    c.ellipse(360, ry + 20, 11, 11, hex(accent), 0.55);
    c.rect(386, ry + 13, 180 + (i % 2) * 90, 14, hex("#3A3A44"), 1, 7);
    c.rect(W - 240, ry + 13, 120, 14, hex("#2E2E38"), 1, 7);
  }

  // variant tweak: a different accent wash so the 3 images differ
  c.glow(variant % 2 ? 220 : 980, 640, 300, hex(accent), 0.16);
  return c.toPNG();
}

/* --------------------------- minimal PDF ----------------------------- */

function resumePDF() {
  const content = [
    "BT",
    "/F1 26 Tf",
    "72 760 Td",
    "(Amr Elsokkary) Tj",
    "/F1 12 Tf",
    "0 -28 Td",
    "(Product \\& UI/UX Designer) Tj",
    "0 -18 Td",
    "0 -14 Td",
    "(This is a placeholder file. Replace public/Resume.pdf) Tj",
    "0 -20 Td",
    "(with your real curriculum vitae.) Tj",
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => {
    pdf += `${String(o).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}

/* ------------------------------- main -------------------------------- */

fs.mkdirSync(IMAGES, { recursive: true });
const written = [];

const write = (name, buf) => {
  fs.writeFileSync(path.join(IMAGES, name), buf);
  written.push(`images/${name} (${(buf.length / 1024).toFixed(1)} KB)`);
};

write("my-avatar.png", avatar());

const projects = {
  "3arabawy": "#B600A8",
  gfit: "#BE4C00",
  darak: "#7621B0",
};
for (const [name, accent] of Object.entries(projects)) {
  for (let v = 1; v <= 3; v++) write(`${name}-${v}.png`, appScreen(accent, v));
}

const pdf = resumePDF();
fs.writeFileSync(path.join(PUBLIC, "Resume.pdf"), pdf);
written.push(`Resume.pdf (${(pdf.length / 1024).toFixed(1)} KB)`);

console.log(written.join("\n"));
