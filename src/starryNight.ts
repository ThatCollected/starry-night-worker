import { grammars as all } from '../lib/all.js'
import { grammars as common } from '../lib/common.js'
import sourceGfm from '../lang/source.gfm.js'
import { createStarryNight } from '../lib/index.js'

export async function importStarryNight() {
  console.log("WILL")
  const promise = createStarryNight(common)
  // const promise = createStarryNight([sourceGfm])
  console.log("DID")
  return promise;
}
