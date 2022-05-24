/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {importStarryNight} from './starryNight'
import {toHtml} from 'hast-util-to-html'

// import {grammars as all} from '../lib/all.js'
// import {grammars as common} from '../lib/common.js'
// import {createStarryNight} from '../lib/index.js'

// async function importStarryNight() {
//   const { grammars } = await import("../lib/common.js")
//   const { createStarryNight } = await import("../lib/index.js")
//   return await createStarryNight(grammars)
// }

async function starryNightHandler(request: Request): Promise<Response> {
  // const {importStarryNight} = await import('./starryNight')
  // const starryNight = await createStarryNight(common)
  const url = new URL(request.url)
  const lang = url.searchParams.get('lang') ?? 'markdown';
  const source =
    request.method.toUpperCase() === 'GET'
      ? url.searchParams.get('source') ?? ''
      : await request.text()

  console.log('0. creating starry night')
  const starryNight = await importStarryNight()
  console.log('1. created starry night')
  const scope = starryNight.flagToScope(lang)
  if (scope == null) {
    return new Response(`Unknown language ${lang}`, { status: 400 })
  }
  const tree = starryNight.highlight(source, scope)
  console.log('1. created tree')
  // context.waitUntil(new Promise(resolve => setTimeout(resolve, 1000)))
  return new Response(toHtml(tree))
}

export class StarryNightDurableObject {
  constructor(state: unknown, env: Env) {}

  async fetch(request: Request) {
    return await starryNightHandler(request)
    // return new Response("Hello World!")
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const id = env.StarryNightDurableObject.idFromName('shared')
    const starryNight = env.StarryNightDurableObject.get(id)
    return await starryNight.fetch(request)
  }
}

interface Env {
  StarryNightDurableObject: DurableObjectNamespace
}

// addEventListener('fetch', (event: any) => {
//   event.respondWith(handler.fetch(event.request, {}, event))
// })

// export default handler
