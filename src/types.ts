export type TraverseCallback = (
  schema: any, jsonPtr: string, rootSchema: any, parentJsonPtr?: string,
  parentKeyword?: string, parentSchema?: any,
  keyIndex?: string | number
) => void

export interface TraversePrePost {
  pre?: TraverseCallback
  post?: TraverseCallback
}

export interface TraverseLegacyOptions {
  allKeys?: boolean
}

export interface TraverseOptions extends TraverseLegacyOptions {
  cb: TraverseCallback | TraversePrePost
}
