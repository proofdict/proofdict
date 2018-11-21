import { createSelectorCreator, defaultMemoize } from "reselect";
import { shallowEqual } from "shallow-equal-object";

/**
 * Create selector with shallow equality
 * @example
 * ```
 * createShallowEqualSelector(selector, result => result.value);
 * ```
 * Note:
 * selector should return memorize-able value
 * combiner should return state instance
 */
export const createShallowEqualSelector = createSelectorCreator(defaultMemoize, (a: any, b: any) => shallowEqual(a, b));
