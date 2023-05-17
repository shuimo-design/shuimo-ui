/**
 * @Description: 参数管理hook
 * @Author: 阿怪
 * @Date: 2022/10/13 01:41
 * @Version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 */
import { ref, watch } from 'vue';
import { deepClone } from '@shuimo-design/tools/index';

export default function useModelValue<T, K>(initialData: () => T, config?: {
  watch?: boolean,
  getValue?: (data: T) => K
}) {

  const getValue = (data: T) => {
    if (config?.getValue) {
      return config.getValue(data);
    }
    return deepClone(initialData());
  };
  const value = initialData();
  const modelValue = ref<T>(getValue(value));

  if (config?.watch !== false) {
    watch(initialData, (newVal) => {
      modelValue.value = getValue ? getValue(newVal) : newVal;
    });
  }


  return { modelValue };
}
