import { existsSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// In `npm run dev`, serves api/*.js the way Vercel does in production, so the order forms work locally.
// Server-only env vars (no VITE_ prefix) come from .env.development.local and never reach the browser bundle.
function apiInDev() {
  return {
    name: 'api-in-dev',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')
      for (const [key, value] of Object.entries(env)) if (!key.startsWith('VITE_')) process.env[key] ??= value

      server.middlewares.use(async (req, res, next) => {
        const route = req.url.match(/^\/api\/([a-z-]+)$/)?.[1]
        if (!route || !existsSync(`${server.config.root}/api/${route}.js`)) return next()
        try {
          const handler = (await server.ssrLoadModule(`/api/${route}.js`))[req.method]
          if (!handler) { res.statusCode = 405; return res.end() }
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const response = await handler(new Request(`http://localhost${req.url}`, {
            method: req.method,
            headers: { 'content-type': req.headers['content-type'] ?? '', 'content-length': req.headers['content-length'] ?? '' },
            body: chunks.length ? Buffer.concat(chunks) : undefined,
          }))
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiInDev()],
})
