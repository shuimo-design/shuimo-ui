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
  const popoverVisible = ref(false);
  const trigger = ref('');
  const openDelay = ref(0);
  const closeDelay = ref(200);
  let _timer = reactive(Object.create(null));
  let popper = reactive(Object.create(null));
  let reference = reactive(Object.create(null));
  const referenceStyle = reactive(Object.create(null));
  popoverVisible.value = false;

  const getStyle = (selectStyle: CSSStyleDeclaration, type: any) => {
    const num = Number(selectStyle[type].replace('px', ''));
    return isNaN(num) ? 0 : num;
  };

  const doToggle = () => {
    popoverVisible.value = !popoverVisible.value;
    setStyle();
  };

  const setStyle = () => {
    const rStyle = window.getComputedStyle(reference);
    referenceStyle.offsetLeft = reference.getBoundingClientRect().left + window.pageXOffset;
    referenceStyle.offsetTop = reference.getBoundingClientRect().top + window.pageYOffset;
    referenceStyle.height = getStyle(rStyle, 'height');
    referenceStyle.width = getStyle(rStyle, 'width');
  };

  const handleFocus = () => {
    addClass(popper, 'focusing');
    if (trigger.value === 'click' || trigger.value === 'focus') {
      popoverVisible.value = true;
      setStyle();
    }
  };

  const handleBlur = () => {
    removeClass(popper, 'focusing');
    if (trigger.value === 'click' || trigger.value === 'focus') popoverVisible.value = false;
  };

  const doClose = () => {
    popoverVisible.value = false;
  };

  const handleMouseEnter = () => {
    clearTimeout(_timer);
    if (openDelay.value) {
      _timer = setTimeout(() => {
        popoverVisible.value = true;
        setStyle();
      }, openDelay.value);
    } else {
      popoverVisible.value = true;
      setStyle();
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(_timer);
    if (closeDelay.value) {
      _timer = setTimeout(() => {
        popoverVisible.value = false;
      }, closeDelay.value);
    } else {
      popoverVisible.value = false;
    }
  };

  const doShow = () => {
    popoverVisible.value = true;
    setStyle();
  };

  const cleanup = (openDelay: any, closeDelay: any) => {
    if (openDelay || closeDelay) {
      clearTimeout(_timer);
    }
  };

  const handleDocumentClick = (e: any) => {
    if (!reference.value ||
        reference.value.contains(e.target) ||
        !popper ||
        popper.contains(e.target)) return;
    doClose();
  };

  const handleKeydown = (ev: any) => {
    if (ev.keyCode === 27 && trigger.value !== 'manual') { // esc
      doClose();
    }
  };

  const handleClick = () => {
    removeClass(reference, 'focusing');
  };

  const onController = (configs: DomConfigs) => {
    popper = configs.popper;
    reference = configs.reference;
    trigger.value = configs.trigger;
    openDelay.value = configs.openDelay;
    closeDelay.value = configs.closeDelay;
    if (configs.reference) {
      if (configs.trigger !== 'click') {
        on(configs.reference, 'focusin', handleFocus);
        on(configs.popper, 'focusin', handleFocus);
        on(configs.reference, 'focusout', handleBlur);
        on(configs.popper, 'focusout', handleBlur);
      }
      on(configs.reference, 'keydown', handleKeydown);
      on(configs.reference, 'click', handleClick);
    }
    if (configs.trigger === 'click') {
      on(configs.reference, 'click', doToggle);
      on(document, 'click', handleDocumentClick);
    } else if (configs.trigger === 'hover') {
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

    off(configs.reference, 'click', doToggle);
    off(configs.reference, 'focusin', doShow);
    off(configs.reference, 'focusout', doClose);
    off(configs.reference, 'mousedown', doShow);
    off(configs.reference, 'mouseup', doClose);
    off(configs.reference, 'mouseleave', handleMouseLeave);
    off(configs.reference, 'mouseenter', handleMouseEnter);
    off(document, 'click', handleDocumentClick);
  }

  return {
    onController,
    offController,
    popoverVisible,
    referenceStyle
  }
}
