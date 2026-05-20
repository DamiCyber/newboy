/**
 * Fixes houses with unrealistic pricePerNight (e.g. 2444444444).
 * Run: node scripts/cleanup-prices.js
 */
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const { PrismaClient } = require('@prisma/client')
const { MAX_PRICE_PER_NIGHT, CORRUPT_PRICE } = require('../src/validation')

const prisma = new PrismaClient()
const REPLACEMENT = 250

async function main() {
  const houses = await prisma.house.findMany({
    select: { id: true, title: true, pricePerNight: true },
  })

  const toFix = houses.filter((h) => {
    const n = typeof h.pricePerNight === 'bigint' ? Number(h.pricePerNight) : Number(h.pricePerNight)
    return (
      n === CORRUPT_PRICE ||
      n > MAX_PRICE_PER_NIGHT ||
      !Number.isFinite(n) ||
      n > Number.MAX_SAFE_INTEGER
    )
  })

  if (toFix.length === 0) {
    console.log('No invalid pricePerNight values found.')
    return
  }

  for (const house of toFix) {
    await prisma.house.update({
      where: { id: house.id },
      data: { pricePerNight: BigInt(REPLACEMENT) },
    })
    console.log(
      `House #${house.id} "${house.title}": ${house.pricePerNight} → ${REPLACEMENT}`,
    )
  }

  console.log(`Corrected ${toFix.length} record(s).`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
