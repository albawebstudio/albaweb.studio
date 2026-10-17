import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

const appRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

describe('static hosting configuration', () => {
  it('does not declare a D1 database in wrangler.toml', () => {
    const wrangler = readFileSync(join(appRoot, 'wrangler.toml'), 'utf8')
    assert.doesNotMatch(wrangler, /d1_databases/, 'D1 should be removed for static content reads')
  })

  it('nuxt.config targets client-side content and API-only worker routes', () => {
    const config = readFileSync(join(appRoot, 'nuxt.config.ts'), 'utf8')
    assert.match(config, /ssr:\s*false/)
    assert.match(config, /nativeSqlite:\s*true/)
    assert.match(config, /include:\s*\[\s*['"]\/api\/send['"]\s*\]/)
    assert.match(config, /type:\s*['"]sqlite['"]/)
  })

  it('content pages fetch collections on the client only', () => {
    for (const page of [
      'app/pages/legal/[slug].vue',
      'app/pages/blog/index.vue',
      'app/pages/blog/[slug].vue',
    ]) {
      const source = readFileSync(join(appRoot, page), 'utf8')
      assert.match(source, /server:\s*false/, `${page} should use client-side content queries`)
    }
  })

  it('uses nuxi build so the Pages worker includes /api/send', () => {
    const pkg = JSON.parse(readFileSync(join(appRoot, 'package.json'), 'utf8'))
    assert.match(pkg.scripts.build, /nuxi build/, 'generate omits the worker when ssr: false')
    assert.match(pkg.scripts['wrangler:dev'], /wrangler pages dev dist/)
  })

  it('generated Cloudflare artifacts route only the contact API to the worker', { skip: !existsSync(join(appRoot, 'dist/_routes.json')) }, () => {
    const routes = JSON.parse(readFileSync(join(appRoot, 'dist/_routes.json'), 'utf8'))
    assert.deepEqual(routes.include, ['/api/send'])

    const wrangler = readFileSync(join(appRoot, 'dist/_worker.js/wrangler.json'), 'utf8')
    assert.doesNotMatch(wrangler, /d1_databases/)

    assert.ok(
      existsSync(join(appRoot, 'dist/_worker.js/index.js')),
      'worker entry must exist for wrangler pages dev',
    )
  })
})
