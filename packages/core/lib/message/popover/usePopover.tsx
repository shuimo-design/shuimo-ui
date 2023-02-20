/**
 * @description core usePopover hook
 * @author 阿怪
 * @date 2023/1/29 10:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate, MPropType } from '@shuimo-design/types';
import { PopoverProps } from './index';
import { Placement, usePopper } from '../../../composition';
import style from './popover.pcss';

export const popoverProps: MCOPO<PopoverProps> = {
  placement: {
    type: String as MPropType<Placement>,
    default: 'bottom'
    // validator: (value: string) =>
    //   [
    //     'auto',
    //     'auto-start',
    //     'auto-end',
    //     'top',
    //     'top-start',
    //     'top-end',
    //     'bottom',
    //     'bottom-start',
    //     'bottom-end',
    //     'right',
    //     'right-start',
    //     'right-end',
    //     'left',
    //     'left-start',
    //     'left-end'
    //   ].includes(value)
  },
  disableClickAway: { type: Boolean, default: false },
  offsetSkid: { type: String, default: '0' },
  offsetDistance: { type: String, default: '0' },
  hover: { type: Boolean, default: false },
  show: { type: Boolean, default: null },
  disabled: { type: Boolean, default: false },
  openDelay: { type: Number, default: 0 },
  closeDelay: { type: Number, default: 0 },
  interactive: { type: Boolean, default: true },
  locked: { type: Boolean, default: false },
  content: { type: String, default: '' }
};

export function usePopover() {


  const renderHook = (ref: Record<string, { value: HTMLElement | undefined }>) => {
    const slot = ref.popoverRef.value;
    const content = ref.contentRef.value;
    if (!slot || !content) {
      console.error('slot or content is undefined', slot, content);
      return;
    }
    usePopper(slot, content);
  };

  const handleClick = (e: MouseEvent, options: any) => {
    const ref = options.ref.popoverRef.value;
    if (ref.hasAttribute('show')) {
      ref.removeAttribute('show');
    } else {
      ref.setAttribute('show', 'true');
    }
  };


  const getTemplate = (options: {
    ref: Record<string, { value: HTMLElement | undefined }>;
  }) => {
    return <div class="m-popover" ref={options.ref.popoverRef}>
      <div class="m-popover-default-wrapper"
           onClick={(e: MouseEvent) => handleClick(e, options)}>
        <slot/>
      </div>
      <div class="m-popover-content" ref={options.ref.contentRef}>
        <slot name="content"/>
      </div>
    </div> as MNodeTemplate;
  };


  return {
    options: { props: popoverProps, style },
    getTemplate,
    renderHook
  };
}
