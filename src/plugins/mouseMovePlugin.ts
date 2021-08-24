/**
 * @Description: 鼠标移动插件
 * @Author: 菩萨蛮
 * @Date: 2021/8/24 8:46 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * TODO 1. listener只用注册一个，组件使用观察者模式挂载上去
 *      2. 鼠标X,Y使用偏移量
 *      3. 鼠标移出窗口的时候添加一个缓速top和left归零的方法
 */
import { onMounted, onUnmounted } from 'vue';

const calNumber = (d: number) => Math.log1p(d);

export const initEventHandler = (elementId: string, offset: number = 50) => {

  const moveFunc = (e: MouseEvent) => {
    let x = calNumber(e.clientX / document.body.offsetWidth);
    let y = calNumber(e.clientY / document.body.offsetHeight);
    document.getElementById(elementId)!.style.top = `${x * offset}px`;
    document.getElementById(elementId)!.style.left = `${y * offset}px`;
  };

  const init = () => {
    window.addEventListener('mousemove', moveFunc);
  }

  const remove = () => {
    window.removeEventListener('mousemove', moveFunc);
  }

  onMounted(() => {
    init();
  });

  onUnmounted(() => {
    remove();
  })

  return {
    init
  }
}
