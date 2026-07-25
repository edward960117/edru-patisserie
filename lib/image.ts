import sharp from "sharp";

const DATA_IMAGE_PREFIX = "data:image/";
const MAX_INPUT_BYTES = 12 * 1024 * 1024;
const MAX_STORAGE_EDGE = 820;
const WEBP_QUALITY = 68;
const STRONGER_EDGE = 620;
const STRONGER_QUALITY = 58;

export class ImageOptimizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageOptimizationError";
  }
}

function parseDataImageUrl(imageUrl: string) {
  const matched = imageUrl.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!matched) {
    throw new ImageOptimizationError("Invalid image format. Please upload a valid image.");
  }

  const rawBase64 = matched[2].replace(/\s/g, "");
  const buffer = Buffer.from(rawBase64, "base64");
  if (!buffer.length) {
    throw new ImageOptimizationError("Uploaded image is empty.");
  }

  if (buffer.length > MAX_INPUT_BYTES) {
    throw new ImageOptimizationError("Image is too large. Please upload an image below 12MB.");
  }

  return buffer;
}

/**
 * Compresses uploaded data URLs into thumbnail-sized WebP data URLs to reduce payload size.
 */
export async function optimizeImageUrlForStorage(imageUrl: string) {
  if (!imageUrl.startsWith(DATA_IMAGE_PREFIX)) {
    return imageUrl;
  }

  const sourceBuffer = parseDataImageUrl(imageUrl);

  try {
    const optimizedBuffer = await sharp(sourceBuffer)
      .rotate()
      .resize({
        width: MAX_STORAGE_EDGE,
        height: MAX_STORAGE_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();

    const strongerBuffer =
      optimizedBuffer.length > 260 * 1024
        ? await sharp(sourceBuffer)
            .rotate()
            .resize({
              width: STRONGER_EDGE,
              height: STRONGER_EDGE,
              fit: "inside",
              withoutEnlargement: true,
            })
            .webp({ quality: STRONGER_QUALITY, effort: 6 })
            .toBuffer()
        : optimizedBuffer;

    const bestBuffer = strongerBuffer.length < optimizedBuffer.length ? strongerBuffer : optimizedBuffer;
    if (bestBuffer.length >= sourceBuffer.length) {
      return imageUrl;
    }

    return `data:image/webp;base64,${bestBuffer.toString("base64")}`;
  } catch {
    throw new ImageOptimizationError("Image processing failed. Please upload another image.");
  }
}
