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


  const content: MNodeTemplate = <div m-name="div" class="m-popover-content">
    <slot m-name="content"/>
  </div>;

  const slot: MNodeTemplate = <slot/>;


  const template: MNodeTemplate = <div class="m-popover">
    {slot}
    {content}
  </div>;

  // template.props!.onClick = () => {
  // todo 得想个办法触发绘制，更优雅一点
  // };

  const initProps = (_props: PopoverProps, _events: any) => {
    if (!template.props || !content.props) {return;}

    if (_props.show !== undefined && _props.show !== null) {
      content.props.show = _props.show;
    }
    if (slot.props) {
      slot.props.onClick = _events.onClick;
    }
  };

  // todo 移除SVGElement
  const renderHook = (ref: Map<string, HTMLElement | SVGElement>) => {
    const base = ref.get('m-popover');
    if (!base) {return;}
    let slot: HTMLElement | undefined, content: HTMLElement | undefined;
    base.childNodes.forEach(node => {
      if (node instanceof HTMLSlotElement) {
        slot = node.assignedElements()[0] as HTMLElement;
      } else {
        content = node as HTMLElement;
      }
    });
    if (!slot || !content) {return;}
    usePopper(slot, content);
  };


  return {
    options: { template, props: popoverProps, style },
    initProps,
    renderHook
  };
}
