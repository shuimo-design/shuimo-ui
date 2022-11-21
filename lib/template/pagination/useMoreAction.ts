/**
 * @Description
 * @Author youus
 * @Date 2022/11/20 23:07
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { computed, Ref } from 'vue';
import { PaginationProps } from './index';

export default function useMoreAction(props: PaginationProps, pageCount: Ref<number>, innerCurrent: Ref<number>) {
  // @ts-ignore
  const curPageLeftCount = computed(() => Math.ceil((props.foldedMaxPageBtn - 1) / 2));
  
  // @ts-ignore
  const curPageRightCount = computed(() => Math.ceil((props.foldedMaxPageBtn - 1) / 2));
  
  const isPrevMoreShow = computed(() => 2 + curPageLeftCount.value < innerCurrent.value);
  
  const isNextMoreShow = computed(() => pageCount.value - 1 - curPageRightCount.value > innerCurrent.value);
  
  return {
    curPageLeftCount,
    curPageRightCount,
    isPrevMoreShow,
    isNextMoreShow
  }
}
