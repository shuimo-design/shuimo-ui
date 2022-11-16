/**
 * @description filter test
 * @author youus
 * @date 2022/8/20 00:31
 * @version v1.0.0
 *
 * Hello, humor
 */

import { ref } from 'vue';
import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { createFilterWrapper, debounceFilter, throttleFilter } from '../../lib/dependents/_utils/filters';

describe('filters', () => {
  beforeEach(() => {
    vitest.useFakeTimers();
  });

  it('should debounce', () => {
    const debouncedFilterSpy = vitest.fn();
    const filter = createFilterWrapper(debounceFilter(1000), debouncedFilterSpy);

    setTimeout(filter, 200);
    vitest.runAllTimers();

    setTimeout(filter, 500);
    vitest.advanceTimersByTime(500);
    expect(debouncedFilterSpy).toHaveBeenCalledOnce();
  });

  it('should debounce twice', () => {
    const debouncedFilterSpy = vitest.fn();
    const filter = createFilterWrapper(debounceFilter(500), debouncedFilterSpy);

    setTimeout(filter, 500);
    vitest.advanceTimersByTime(500);
    setTimeout(filter, 1000);
    vitest.advanceTimersByTime(2000);

    expect(debouncedFilterSpy).toHaveBeenCalledTimes(2);
  });

  it('should debounce with ref', () => {
    const debouncedFilterSpy = vitest.fn();
    const debounceTime = ref(0);
    const filter = createFilterWrapper(debounceFilter(debounceTime), debouncedFilterSpy);

    filter();
    debounceTime.value = 500;
    filter();
    setTimeout(filter, 200);

    vitest.runAllTimers();

    expect(debouncedFilterSpy).toHaveBeenCalledTimes(2);
  });

  it('should throttle', () => {
    const debouncedFilterSpy = vitest.fn();
    const filter = createFilterWrapper(throttleFilter(1000), debouncedFilterSpy);

    setTimeout(filter, 500);
    setTimeout(filter, 500);
    setTimeout(filter, 500);
    setTimeout(filter, 500);

    vitest.runAllTimers();

    expect(debouncedFilterSpy).toHaveBeenCalledTimes(2);
  });

  it('should throttle with ref', () => {
    const debouncedFilterSpy = vitest.fn();
    const throttle = ref(0);
    const filter = createFilterWrapper(throttleFilter(throttle), debouncedFilterSpy);

    filter();
    throttle.value = 1000;

    setTimeout(filter, 300);
    setTimeout(filter, 600);
    setTimeout(filter, 900);

    vitest.runAllTimers();

    expect(debouncedFilterSpy).toHaveBeenCalledTimes(2);
  });

  it('should not duplicate single event', () => {
    const debouncedFilterSpy = vitest.fn();
    const filter = createFilterWrapper(throttleFilter(1000), debouncedFilterSpy);

    setTimeout(filter, 500);

    vitest.runAllTimers();

    expect(debouncedFilterSpy).toHaveBeenCalledTimes(1);
  });
});
