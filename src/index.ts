import {
  TraverseCallback, TraverseLegacyOptions, TraverseOptions
} from './types'

function traverse(
  schema: any,
  callback: TraverseCallback
)
function traverse(
  schema: any,
  options: TraverseLegacyOptions,
  callback: TraverseCallback
)
function traverse(
  schema: any,
  options: TraverseOptions
)
function traverse(
  schema: any,
  optionsOrCallback: TraverseCallback | TraverseOptions | TraverseLegacyOptions,
  callback?: TraverseCallback
) {
  let pre: TraverseCallback = noop
  let post: TraverseCallback = noop
  let opts: TraverseOptions | TraverseLegacyOptions = { cb: noop }

  if ( isTraverseCallback( optionsOrCallback ) ){
    pre = optionsOrCallback
  } else if( isTraverseCallback( callback ) ){
    pre = callback
    opts = optionsOrCallback
  } else {
    const { cb } = <TraverseOptions>optionsOrCallback

    if ( isTraverseCallback( cb ) ) {
      pre = cb
    } else {
      pre = cb.pre || noop
      post = cb.post || noop
    }

    opts = optionsOrCallback
  }

  _traverse( opts, pre, post, schema, '', schema )
}

traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true
}

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
}

traverse.propsKeywords = {
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
}

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
}

const _traverse = (
  opts: TraverseOptions | TraverseLegacyOptions,
  pre: TraverseCallback, post: TraverseCallback,
  schema: any, jsonPtr: string,
  rootSchema: any,
  parentJsonPtr?: string, parentKeyword?: string, parentSchema?: any,
  keyIndex?: string | number
) => {
  if ( !isTraversable( schema ) ) return

  pre(
    schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema,
    keyIndex
  )

  for ( var key in schema ) {
    const subschema = schema[ key ]

    if ( Array.isArray( subschema ) ) {
      if ( key in traverse.arrayKeywords ) {
        for ( var i = 0; i < subschema.length; i++ ){
          _traverse(
            opts, pre, post, subschema[ i ],
            `${ jsonPtr }/${ key }/${ i }`,
            rootSchema, jsonPtr, key, schema, i
          )
        }
      }
    } else if ( key in traverse.propsKeywords ) {
      if ( subschema && typeof subschema == 'object' ) {
        for ( var prop in subschema ){
          _traverse(
            opts, pre, post, subschema[ prop ],
            `${ jsonPtr }/${ key }/${ escapeJsonPtr( prop ) }`,
            rootSchema, jsonPtr, key, schema, prop
          )
        }
      }
    } else if (
      key in traverse.keywords ||
      ( opts.allKeys && !( key in traverse.skipKeywords ) )
    ) {
      _traverse(
        opts, pre, post, subschema,
        `${ jsonPtr }/${ key }`,
        rootSchema, jsonPtr, key, schema
      )
    }
  }

  post(
    schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema,
    keyIndex
  )
}

const noop: TraverseCallback = () => { }

const isTraversable = ( schema ) =>
  schema && typeof schema == 'object' && !Array.isArray( schema )

const isTraverseCallback = ( value ): value is TraverseCallback =>
  typeof value === 'function'

const escapeJsonPtr = ( str: string ) =>
  str.replace( /~/g, '~0' ).replace( /\//g, '~1' )

export = traverse
