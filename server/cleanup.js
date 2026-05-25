require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const all = await prisma.house.findMany({ select: { id: true, title: true } })
  console.log('All houses:')
  all.forEach(h => console.log(`  id=${h.id}  ${h.title}`))

  // Change this array to the IDs you want to KEEP
  const keepIds = [1] // <-- put your real listing's ID here

  const deleted = await prisma.house.deleteMany({
    where: { id: { notIn: keepIds } }
  })
  console.log(`Deleted ${deleted.count} houses.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
