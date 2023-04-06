/**
 * @description iframe parent ref
 * @author 阿怪
 * @date 2023/4/6 17:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { Ref, ref, UnwrapRef } from 'vue';


export class PRefImpl<T> {

  _ref: Ref<UnwrapRef<T>>;
  name: string;
  iframe?: HTMLIFrameElement;

  constructor(name: string, value: T) {
    this._ref = ref<T>(value);
    this.name = name;
  }

  setIframe() {
    const iframe = document.querySelector('iframe')!;
    if (iframe) {
      this.iframe = iframe;
      return true;
    }
  }

  postMessage(message: any) {
    if (!this.iframe) {
      if (!this.setIframe()) {
        console.warn('iframe is undefined!');
        return;
      }
      if (!this.iframe!.contentWindow) {
        console.warn('can not found contentWindow!');
        return;
      }
    }
    this.iframe!.contentWindow!.postMessage(message, '*');
  }

  get value() {
    return this._ref.value;
  }

  set value(value) {
    this._ref.value = value;
    this.postMessage({ name: this.name, value });
  }
}

export const PRef = <T>(name: string, value: T) => new PRefImpl<T>(name, value);
