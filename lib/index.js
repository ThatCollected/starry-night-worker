/**
 * @typedef {import('hast').Root} Root
 *
 * @typedef {GrammarFields & PatternFields} Grammar
 * @typedef {RuleInclude|RuleName|RulePatterns|RuleDefinitionBeginEnd|RuleDefinitionBeginWhile|RuleDefinitionMatch|RuleDefinitionCaptures} Rule
 * @typedef {RuleIncludeFields} RuleInclude
 * @typedef {RuleNameFields} RuleName
 * @typedef {PatternFields} RulePatterns
 * @typedef {RuleDefinitionSharedFields & RuleDefinitionBeginEndFields} RuleDefinitionBeginEnd
 * @typedef {RuleDefinitionSharedFields & RuleDefinitionBeginWhileFields} RuleDefinitionBeginWhile
 * @typedef {RuleDefinitionSharedFields & RuleDefinitionMatchFields} RuleDefinitionMatch
 * @typedef {Omit<RuleDefinitionSharedFields, 'captures'> & RuleDefinitionCapturesFields} RuleDefinitionCaptures
 *
 * @typedef GrammarFields
 * @property {string} scopeName
 * @property {Array<string>} names
 * @property {Array<string>} extensions
 *
 * @typedef PatternFields
 * @property {Array<Rule>} patterns
 * @property {Record<string, Rule>} [repository]
 * @property {Record<string, Rule>} [injections]
 *
 * @typedef RuleNameFields
 * @property {string} name
 *
 * @typedef RuleIncludeFields
 * @property {string} include
 *
 * @typedef RuleDefinitionSharedFields
 * @property {string} [name]
 * @property {string} [contentName]
 * @property {Captures} [captures]
 * @property {Captures} [beginCaptures]
 * @property {Captures} [endCaptures]
 * @property {boolean} [applyEndPatternLast]
 *
 * @typedef RuleDefinitionBeginEndFields
 * @property {string} begin
 * @property {string} end
 *
 * @typedef RuleDefinitionBeginWhileFields
 * @property {string} begin
 * @property {string} while
 *
 * @typedef RuleDefinitionMatchFields
 * @property {string} match
 *
 * @typedef RuleDefinitionCapturesFields
 * @property {Captures} captures
 *
 * @typedef {Record<number|string, Rule>} Captures
 */

import vscodeTextmate from 'vscode-textmate'
import vscodeOniguruma from 'vscode-oniguruma'
import {onigWasm} from './get-oniguruma.js'
import {parse} from './parse.js'
import {theme} from './theme.js'

/**
 * Create a `StarryNight` that can highlight things based on the given
 * `grammars`.
 * This is async to facilitate async loading and registering, which is currently
 * only used for WASM.
 *
 * @param {Array<Grammar>} grammars
 *   Grammars to support.
 */
export async function createStarryNight(grammars) {
  /** @type {Map<string, Grammar>} */
  const registered = new Map()
  /** @type {Map<string, string>} */
  const names = new Map()
  /** @type {Map<string, string>} */
  const extensions = new Map()
  let currentRegistry = await createRegistry(grammars)

  return {flagToScope, scopes, register, highlight}

  /**
   * @param {Array<Grammar>} grammars
   */
  async function register(grammars) {
    currentRegistry = await createRegistry(grammars)
  }

  /**
   * Get the grammar scope (such as `source.gfm`) associated with a grammar name
   * (such as `markdown` or `pandoc`) or grammar extension (such as `.md` or
   * `.rmd`).
   * Note that grammars can use the same extensions.
   * Importantly, `.md` is registeded by a lisp-like language instead of
   * markdown. 🤷‍♂️
   *
   * @param {string} flag
   *   Grammar name (such as `'markdown'` or `'pandoc'`) or grammar extension
   *   (such as `'.md'` or `'.rmd'`).
   * @returns {string|undefined}
   *   Grammar scope (such as `'source.gfm'`).
   */
  function flagToScope(flag) {
    if (typeof flag !== 'string') {
      throw new TypeError('Expected `string` for `flag`, got `' + flag + '`')
    }

    const normal = flag
      .toLowerCase()
      .replace(/^[ \t]+/, '')
      .replace(/\/*[ \t]*$/g, '')

    return (
      names.get(normal) ||
      extensions.get(normal) ||
      extensions.get('.' + normal)
    )
  }

  /**
   * List all registered scopes.
   *
   * @returns {Array<string>}
   *   List of grammar scopes (such as `'source.gfm'`).
   */
  function scopes() {
    return [...registered.keys()].sort()
  }

  /**
   * Highlight `value` (code) as `scope` (a textmate scope).
   *
   * @param {string} value
   *   Code to highlight.
   * @param {string} scope
   *   Registered grammar scope to highlight as (such as `'source.gfm'`).
   * @returns {Root}
   *   Node representing highlighted code.
   */
  function highlight(value, scope) {
    if (typeof value !== 'string') {
      throw new TypeError('Expected `string` for `value`, got `' + value + '`')
    }

    if (typeof scope !== 'string') {
      throw new TypeError('Expected `string` for `scope`, got `' + scope + '`')
    }

    /** @type {Grammar} */
    // @ts-expect-error: use the private API so we don’t need to cache again.
    // type-coverage:ignore-next-line
    const grammar = currentRegistry._syncRegistry._grammars[scope]

    if (!grammar) {
      throw new Error('Expected grammar `' + scope + '` to be registered')
    }

    // @ts-expect-error: `vscode-textmate` types are wrong.
    return parse(value, grammar, currentRegistry.getColorMap())
  }

  /**
   * @param {Array<Grammar>} grammars
   */
  async function createRegistry(grammars) {
    console.log("createRegistry 1")
    for (const grammar of grammars) {
      const scope = grammar.scopeName
      for (const d of grammar.extensions) extensions.set(d, scope)
      for (const d of grammar.names) names.set(d, scope)
      registered.set(scope, grammar)
    }
    console.log("createRegistry 2")

    const registry = new vscodeTextmate.Registry({
      onigLib: createOniguruma(),
      // @ts-expect-error: `vscode-textmate` has much stricter types that needed
      // by textmate, or by what they actually support.
      // Given that we can’t fix the grammars provided by the world here, and
      // given that `vscode-textmate` is crying without a reason, we tell it to
      // shut up instead.
      async loadGrammar(scopeName) {
        return registered.get(scopeName)
      }
    })
    console.log("createRegistry 3")

    registry.setTheme(theme)

    console.log("createRegistry 4")
    console.log("createRegistry 4.1", registered)

    await Promise.all(
      [...registered.keys()].map((d) => {
        return registry.loadGrammar(d)
      })
    )

    console.log("createRegistry 5")

    return registry
  }
}

/**
 * Small function needed for oniguruma to work.
 *
 * Idea: as this seems to be a singleton, would it help if we call it once and
 * keep the promise?
 */
async function createOniguruma() {
  // See: https://github.com/microsoft/vscode-oniguruma/blob/main/src/index.ts
  console.log("onigWasm", onigWasm)
  await vscodeOniguruma.loadWASM({
    instantiator: async (importObject) => ({
      instance: new WebAssembly.Instance(onigWasm, importObject),
      module: onigWasm
    })
  })
  console.log("Loaded onigWasm")
  // await vscodeOniguruma.loadWASM(onigWasm)
  return vscodeOniguruma
}
