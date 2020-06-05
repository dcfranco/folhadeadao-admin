// flow-typed signature: b7f84d695314698bee944b7ec955be45
// flow-typed version: c6154227d1/deepmerge_v1.x.x/flow_>=v0.104.x

type DeepMergeOptionsType = {
  arrayMerge?: (dest: Array<*>, source: Array<*>, options?: DeepMergeOptionsType) => Array<*>,
  clone?: boolean,
  ...
};

type DeepMergeObjects = {
  (a: Object, b: Object, options?: DeepMergeOptionsType): Object,
  all: (objects: Array<Object>, options?: DeepMergeOptionsType) => Object,
  ...
};

type DeepMergeArrays = {
  (a: Array<*>, b: Array<*>, options?: DeepMergeOptionsType): Array<*>,
  all: (objects: Array<Array<*>>, options?: DeepMergeOptionsType) => Array<*>,
  ...
};

declare module 'deepmerge' {
  declare module.exports: DeepMergeObjects & DeepMergeArrays;
}
