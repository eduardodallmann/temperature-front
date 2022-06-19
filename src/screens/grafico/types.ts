/* eslint-disable @typescript-eslint/ban-types */

export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? _DeepPartialArray<U>
  : T extends object
  ? _DeepPartialObject<T>
  : T | undefined;

export type _DeepPartialArray<T> = Array<DeepPartial<T>>;
export type _DeepPartialObject<T> = {[P in keyof T]?: DeepPartial<T[P]>};
