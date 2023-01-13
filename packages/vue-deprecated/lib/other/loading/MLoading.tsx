/**
 * @description
 * @author 阿怪
 * @date 2022/8/25 11:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent, h, onUnmounted, ref, TransitionGroup } from 'vue';
import { props } from './api';
import { deepClone } from '../../dependents/_utils/tools';

const baseTypeList = ['shua1', 'shua2', 'shua3', 'shua4'];
// const baseTimout = 100;
const baseTimout = 100;

export default defineComponent({
  name: 'MLoading',
  props,
  setup(props) {
    let popList = deepClone(baseTypeList);
    const loadingList = ref(['shua1']);
    let timer: number | undefined;

    const domRef = ref<Element | null>(null);

    const changeList = () => {
      // 检查是否存在
      if (domRef.value?.parentElement === null) {
        return;
      }
      loadingList.value.push(popList.splice(Math.floor(Math.random() * popList.length), 1)[0]);
      setTimeout(() => loadingList.value.splice(0, 1), baseTimout);
      if (popList.length === 0) {
        popList = deepClone(baseTypeList.filter(item => !loadingList.value.includes(item)));
      }

      timer = setTimeout(changeList, props.speed * Math.random() + baseTimout);
    };
    changeList();

    onUnmounted(() => {
      clearInterval(timer);
    });
    const fixedSideLength = computed(() =>
      typeof props.sideLength === 'number' ? `${props.sideLength}px` : props.sideLength
    );
    const itemSize = { height: fixedSideLength.value, width: fixedSideLength.value };

    const baseProps = { class: ['m-loading', { 'm-loading-mask': props.mask }], style: itemSize, ref: domRef };
    const transitionProps = { class: 'm-loading-wrapper', name: 'm-loading-list', tag: 'div' };

    return () => {
      return h('div', baseProps,
        h(TransitionGroup, transitionProps,
          () => loadingList.value
            .map(item => h('div', {
              key: item,
              class: `m-loading-item m-loading-${item}`,
              style: itemSize
            }))));
    }
  }
});
