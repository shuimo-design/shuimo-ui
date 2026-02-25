/**
 * @description progress hook
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed } from 'vue';
import { ProgressProps } from './props';

/**
 * @description 清除多余小数位，保留两位小数
 */
const clearZero = (num: number) => {
  const str = num.toString();
  const index = str.indexOf('.');
  if (index === -1) { return num; }
  return str.slice(0, index + 3);
};

export default function useProgress(props: Required<ProgressProps>) {
  const percentage = computed(() => clearZero((props.value * 100 / props.max)));

  return {
    percentage,
  };
}
