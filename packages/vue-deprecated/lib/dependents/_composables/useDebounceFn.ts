/**
 * @description 防抖hook
 * @author youus
 * @date 2022/8/19 23:47
 * @version v1.0.0
 *
 * Hello, humor
 */
import { createFilterWrapper, debounceFilter } from '../_utils/filters';
import type { DebounceFilterOptions, FunctionArgs } from '../_utils/filters';
import type { MaybeComputedRef } from '../_utils/types';

/**
 * Debounce execution of a function.
 *
 * @see https://vueuse.org/useDebounceFn
 * @param  fn          A function to be executed after delay milliseconds debounced.
 * @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  opts        options
 *
 * @return A new, debounce, function.
 */
export default function useDebounceFn<T extends FunctionArgs>(fn: T, ms: MaybeComputedRef<number> = 200, options: DebounceFilterOptions = {}): T {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn,
  )
}
