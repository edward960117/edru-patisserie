import sharp from "sharp";

const inputPath = "public/Designer.png";
const outputPath = "public/Designer-blue.png";
const markOutputPath = "public/Designer-mark-blue.png";

const image = sharp(inputPath);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.from(data);

for (let i = 0; i < out.length; i += 4) {
  const r = out[i];
  const g = out[i + 1];
  const b = out[i + 2];
  const a = out[i + 3];

  if (a === 0) continue;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const brightness = (r + g + b) / 3;

  // Remove near-white paper background so the logo inherits site surfaces cleanly.
  if (brightness > 230 && sat < 0.22) {
    out[i + 3] = 0;
    continue;
  }

  // Shift warm metallic accents into sky blue.
  const warmAccent = r > g + 8 && g > b + 2 && brightness > 95 && brightness < 220 && sat > 0.12;
  if (warmAccent) {
    out[i] = 120;
    out[i + 1] = 195;
    out[i + 2] = 236;
    continue;
  }

  // For dark/navy logo strokes, nudge toward brighter azure.
  if (brightness <= 120) {
    const lift = 0.1;
    const nr = Math.min(255, r * (1 - lift) + 24);
    const ng = Math.min(255, g * (1 - lift) + 50);
    const nb = Math.min(255, b * (1 - lift) + 66);
    out[i] = Math.round(nr);
    out[i + 1] = Math.round(ng);
    out[i + 2] = Math.round(nb);
    continue;
  }

  // Keep remaining mid-tones neutral with a slight cool shift.
  out[i] = Math.round(r * 0.94);
  out[i + 1] = Math.round(Math.min(255, g * 0.99 + 4));
  out[i + 2] = Math.round(Math.min(255, b * 1.04 + 6));
}

await sharp(out, {
  raw: {
    width: info.width,
    height: info.height,
    channels: info.channels,
  },
})
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

// Crop the emblem mark for compact UI placements like the header badge.
await sharp(out, {
  raw: {
    width: info.width,
    height: info.height,
    channels: info.channels,
  },
})
  .extract({ left: 350, top: 90, width: 580, height: 580 })
  .resize(640, 640, { fit: "contain" })
  .png({ compressionLevel: 9 })
  .toFile(markOutputPath);

console.log(`Generated ${outputPath}`);
console.log(`Generated ${markOutputPath}`);