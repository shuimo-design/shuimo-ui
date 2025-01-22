/**
 * @description
 * @author 阿怪
 * @date 2025/1/22 11:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api.ts';
import { loadingOptions, useLoading } from './useLoading.tsx';

export { createDirective } from './createDirective.ts';

export const LoadingCore = {
  props,
  loadingOptions,
  useLoading,
};
