/**
 * @Description 分页组件
 * @Author youus
 * @Date 2022/10/15 12:34
 * @Version v1.0.0
 *
 * Hello, humor
 * todo
 * 1. 页数选择
 * 2. 多页省略、多页跳转
 */

import { defineComponent, computed, toRefs } from 'vue';
import { props } from './api';
import usePaginationAction from './usePaginationAction';
import useMoreAction from './useMoreAction';
import useVModel from '../../dependents/_composables/useVModel';

const MIN = 1;

export default defineComponent({
  name: 'MPagination',
  emits: ['change', 'update:modelValue', 'update:current'],
  props,
  setup(props, { emit }) {
    const [disPrev, disNext, setDisAction] = usePaginationAction();
    const { current, defaultCurrent, modelValue } = toRefs(props);
    const [innerCurrent, setInnerCurrent] = useVModel({
      value: current,
      modelValue,
      defaultValue: defaultCurrent.value,
      emit,
      onChange: val => {
        emit('update:current', val);
        emit('change', val);
      }
    });

    const pageCount = computed(() => {
      const c: number = Math.ceil(props.total / props.pageSize);
      return c > 0 ? c : 1;
    });

    const {
      curPageLeftCount,
      curPageRightCount,
      isPrevMoreShow,
      isNextMoreShow
    } = useMoreAction(props, pageCount, innerCurrent)

    const isFolded = computed(() => pageCount.value > props.maxPageBtn);

    const pagers = computed(() => {
      let start;
      let end;
      const arr = [];

      if (isFolded.value) {
        if (isPrevMoreShow.value && isNextMoreShow.value) {
          start = innerCurrent.value - curPageLeftCount.value;
          end = innerCurrent.value + curPageRightCount.value;
        } else {
          const foldedStart =  2;
          const foldedEnd = pageCount.value - 1;
          start = isPrevMoreShow.value ? pageCount.value - props.foldedMaxPageBtn + 1 : foldedStart;
          end = isPrevMoreShow.value ? foldedEnd : props.foldedMaxPageBtn;
        }
      } else {
        start = 1;
        end = pageCount.value;
      }
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      if (arr.length === 1 || !arr.length) {
        setDisAction([true, true]);
      }
      return arr;
    });

    const toPage: (pageIndex: number, isTriggerChange?: boolean) => void = (pageIndex) => {
      let current = pageIndex;
      if (pageIndex < MIN) {
        current = MIN;
      } else if (pageIndex > pageCount.value) {
        current = pageCount.value;
      }
      if (innerCurrent.value !== current) {
        setDisAction([current === MIN, current === pageCount.value]);
        setInnerCurrent(current);
      }
    };

    const handlePageChange = (type: string) => {
      const pageChangeMap: Record<string, () => void> = {
        prevPage: () => toPage(innerCurrent.value - 1),
        nextPage: () => toPage(innerCurrent.value + 1),
        prevMorePage: () => toPage(innerCurrent.value - props.foldedMaxPageBtn),
        nextMorePage: () => toPage(innerCurrent.value + props.foldedMaxPageBtn),
      };

      pageChangeMap[type]();
    };

    return () => (
      <div class="m-pagination">
        <button
          class={['m-cursor-pointer m-page-prev', { 'm-page-prev-disabled': disPrev.value }]}
          onClick={() => handlePageChange('prevPage')}
          disabled={disPrev.value}
        />
        <ul class="m-pages">
          {isFolded.value ? (
            <li
              class={['m-pager m-cursor-pointer', { 'm-current-page': MIN === innerCurrent.value }]}
              onClick={() => toPage(MIN)}
            >
              {MIN}
            </li>
          ) : null}
          {isFolded.value && isPrevMoreShow.value ? (
            <li
              class={['m-pager m-cursor-pointer m-pager_more']}
              onClick={() => handlePageChange('prevMorePage')}
            >
              ···
            </li>
          ) : null}
          {pagers.value.map(page => (
            <li
              class={['m-pager m-cursor-pointer', { 'm-current-page': page === innerCurrent.value }]}
              onClick={() => toPage(page)}
            >
              {page}
            </li>
          ))}
          {isFolded.value && isNextMoreShow.value ? (
            <li
              class={['m-pager m-cursor-pointer m-pager_more']}
              onClick={() => handlePageChange('nextMorePage')}
            >
              ···
            </li>
          ) : null}
          {isFolded.value ? (
            <li
              class={['m-pager m-cursor-pointer', { 'm-current-page': pageCount.value === innerCurrent.value }]}
              onClick={() => toPage(pageCount.value)}
            >
              {pageCount.value}
            </li>
          ): null}
        </ul>
        <button
          class={['m-cursor-pointer m-page-next', { 'm-page-next-disabled': disNext.value }]}
          onClick={() => handlePageChange('nextPage')}
          disabled={disNext.value}
        />
      </div>
    );
  }
});
