/**
 * @description MPopover
 * @author youus
 * @date 2022/4/3 18:07
 * @version v2.0.0-process
 *
 * Hello, humor
 * v2.0.0-process 阿怪 准备重构，搭建模版
 */
import { defineComponent, ref, watch } from 'vue';
import { props } from './api.ts';
import useTeleport from '../../../compositions/common/useTeleport.ts';
import { PopoverImpl, usePopover } from './usePopover.ts';


export default defineComponent((props, { slots, emit, expose }) => {

  if (!slots.content) {
    console.error('MPopover: content is required');
    return () => (<></>);
  }

  if (!slots.default) {
    console.error('MPopover: trigger is required');
    return () => (<></>);
  }


  const placementRef = ref(props.placement);
  const {
    getContent,
    popoverEnter,
    popoverLeave,
    popoverRef, contentRef, arrowRef,
    popperInstance,
    style, arrowStyle
  } = usePopover({
      props,
      value: { placement: placementRef }
    },
    {
      onShow: () => {
        emit('update:show', true);
      },
      onHide: () => {
        emit('update:show', false);
      }
    }
  );

  const show = async () => {
    await popperInstance.value?.show();
  };
  const hide = () => {
    popperInstance.value?.hide();
  };

  expose({ show, hide });

  watch(() => props.show, () => {
    if (props.show) {show();} else {hide();}
  });

  const handleClick = async () => {
    if (props.hover) {return;}
    await popperInstance.value?.toggle();
  };


  return () => {
    return <div class="m-popover" data-popper-placement={placementRef.value}
                onMouseleave={popoverLeave}>
      <div class="m-popover-default-wrapper"
           ref={popoverRef}
           onMouseenter={popoverEnter}
           onClick={handleClick}>
        {slots.default?.()}
      </div>
      <div class="m-popover-content" ref={contentRef} style={style.value}>
        {getContent(props, () => slots.content?.(), useTeleport)}
        {
          // todo when content not render arrow should not render
          slots.arrow ?
            <div class="m-popover-arrow" ref={arrowRef} style={arrowStyle.value}>{slots.arrow()}</div> : null
        }
      </div>
    </div>;
  };
}, {
  name: 'MPopover',
  props,
  emits: ['open:popper', 'close:popper', 'update:show']
});
