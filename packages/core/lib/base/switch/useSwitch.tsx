/**
 * @description core switch hook
 * @author 阿怪
 * @date 2023/1/31 23:49
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import { SwitchEvents, SwitchProps } from './index';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';

const style = await import('./switch.pcss');
export const switchProps: MCOPO<SwitchProps> = {
  value: { type: undefined, required: true },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  activeInfo: { type: String, default: '' },
  inactiveInfo: { type: String, default: '' },
  activeValue: { type: undefined, default: undefined },
  inactiveValue: { type: undefined, default: undefined },
  onControl: { type: Boolean, default: false }
};


export function useSwitch() {
  const clickHandler = (e: MouseEvent, props: SwitchProps, events: SwitchEvents) => {
    if (props.disabled || props.loading) {
      e.preventDefault();
      return;
    }
    events.onClick?.(e);
  };


  const getTemplate = (options?: { props: SwitchProps, events: SwitchEvents }) => {
    const { props, events } = useDefaultOptions(options!, { props: switchProps });
    return <div class={[
      'm-switch',
      // isActive.value ? 'm-switch-active' : 'm-switch-inactive',
      props.value ? 'm-switch-active' : 'm-switch-inactive',
      props.loading ? 'm-switch-loading' : '',
      props.disabled ? 'm-switch-disabled' : ''
    ].join(' ')}>
      {/*activeInfo*/}
      <div class="m-switch-main">
        <div class="m-switch-core"
             onClick={(e: MouseEvent) => clickHandler(e, props, events)}>
          <div class="m-switch-core-border"></div>
        </div>
      </div>
      {/*inactiveInfo*/}
    </div> as MNodeTemplate;
  };


  return {
    options: {
      props: switchProps,
      style
    },
    getTemplate
  };
}
