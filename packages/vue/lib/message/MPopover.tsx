/**
 * @description MPopover
 * @author youus
 * @date 2022/4/3 18:07
 * @version v2.0.0-process
 *
 * Hello, humor
 * v2.0.0-process 阿怪 准备重构，搭建模版
 */
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { PopoverImpl, usePopover } from '@shuimo-design/core/lib/message/popover/usePopover';
import { props } from '@shuimo-design/core/lib/message/popover/api';
import useTeleport from '../../composition/useTeleport';


export default defineComponent({
  name: 'MPopover',
  props,
  emits: ['open:popper', 'close:popper', 'update:show'],
  setup(props, { slots, emit, expose }) {
    //
    // if (!slots.content) {
    //   console.error('MPopover: content is required');
    //   return;
    // }
    //
    // if (!slots.default) {
    //   console.error('MPopover: trigger is required');
    //   return;
    // }

    const popoverRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const popperInstance = ref<PopoverImpl>();

    const style = ref();
    const {
      createPopover,
      getContent,
      lifecycle
    } = usePopover({ style, props });

    const show = async () => {
      await popperInstance.value?.show();
    };
    const hide = () => {
      popperInstance.value?.hide();
    };

    expose({ show, hide });


    const handleClick = async () => {
      await popperInstance.value?.toggle();
    };

    onMounted(() => {
      popperInstance.value = createPopover(popoverRef.value, contentRef.value, {
        ...props.popper,
        placement: props.placement
      });
      lifecycle.onMountedEvents.forEach((fn) => fn());
    });
    onBeforeUnmount(() => {
      // todo check it
      lifecycle.onBeforeDestroyEvents.forEach((fn) => fn());
    });


    return () => {
      const content = slots.content();

      return <div class="m-popover">
        <div class="m-popover-default-wrapper"
             ref={popoverRef}
             onClick={handleClick}>
          {slots.default()}
        </div>
        <div class="m-popover-content" ref={contentRef} style={style.value}>
          {getContent(props, content, useTeleport)}
        </div>
      </div>;
    };
  }
});
