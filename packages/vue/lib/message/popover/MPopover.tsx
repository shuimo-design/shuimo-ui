/**
 * @description MPopover
 * @author youus
 * @date 2022/4/3 18:07
 * @version v2.0.0-process
 *
 * Hello, humor
 * v2.0.0-process 阿怪 准备重构，搭建模版
 */

import { defineComponent, ref, onMounted } from 'vue';
import { usePopover } from '@shuimo-design/core';
import { cr } from '../../../tools/coreRender';

export default defineComponent({
  name: 'MPopover',
  // props:,
  emits: ['open:popper', 'close:popper', 'update:show'],
  setup(props, { slots, emit }) {
    const { getTemplate, renderHook } = usePopover();

    const popoverRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();

    onMounted(() => {
      renderHook({ popoverRef, contentRef });
    });

    return () => {
      const res =  cr(getTemplate({
        ref: { popoverRef, contentRef },
      }),{slots});
      console.log(res);
      return res;
    };
  }
});
