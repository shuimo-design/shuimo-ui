/**
 * @description iframe parent hook
 * @author 阿怪
 * @date 2023/4/6 17:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PRef } from './PRef';


export default function useIframeParent() {

  let iframe: HTMLIFrameElement | null = null;

  const windowMessageEvent = (e: MessageEvent) => {

    if (!iframe) {
      iframe = document.querySelector('iframe')!;
      if (!iframe) return;
    }
    if (e.source !== iframe.contentWindow) return;

    const { data } = e;
    if (data === 'init') {
      iframe.contentWindow!.postMessage({
        type: 'init',
        value: JSON.stringify(map2Obj())
      }, '*');
    }
  };

  window.removeEventListener('message', windowMessageEvent);
  window.addEventListener('message', windowMessageEvent);

  const PRefMap = new Map<string, ReturnType<typeof PRef>>();
  const map2Obj = ()=>{
    const obj:Record<string, any> = {};
    PRefMap.forEach((v,k)=>{
      obj[k] = v.value;
    });
    return obj;
  }

  const register = <T = any>(name: string, value: T) => {
    const pref = PRef<T>(name, value);
    PRefMap.set(name, pref);
    return pref;
  };

  return {
    register
  };

}
