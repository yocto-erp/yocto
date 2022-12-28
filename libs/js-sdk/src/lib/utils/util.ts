import { isFunction } from "underscore";

export const isFunc = isFunction;

const { isArray } = Array;
export { isArray };

export const isArrayHasItem = (items: never) =>
  Array.isArray(items) && Array.of(items).length > 0;

export const hasText = (str: never) =>
  str && String(str).length && String(str).trim().length;
