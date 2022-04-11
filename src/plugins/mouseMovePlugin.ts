/**
 * @description 鼠标移动插件
 * @author 阿怪
 * @date 2021/8/24 8:46 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * TODO 1. 鼠标X,Y使用偏移量
 *      2. 鼠标移出窗口的时候添加一个缓速top和left归零的方法
 */
import { onMounted, onUnmounted } from 'vue';
import { DOMTokenListToArray, getStyleNumber } from "../../lib/dependents/_utils/dom";

const calNumber = (d: number) => Math.log1p(d);

type DomInfoType = {
  dom: HTMLElement,
  height: number,
  width: number,
};

export const initEventHandler = (elementId: string, offset: number = 1) => {

  let domList: Array<DomInfoType> = [];

  const moveFunc = (e: MouseEvent) => {
    let x = calNumber(e.clientX / document.body.offsetWidth);
    let y = calNumber(e.clientY / document.body.offsetHeight);
    if (domList) {
      domList.map(e => {
        const d = e.dom;
        d.style.top = `${x * offset}px`;
        d.style.left = `${y * offset / e.width * 500}px`;
      })

    }
  };

  const init = () => {
    window.addEventListener('mousemove', moveFunc);
  }

  const remove = () => {
    window.removeEventListener('mousemove', moveFunc);
  }

  onMounted(() => {
    const baseDom = document.getElementById(elementId);
    if (baseDom) {
      domList = DOMTokenListToArray(baseDom.children).map(c => {
        const d = c as HTMLElement;
        return {
          dom: d,
          height: getStyleNumber(d, 'height'),
          width: getStyleNumber(d, 'width'),
        }
      });
    }

    init();
  });

  onUnmounted(() => {
    remove();
  })

  return {
    init
  }
}
