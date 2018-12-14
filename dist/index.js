"use strict";
function traverse(schema, optionsOrCallback, callback) {
    let pre = noop;
    let post = noop;
    let opts = defaultOptions;
    if (isTraverseCallback(optionsOrCallback)) {
        pre = optionsOrCallback;
    }
    else if (isTraverseCallback(callback)) {
        pre = callback;
        opts = Object.assign({}, opts, optionsOrCallback);
    }
    else {
        const { cb } = optionsOrCallback;
        if (isTraverseCallback(cb)) {
            pre = cb;
        }
        else {
            pre = cb.pre || noop;
            post = cb.post || noop;
        }
        opts = Object.assign({}, opts, optionsOrCallback);
    }
    _traverse(opts, pre, post, schema, '', schema);
}
const _traverse = (opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) => {
    if (!isTraversable(schema))
        return;
    const { keywords, arrayKeywords, propsKeywords, skipKeywords } = opts;
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
        const subschema = schema[key];
        if (Array.isArray(subschema)) {
            if (key in arrayKeywords) {
                for (var i = 0; i < subschema.length; i++) {
                    _traverse(opts, pre, post, subschema[i], `${jsonPtr}/${key}/${i}`, rootSchema, jsonPtr, key, schema, i);
                }
            }
        }
        else if (key in propsKeywords) {
            if (subschema && typeof subschema == 'object') {
                for (var prop in subschema) {
                    _traverse(opts, pre, post, subschema[prop], `${jsonPtr}/${key}/${escapeJsonPtr(prop)}`, rootSchema, jsonPtr, key, schema, prop);
                }
            }
        }
        else if (key in keywords ||
            (opts.allKeys && !(key in skipKeywords))) {
            _traverse(opts, pre, post, subschema, `${jsonPtr}/${key}`, rootSchema, jsonPtr, key, schema);
        }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
};
const noop = () => { };
const isTraversable = (schema) => schema && typeof schema == 'object' && !Array.isArray(schema);
const isTraverseCallback = (value) => typeof value === 'function';
const escapeJsonPtr = (str) => str.replace(/~/g, '~0').replace(/\//g, '~1');
const keywords = {
    additionalItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    propertyNames: true,
    not: true
};
const arrayKeywords = {
    items: true,
    allOf: true,
    anyOf: true,
    oneOf: true
};
const propsKeywords = {
    definitions: true,
    properties: true,
    patternProperties: true,
    dependencies: true
};
const skipKeywords = {
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
};
const defaultOptions = {
    cb: noop,
    allKeys: false,
    keywords, arrayKeywords, propsKeywords, skipKeywords
};
module.exports = traverse;
//# sourceMappingURL=index.js.map