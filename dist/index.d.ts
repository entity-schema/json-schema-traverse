import { TraverseCallback, TraverseLegacyOptions, TraverseOptions } from './types';
declare function traverse(schema: any, options: Partial<TraverseOptions>): any;
declare function traverse(schema: any, callback: TraverseCallback): any;
declare function traverse(schema: any, options: Partial<TraverseLegacyOptions>, callback: TraverseCallback): any;
export = traverse;
