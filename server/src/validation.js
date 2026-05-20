/** Max nightly rate in naira (luxury cap). */
/** Max list / nightly price in naira */
const MAX_PRICE_PER_NIGHT = 500_000_000

/** Known bad value entered by mistake. */
const CORRUPT_PRICE = 2_444_444_444

function validatePricePerNight(raw) {
  const n = Number(raw)
  if (!Number.isFinite(n)) {
    return { ok: false, error: 'pricePerNight must be a valid number' }
  }
  if (n < 0) {
    return { ok: false, error: 'pricePerNight cannot be negative' }
  }
  if (n > MAX_PRICE_PER_NIGHT) {
    return {
      ok: false,
      error: `pricePerNight cannot exceed ₦${MAX_PRICE_PER_NIGHT.toLocaleString('en-NG')} per night`,
    }
  }
  const rounded = Math.round(n * 100) / 100
  return { ok: true, value: rounded }
}

/** Whole naira as BigInt (SQLite-safe for large nightly rates). */
function toPriceBigInt(naira) {
  return BigInt(Math.round(Number(naira)))
}

function fromPriceBigInt(value) {
  return typeof value === 'bigint' ? Number(value) : Number(value)
}

/** Optional video tour link (admin-provided .mp4 or hosted URL). */
function validateVideoTourUrl(raw) {
  if (raw === undefined || raw === null || raw === '') {
    return { ok: true, value: null }
  }
  const url = String(raw).trim()
  if (!/^https?:\/\/.+/i.test(url)) {
    return { ok: false, error: 'videoTourUrl must be a valid http(s) URL' }
  }
  return { ok: true, value: url }
}

module.exports = {
  MAX_PRICE_PER_NIGHT,
  CORRUPT_PRICE,
  validatePricePerNight,
  validateVideoTourUrl,
  toPriceBigInt,
  fromPriceBigInt,
}
