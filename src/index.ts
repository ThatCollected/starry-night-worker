/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// import {grammars as all} from '../lib/all.js'
// import {grammars as common} from '../lib/common.js'
// import {createStarryNight} from '../lib/index.js'

async function importStarryNight() {
  const { grammars } = await import("../lib/common.js")
  const { createStarryNight } = await import("../lib/index.js")
  return await createStarryNight(grammars)
}

const handler = {
  async fetch(request: Request, env: unknown, context: any): Promise<Response> {
    // const starryNight = await createStarryNight(common)
    const starryNight = await importStarryNight()
    const scope = starryNight.flagToScope('markdown')
    const tree = starryNight.highlight('# hi', scope)
    // context.waitUntil(new Promise(resolve => setTimeout(resolve, 1000)))
    return new Response(JSON.stringify(tree, null, 2))
  }
}

addEventListener('fetch', (event: any) => {
  event.respondWith(handler.fetch(event.request, {}, event))
})

// export default handler
