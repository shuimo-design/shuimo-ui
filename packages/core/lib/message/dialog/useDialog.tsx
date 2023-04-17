/**
 * @description core dialog hook
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ICoreHookFunc, MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { DialogProps } from './index';

const style = await import('./dialog.pcss');
export const dialogProps: MCOPO<DialogProps> = {
  mask: { type: Object, default: { show: true, clickClose: true } },
  visible: { type: Boolean, default: false },
  closeBtn: { type: Boolean, default: true }
};

type IDialogHook = ICoreHookFunc<DialogProps, any>;

export function useDialog(values?: {
  // children?: { active?: MNodeTemplate },
  children?: any,
  props?: { visible: { value: boolean } },
  events?: { // for vue... first mission is make it run.. TODO: fix it
    handleClick: () => void,
    closeDialog: () => void
  }
}) {


  const handleClick = (e: MouseEvent, events: any) => {
    values?.events?.handleClick();
    events.onClick?.(e);
  };

  const closeDialog = (e: MouseEvent, events: any) => {
    values?.events?.closeDialog();
    events.onCloseDialog?.(e);
  };

  const getTemplate: IDialogHook['getTemplate'] = options => {
    const { props, events } = useDefaultOptions(options!, { props: dialogProps });

    const dialogClose = <div onClick={(e: MouseEvent) => closeDialog(e, events)}
                             class="m-dialog-close-btn m-cursor-pointer"/>;

    const getActiveSlot = () => {
      return values?.children?.active ?? <slot name="active"/>;
    };

    const dialog = <div class={['m-dialog-mask', props.mask.show ? 'm-dialog-mask-bg' : ''].join(' ')}>
      <div class="m-dialog">
        {dialogClose}
        <slot/>
      </div>
    </div>;

    const active = <div class="m-dialog-active"
                        onClick={(e: MouseEvent) => handleClick(e, events)}>
      {getActiveSlot()}
    </div>;

    console.log('render', props.visible || values?.props?.visible.value ? dialog : null);
    return <div class="m-dialog-wrapper">
      {active}
      {(() => props.visible || values?.props?.visible.value ? dialog : null)()}
    </div> as MNodeTemplate;
  };

  return {
    options: {
      props: dialogProps,
      style
    },
    getTemplate
  };
}

