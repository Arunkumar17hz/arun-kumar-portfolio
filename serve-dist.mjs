/**
 * Zero-dependency static server for the production build (dist/).
 * Used for the live preview: no host allowlists, no-cache HTML,
 * correct MIME types, SPA fallback to index.html.
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const PORT = Number(process.env.PORT || 5173)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

async function resolveFile(urlPath) {
  // prevent path traversal
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '')
  let filePath = join(ROOT, safe)
  if (!filePath.startsWith(ROOT)) return null
  try {
    const info = await stat(filePath)
    if (info.isDirectory()) filePath = join(filePath, 'index.html')
    await stat(filePath)
    return filePath
  } catch {
    return null
  }
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost')
    let filePath = await resolveFile(url.pathname)
    if (!filePath && !extname(url.pathname)) filePath = join(ROOT, 'index.html') // SPA fallback
    if (!filePath) {
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.end('Not found')
      return
    }
    const body = await readFile(filePath)
    const type = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream'
    const isHtml = extname(filePath) === '.html'
    res.writeHead(200, {
      'content-type': type,
      'cache-control': isHtml ? 'no-cache' : 'public, max-age=3600',
      'access-control-allow-origin': '*',
    })
    res.end(body)
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end('Server error: ' + err.message)
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`▶ Portfolio production build → http://0.0.0.0:${PORT}/`)
})
