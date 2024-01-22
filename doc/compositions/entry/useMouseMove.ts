/**
 * @Description: 鼠标移动插件
 * @Author: 阿怪
 * @Date: 2021/8/24 8:46 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * TODO 1. 鼠标X,Y使用偏移量
 *      2. 鼠标移出窗口的时候添加一个缓速top和left归零的方法
 */
import { onMounted, onUnmounted } from 'vue';

/**
 * 用于将DOMTokenList转换成Array获取class list 的方法
 * @param list DOMTokenList | HtmlCollection
 * @return array class array
 */
export const DOMTokenListToArray = (list: DOMTokenList | HTMLCollection) => {
  const array = [];
  for (let i = 0; i < list.length; i++) {
    array.push(list[i]);
  }
  return array;
};

/**
 * 获取dom的像素数值
 * @param elt
 * @param type
 */
export const getStyleNumber = (elt: Element, type: keyof CSSStyleDeclaration) => {
  if (elt) {
    const num = Number((window.getComputedStyle(elt)[type]! as string).replace('px', ''));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

const calNumber = (d: number) => Math.log1p(d);

type DomInfoType = {
  dom: HTMLElement,
  height: number,
  width: number
};


export default function useMouseMove(elementId: string, offset = 1) {
  let domList: Array<DomInfoType> = [];

  const moveFunc = (e: MouseEvent) => {
    const x = calNumber(e.clientX / document.body.offsetWidth);
    const y = calNumber(e.clientY / document.body.offsetHeight);
    if (domList) {
      domList.map(e => {
        const d = e.dom;
        d.style.top = `${x * offset}px`;
        d.style.left = `${y * offset / e.width * 500}px`;
      });

    }
  };

  const init = () => {
    window.addEventListener('mousemove', moveFunc);
  };

  const remove = () => {
    window.removeEventListener('mousemove', moveFunc);
  };

  onMounted(() => {
    const baseDom = document.getElementById(elementId);
    if (baseDom) {
      domList = DOMTokenListToArray(baseDom.children).map(c => {
        const d = c as HTMLElement;
        return {
          dom: d,
          height: getStyleNumber(d, 'height'),
          width: getStyleNumber(d, 'width')
        };
      });
    }

    init();
  });

  onUnmounted(() => {
    remove();
  });

  return {
    init
  };
}
