/**
 * @description: 元素事件监听管理
 * @author: 南歌子
 * @date 2021/02/22 17:04
 * @version V1.0.0
 *
 * Hello, humor
 */

import {on, off, addClass, removeClass} from './dom';
import { reactive, ref } from 'vue';

export interface DomConfigs {
  reference: any,
  popper: any,
  trigger: string,
  openDelay: number,
  closeDelay: number
}

export default function domEventHandler() {
  const tooltipVisible = ref(false);
  const trigger = ref('');
  const openDelay = ref(0);
  const closeDelay = ref(200);
  const _timer = reactive(Object.create(null));
  const popper = reactive(Object.create(null));
  const reference = reactive(Object.create(null));
  const referenceStyle = reactive(Object.create(null));
  tooltipVisible.value = false;

  const getStyle = (selectStyle: CSSStyleDeclaration, type: any) => {
    const num = Number(selectStyle[type].replace('px', ''));
    return isNaN(num) ? 0 : num;
  };

  const setStyle = () => {
    const rStyle = window.getComputedStyle(reference.value);
    referenceStyle.offsetLeft = reference.value.getBoundingClientRect().left + window.pageXOffset;
    referenceStyle.offsetTop = reference.value.getBoundingClientRect().top + window.pageYOffset;
    referenceStyle.height = getStyle(rStyle, 'height');
    referenceStyle.width = getStyle(rStyle, 'width');
  };

  const handleFocus = () => {
    addClass(popper, 'focusing');
    if (trigger.value === 'click' || trigger.value === 'focus') {
      tooltipVisible.value = true;
      setStyle();
    }
  };

  const handleBlur = () => {
    removeClass(popper, 'focusing');
    if (trigger.value === 'click' || trigger.value === 'focus') tooltipVisible.value = false;
  };

  const doClose = () => {
    tooltipVisible.value = false;
  };

  const handleMouseEnter = () => {
    clearTimeout(_timer.value);
    if (openDelay.value) {
      _timer.value = setTimeout(() => {
        tooltipVisible.value = true;
        setStyle();
      }, openDelay.value);
    } else {
      tooltipVisible.value = true;
      setStyle();
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(_timer.value);
    if (closeDelay.value) {
      _timer.value = setTimeout(() => {
        tooltipVisible.value = false;
      }, closeDelay.value);
    } else {
      tooltipVisible.value = false;
    }
  };

  const doShow = () => {
    tooltipVisible.value = true;
    setStyle();
  };

  const cleanup = (openDelay: any, closeDelay: any) => {
    if (openDelay || closeDelay) {
      clearTimeout(_timer.value);
    }
  };

  const onController = (configs: DomConfigs) => {
    popper.value = configs.popper;
    reference.value = configs.reference;
    trigger.value = configs.trigger;
    openDelay.value = configs.openDelay;
    closeDelay.value = configs.closeDelay;
    if (configs.reference) {
      on(configs.reference, 'focusin', handleFocus);
      on(configs.popper, 'focusin', handleFocus);
      on(configs.reference, 'focusout', handleBlur);
      on(configs.popper, 'focusout', handleBlur);
    }
    if (configs.trigger === 'hover') {
      on(configs.reference, 'mouseenter', handleMouseEnter);
      on(configs.popper, 'mouseenter', handleMouseEnter);
      on(configs.reference, 'mouseleave', handleMouseLeave);
      on(configs.popper, 'mouseleave', handleMouseLeave);
    } else if (configs.trigger === 'focus') {
      on(configs.reference, 'mousedown', doShow);
      on(configs.reference, 'mouseup', doClose);
    }
  }

  const offController = (configs: DomConfigs) => {
    cleanup(configs.openDelay, configs.closeDelay);

    off(configs.reference, 'focusin', doShow);
    off(configs.reference, 'focusout', doClose);
    off(configs.reference, 'mousedown', doShow);
    off(configs.reference, 'mouseup', doClose);
    off(configs.reference, 'mouseleave', handleMouseLeave);
    off(configs.reference, 'mouseenter', handleMouseEnter);
  }

  return {
    onController,
    offController,
    tooltipVisible,
    referenceStyle
  }
}
