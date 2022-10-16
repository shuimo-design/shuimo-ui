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
import { props } from "./api";
import usePaginationAction from "./usePaginationAction"
import useVModel from '../../dependents/_composables/useVModel';

export default defineComponent({
  name: 'MPagination',
  emits: ['change', 'update:modelValue', 'update:current'],
  props,
  setup(props, { emit }) {
    const [disPrev, disNext, setDisAction] = usePaginationAction();
    const { current, defaultCurrent, modelValue } = toRefs(props)
    const [innerCurrent, setInnerCurrent] = useVModel({
      value: current,
      modelValue,
      defaultValue: defaultCurrent.value,
      emit,
      onChange: (val) => {
        emit('update:current', val)
        emit('change', val)
      }
    })
    
    const pagers = computed(() => {
      const { total, pageSize } = props
      const pages = Math.ceil(total / pageSize);
      const arr = [];
      for (let i = 0; i < pages; i++) {
        arr.push(i + 1);
      }
      if (arr.length === 1 || !arr.length) {
        setDisAction([true, true])
      }
      return arr
    })
    
    const prevPage = () => {
      const newPage = pagers.value.includes(innerCurrent.value - 1)
        ? innerCurrent.value - 1
        : innerCurrent.value;
      setDisAction([newPage === 1, false])
      setInnerCurrent(newPage)
    }
    
    const nextPage = () => {
      const newPage = pagers.value.includes(innerCurrent.value + 1)
        ? innerCurrent.value + 1
        : innerCurrent.value;
      setDisAction([false, pagers.value.indexOf(newPage) === pagers.value.length - 1 ])
      setInnerCurrent(newPage)
    }
    
    const pageSelected = (event: any) => {
      const target = event.target;
      if (target.tagName === 'UL') {
        return;
      }
      if (pagers.value.length <= 1) {
        return;
      }
      const newPage = Number(target.textContent)
      setDisAction([newPage === 1, pagers.value.indexOf(newPage) === pagers.value.length - 1])
      setInnerCurrent(newPage)
    }
    
   
    return () => (
      <div class='m-pagination'>
        <button
          class={['m-cursor m-page-prev', {'m-page-prev-disabled': disPrev.value}]}
          onClick={prevPage}
          disabled={disPrev.value}
        />
        <ul onClick={pageSelected} class='pages'>
          {
            pagers.value.map(page => (
              <li class={['pager m-cursor', {'m-current-page': page === innerCurrent.value}]} key={page}>{page}</li>
            ))
          }
        </ul>
        <button
          class={['m-cursor m-page-next', {'m-page-next-disabled': disNext.value}]}
          onClick={nextPage}
          disabled={disNext.value}
        />
      </div>
    )
  }
})
