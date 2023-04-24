/**
 * @description MPopover
 * @author youus
 * @date 2022/4/3 18:07
 * @version v2.0.0-process
 *
 * Hello, humor
 * v2.0.0-process 阿怪 准备重构，搭建模版
 * todo support hover and props
 */

import { defineComponent, ref, onMounted } from 'vue';
import { usePopover } from '@shuimo-design/core/lib/message/popover/usePopover';


export default defineComponent({
  name: 'MPopover',
  // props,
  emits: ['open:popper', 'close:popper', 'update:show'],
  setup(props, { slots, emit }) {

    if (!slots.content) {
      console.error('MPopover: content is required');
      return;
    }

    if (!slots.default) {
      console.error('MPopover: trigger is required');
      return;
    }


    const popoverRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const { init, trigger } = usePopover();
    const handleClick = () => {
      trigger();
    };

    onMounted(() => {
      init(popoverRef.value, contentRef.value);
    });


    return () => {
      return <div class="m-popover">
        <div class="m-popover-default-wrapper"
             ref={popoverRef}
             onClick={handleClick}>
          {slots.default()}
        </div>
        <div class="m-popover-content" ref={contentRef}>
          {slots.content()}
        </div>
      </div>;
    };
  }
});
