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
import { RefRecord } from '../../../types/common/hook';

const style = await import('./popover.pcss');
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

const unref = (value: any) => (value && (value.value || value.current)) || value;


export function usePopover(children?: {
  trigger?: MNodeTemplate,
  content?: MNodeTemplate
}) {

  let isInit = false;

  const handleClick = (e: MouseEvent, ref: RefRecord) => {

    const slot = unref(ref.popoverRef);
    const content = unref(ref.contentRef);
    if (!isInit) {
      isInit = true;
      if (!slot || !content) {
        console.error('slot or content is undefined', slot, content);
        return;
      }
      usePopper(slot, content);
    }

    if (content.hasAttribute('show')) {
      content.removeAttribute('show');
    } else {
      content.setAttribute('show', 'true');
    }
  };

  const getTrigger = () => {
    return children && children.trigger ? children.trigger : <slot/>;
  };
  const getContent = () => {
    return children && children.content ? children.content : <slot name="content"/>;
  };


  const getTemplate = (options: { ref: RefRecord }) => {
    return <div class="m-popover">
      <div class="m-popover-default-wrapper"
           ref={options.ref.popoverRef}
           onClick={(e: MouseEvent) => handleClick(e, options.ref)}>
        {getTrigger()}
      </div>
      <div class="m-popover-content" ref={options.ref.contentRef}>
        {getContent()}
      </div>
    </div> as MNodeTemplate;
  };


  return {
    options: { props: popoverProps, style },
    getTemplate
  };
}
