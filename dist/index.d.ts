import { TraverseCallback, TraverseLegacyOptions, TraverseOptions } from './types';
declare function traverse(schema: any, callback: TraverseCallback): any;
declare namespace traverse {
    var keywords: {
        additionalItems: boolean;
        items: boolean;
        contains: boolean;
        additionalProperties: boolean;
        propertyNames: boolean;
        not: boolean;
    };
    var arrayKeywords: {
        items: boolean;
        allOf: boolean;
        anyOf: boolean;
        oneOf: boolean;
    };
    var propsKeywords: {
        definitions: boolean;
        properties: boolean;
        patternProperties: boolean;
        dependencies: boolean;
    };
    var skipKeywords: {
        default: boolean;
        enum: boolean;
        const: boolean;
        required: boolean;
        maximum: boolean;
        minimum: boolean;
        exclusiveMaximum: boolean;
        exclusiveMinimum: boolean;
        multipleOf: boolean;
        maxLength: boolean;
        minLength: boolean;
        pattern: boolean;
        format: boolean;
        maxItems: boolean;
        minItems: boolean;
        uniqueItems: boolean;
        maxProperties: boolean;
        minProperties: boolean;
    };
}
declare function traverse(schema: any, options: TraverseLegacyOptions, callback: TraverseCallback): any;
declare namespace traverse {
    var keywords: {
        additionalItems: boolean;
        items: boolean;
        contains: boolean;
        additionalProperties: boolean;
        propertyNames: boolean;
        not: boolean;
    };
    var arrayKeywords: {
        items: boolean;
        allOf: boolean;
        anyOf: boolean;
        oneOf: boolean;
    };
    var propsKeywords: {
        definitions: boolean;
        properties: boolean;
        patternProperties: boolean;
        dependencies: boolean;
    };
    var skipKeywords: {
        default: boolean;
        enum: boolean;
        const: boolean;
        required: boolean;
        maximum: boolean;
        minimum: boolean;
        exclusiveMaximum: boolean;
        exclusiveMinimum: boolean;
        multipleOf: boolean;
        maxLength: boolean;
        minLength: boolean;
        pattern: boolean;
        format: boolean;
        maxItems: boolean;
        minItems: boolean;
        uniqueItems: boolean;
        maxProperties: boolean;
        minProperties: boolean;
    };
}
declare function traverse(schema: any, options: TraverseOptions): any;
declare namespace traverse {
    var keywords: {
        additionalItems: boolean;
        items: boolean;
        contains: boolean;
        additionalProperties: boolean;
        propertyNames: boolean;
        not: boolean;
    };
    var arrayKeywords: {
        items: boolean;
        allOf: boolean;
        anyOf: boolean;
        oneOf: boolean;
    };
    var propsKeywords: {
        definitions: boolean;
        properties: boolean;
        patternProperties: boolean;
        dependencies: boolean;
    };
    var skipKeywords: {
        default: boolean;
        enum: boolean;
        const: boolean;
        required: boolean;
        maximum: boolean;
        minimum: boolean;
        exclusiveMaximum: boolean;
        exclusiveMinimum: boolean;
        multipleOf: boolean;
        maxLength: boolean;
        minLength: boolean;
        pattern: boolean;
        format: boolean;
        maxItems: boolean;
        minItems: boolean;
        uniqueItems: boolean;
        maxProperties: boolean;
        minProperties: boolean;
    };
}
export = traverse;
