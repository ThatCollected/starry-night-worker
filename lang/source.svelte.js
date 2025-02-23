// This is a TextMate grammar distributed by `starry-night`.
// This grammar is licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.svelte'],
  names: ['svelte'],
  patterns: [
    {
      begin:
        '(<)(style)\\b(?=[^>]*(?:type=(\'text/sass\'|"text/sass")|lang=(sass|\'sass\'|"sass")))(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'}
      },
      end: '(</)(style)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.sass',
          end: '(?=</style>)',
          patterns: [{include: 'source.sass'}]
        }
      ]
    },
    {
      begin:
        '(<)(style)\\b(?=[^>]*(?:type=(\'text/scss\'|"text/scss")|lang=(scss|\'scss\'|"scss")))(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'}
      },
      end: '(</)(style)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.css.scss',
          end: '(?=</style>)',
          patterns: [{include: 'source.css.scss'}]
        }
      ]
    },
    {
      begin:
        '(<)(style)\\b(?=[^>]*(?:type=(\'text/less\'|"text/less")|lang=(less|\'less\'|"less")))(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'}
      },
      end: '(</)(style)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.css.less',
          end: '(?=</style>)',
          patterns: [{include: 'source.css.less'}]
        }
      ]
    },
    {
      begin:
        '(<)(style)\\b(?=[^>]*(?:type=(\'text/stylus\'|"text/stylus")|lang=(stylus|\'stylus\'|"stylus")))(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'}
      },
      end: '(</)(style)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.stylus',
          end: '(?=</style>)',
          patterns: [{include: 'source.stylus'}]
        }
      ]
    },
    {
      begin:
        '(<)(style)\\b(?=[^>]*(?:type=(\'text/postcss\'|"text/postcss")|lang=(postcss|\'postcss\'|"postcss")))(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'}
      },
      end: '(</)(style)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.postcss',
          end: '(?=</style>)',
          patterns: [{include: 'source.postcss'}]
        }
      ]
    },
    {
      begin:
        '(<)(style)\\b(?=[^>]*(?:(?:type=(\'text/css\'|"text/css")|lang=(css|\'css\'|"css")))?)(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'}
      },
      end: '(</)(style)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.style.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.css',
          end: '(?=</style>)',
          patterns: [{include: 'source.css'}]
        }
      ]
    },
    {
      begin:
        '(<)(script)\\b(?=[^>]*(?:type=(\'text/typescript\'|"text/typescript")|lang=(typescript|\'typescript\'|"typescript")))(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.script.html'}
      },
      end: '(</)(script)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.script.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.ts',
          end: '(?=</script>)',
          patterns: [{include: 'source.ts'}]
        }
      ]
    },
    {
      begin:
        '(<)(script)\\b(?=[^>]*(?:type=(\'text/coffee\'|"text/coffee")|lang=(coffee|\'coffee\'|"coffee")))(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.script.html'}
      },
      end: '(</)(script)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.script.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.coffee',
          end: '(?=</script>)',
          patterns: [{include: 'source.coffee'}]
        }
      ]
    },
    {
      begin:
        '(<)(script)\\b(?=[^>]*(?:(?:type=(\'text/javascript\'|"text/javascript")|lang=(javascript|\'javascript\'|"javascript")))?)(?![^/>]*/>\\s*$)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.script.html'}
      },
      end: '(</)(script)(>)',
      endCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.script.html'},
        3: {name: 'punctuation.definition.tag.end.html'}
      },
      patterns: [
        {include: '#tag-stuff'},
        {
          begin: '(>)',
          beginCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
          contentName: 'source.js',
          end: '(?=</script>)',
          patterns: [{include: 'source.js'}]
        }
      ]
    },
    {
      begin: '({)\\s*(#if|:elseif|#await|@html)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.svelte'},
        2: {name: 'keyword.control.conditional'}
      },
      end: '}',
      endCaptures: {0: {name: 'punctuation.definition.tag.end.svelte'}},
      patterns: [{include: 'source.ts'}]
    },
    {
      captures: {
        1: {name: 'punctuation.definition.tag.begin.svelte'},
        2: {name: 'keyword.control.conditional'},
        3: {name: 'variable'},
        4: {name: 'punctuation.definition.tag.end.svelte'}
      },
      match: '({)\\s*(:then|:catch)\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(})'
    },
    {
      begin: '({)\\s*(#each)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.svelte'},
        2: {name: 'keyword.control.conditional'}
      },
      end: '}',
      endCaptures: {0: {name: 'punctuation.definition.tag.end.svelte'}},
      patterns: [
        {
          begin: '\\s',
          end: '\\s(as)\\s+',
          endCaptures: {1: {name: 'keyword.control'}},
          patterns: [{include: 'source.ts'}]
        },
        {match: '[_$[:alpha:]][_$[:alnum:]]*\\s*', name: 'variable'},
        {
          patterns: [
            {
              begin: '\\[\\s*',
              end: ']\\s*',
              patterns: [{include: 'source.js'}]
            },
            {begin: '\\{\\s*', end: '}\\s*', patterns: [{include: 'source.js'}]}
          ]
        },
        {
          captures: {1: {name: 'variable'}},
          match: ',\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s*'
        },
        {begin: '\\(', end: '\\)\\s*', patterns: [{include: 'source.ts'}]}
      ]
    },
    {
      captures: {
        1: {name: 'punctuation.definition.tag.begin.svelte'},
        2: {name: 'keyword.control.conditional'},
        3: {name: 'punctuation.definition.tag.end.svelte'}
      },
      match: '({)\\s*(:else|/if|/each|/await)\\s*(})'
    },
    {
      begin: '{',
      beginCaptures: {0: {name: 'punctuation.definition.tag.begin.svelte'}},
      end: '}',
      endCaptures: {0: {name: 'punctuation.definition.tag.end.svelte'}},
      patterns: [{include: 'source.ts'}]
    },
    {
      begin: '(</?)([a-zA-Z][a-zA-Z0-9:-]*)',
      beginCaptures: {
        1: {name: 'punctuation.definition.tag.begin.html'},
        2: {name: 'entity.name.tag.other.html'}
      },
      end: '(/?>)',
      endCaptures: {1: {name: 'punctuation.definition.tag.end.html'}},
      name: 'meta.tag.other.html',
      patterns: [{include: '#tag-stuff'}]
    },
    {begin: '<!--', end: '-->', name: 'comment.block'},
    {match: '<!doctype html>', name: 'punctuation.definition.tag'}
  ],
  repository: {
    entities: {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.definition.entity.html'},
            3: {name: 'punctuation.definition.entity.html'}
          },
          match: '(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)',
          name: 'constant.character.entity.html'
        },
        {match: '&', name: 'invalid.illegal.bad-ampersand.html'}
      ]
    },
    'string-double-quoted': {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.html'}},
      end: '"',
      endCaptures: {0: {name: 'punctuation.definition.string.end.html'}},
      name: 'string.quoted.double.html',
      patterns: [{include: '#entities'}]
    },
    'string-single-quoted': {
      begin: "'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.html'}},
      end: "'",
      endCaptures: {0: {name: 'punctuation.definition.string.end.html'}},
      name: 'string.quoted.single.html',
      patterns: [{include: '#entities'}]
    },
    'tag-event-handlers': {
      begin: '\\b(on):([a-zA-Z]+)=("|\')',
      beginCaptures: {
        1: {name: 'entity.other.attribute-name.html'},
        2: {name: 'entity.other.attribute-name.html'},
        3: {name: 'string.quoted.double'}
      },
      end: '\\3',
      endCaptures: {0: {name: 'string.quoted.double'}},
      patterns: [{include: 'source.ts'}]
    },
    'tag-generic-attribute': {
      match: '\\b([a-zA-Z\\-:]+)',
      name: 'entity.other.attribute-name.html'
    },
    'tag-id-attribute': {
      begin: '\\b(id)\\b\\s*(=)',
      captures: {
        1: {name: 'entity.other.attribute-name.id.html'},
        2: {name: 'punctuation.separator.key-value.html'}
      },
      end: '(?<=\'|")',
      name: 'meta.attribute-with-value.id.html',
      patterns: [
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.html'}
          },
          contentName: 'meta.toc-list.id.html',
          end: '"',
          endCaptures: {0: {name: 'punctuation.definition.string.end.html'}},
          name: 'string.quoted.double.html',
          patterns: [{include: '#entities'}]
        },
        {
          begin: "'",
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.html'}
          },
          contentName: 'meta.toc-list.id.html',
          end: "'",
          endCaptures: {0: {name: 'punctuation.definition.string.end.html'}},
          name: 'string.quoted.single.html',
          patterns: [{include: '#entities'}]
        }
      ]
    },
    'tag-moustaches': {
      begin: '\\b([a-zA-Z\\-:]+)=("|\')(?=.*{)',
      beginCaptures: {
        1: {name: 'entity.other.attribute-name.html'},
        2: {name: 'string.quoted.double'}
      },
      end: '\\2',
      endCaptures: {0: {name: 'string.quoted.double'}},
      patterns: [
        {
          begin: '{',
          beginCaptures: {0: {name: 'punctuation.definition.tag.begin.svelte'}},
          end: '}',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.svelte'}},
          patterns: [{include: 'source.ts'}]
        },
        {match: '(?!{).', name: 'string.quoted.double'}
      ]
    },
    'tag-moustaches-raw': {
      begin: '\\b([a-zA-Z\\-:]+)=({)',
      beginCaptures: {
        1: {name: 'entity.other.attribute-name.html'},
        2: {name: 'punctuation.definition.tag.begin.svelte'}
      },
      end: '}',
      endCaptures: {0: {name: 'punctuation.definition.tag.end.svelte'}},
      patterns: [{include: 'source.ts'}]
    },
    'tag-shorthand': {
      captures: {
        1: {name: 'punctuation.definition.tag.begin.svelte'},
        2: {name: 'variable'},
        3: {name: 'punctuation.definition.tag.end.svelte'}
      },
      match: '({)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s*(})'
    },
    'tag-stuff': {
      patterns: [
        {include: '#tag-event-handlers'},
        {include: '#tag-moustaches'},
        {include: '#tag-moustaches-raw'},
        {include: '#tag-shorthand'},
        {include: '#tag-id-attribute'},
        {include: '#tag-generic-attribute'},
        {include: '#string-double-quoted'},
        {include: '#string-single-quoted'}
      ]
    }
  },
  scopeName: 'source.svelte'
}

export default grammar
