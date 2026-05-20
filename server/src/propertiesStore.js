const fs = require('fs')
const path = require('path')

const propertiesPath = path.join(__dirname, 'data', 'properties.json')

function readProperties() {
  try {
    if (!fs.existsSync(propertiesPath)) return []
    const raw = fs.readFileSync(propertiesPath, 'utf-8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('properties.json read error:', e.message)
    return []
  }
}

function writeProperties(list) {
  fs.writeFileSync(propertiesPath, JSON.stringify(list, null, 2), 'utf-8')
}

function nextPropertyId(list) {
  const max = list.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0)
  return max + 1
}

module.exports = { readProperties, writeProperties, nextPropertyId, propertiesPath }
