/**
 * @description
 * @author 阿怪
 * @date 2025/1/22 16:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Component, createApp, type Directive } from 'vue';

const getNumberFromPx = (px: string) => Number(px.replace('px', ''));

export const createDirective = (loadingComponent: Component)=>{

  const addLoadingElement = (el: any) => {
    const height = getComputedStyle(el)['height'] || '50px';
    const width = getComputedStyle(el)['height'] || '70px';
    const minSide = Math.min(getNumberFromPx(height), getNumberFromPx(width)) * 0.6;

    const loadingElement = createApp(loadingComponent, {
      class: 'm-loading-directive m-loading-mask',
      sideLength: minSide,
    }).mount(document.createElement('div'));
    el.classList?.add('m-loading-parent-relative');
    el.appendChild(loadingElement.$el);
  };

  const loadingDirective: Directive = {
    mounted(el, binding) {
      if (binding.value !== false) {
        addLoadingElement(el);
      }
    },
    updated(el, binding) {
      if (binding.value !== false) {
        if (el.querySelector('.m-loading-directive')) {
          return;
        }
        addLoadingElement(el);
      } else {
        el.querySelector('.m-loading-directive')?.remove();
        el.classList?.remove('m-loading-parent-relative');
      }
    },
  };

  return loadingDirective;
}
