/**
 * @Description pre next操作控制
 * @Author youus
 * @Date 2022/10/14 23:17
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { ButtonHTMLAttributes, Ref, ref } from 'vue';

export default function usePaginationAction(): [Ref<ButtonHTMLAttributes['disabled']>, Ref<ButtonHTMLAttributes['disabled']>, any] {
  const disPrev = ref(true);
  const disNext = ref(false);

  /**
   *
   * @param actionBooleanArr [prev, next]
   */
  const setDisAction = (actionBooleanArr = [true, false]) => {
    [disPrev.value, disNext.value] = actionBooleanArr
  }

  return [
    disPrev,
    disNext,
    setDisAction
  ]
}
