/**
 * @description
 * @author 阿怪
 * @date 2023/4/6 21:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Ref, ref,onMounted } from 'vue';

export default function useWindowEvent() {

  const windowMessageEvent = (e: MessageEvent) => {
    const { data } = e;
    const { type, name, value } = data;
    if (type === 'init') {
      initMap(value);
      return;
    }
    const ref = parentRefMap.get(name);
    if (ref) {
      ref.value = value;
    } else {
      console.warn(`can not found ref: ${name}`);
    }
  };

  window.removeEventListener('message', windowMessageEvent);
  window.addEventListener('message', windowMessageEvent);

  let parentRefMap = new Map<string, Ref>();

  const initMap = (objStr: string) => {
    const obj = JSON.parse(objStr);
    Object.entries(obj).forEach(k => {
      const [name, value] = k;
      if (parentRefMap.has(name)) {

        parentRefMap.get(name)!.value = value;
      } else {
        parentRefMap.set(name, ref(value));
      }
    });
  };

  const init = () => {
    window.parent.postMessage('init', '*');
  };


  const register = <T = any>(name: string) => {
    const val = ref();
    parentRefMap.set(name, val);
    return val;
  };


  onMounted(() => {
    init();
  });

  return {
    init,
    register
  };

}
