/** Admin API key from header X-Admin-Key or Authorization: Bearer <key> */
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_KEY || 'admin123'
  const headerKey = req.headers['x-admin-key']
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null
  const key = headerKey || bearer

  if (!key || key !== expected) {
    return res.status(401).json({ error: 'Admin authentication required' })
  }
  next()
}

module.exports = { requireAdmin }
