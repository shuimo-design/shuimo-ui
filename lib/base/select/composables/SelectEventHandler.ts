/**
 * @Description: 选择事件管理
 * @Author: 菩萨蛮
 * @Date: 2021/8/27 11:46 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


import { ref } from 'vue';
import { DOMTokenListToArray } from "../../../dependents/_utils/tools";




export default function SelectEventHandler(setStyle: Function) {

  const selectDropdown = ref(false);

  /**
   * 鼠标点击事件方法
   */
  const mousedownEvent = (e: MouseEvent) => {
    const path = e.composedPath();
    if (path && path.length > 0) {
      const isSelectDropdown = path.some((e) => {
        const q = e as Element;
        return q.classList &&
          [...DOMTokenListToArray(q.classList)].includes('w-select-dropdown');

      });
      if (!isSelectDropdown) {
        leaveDropdown();
      }
    } else {
      leaveDropdown();
    }
  }

  /**
   * 改变窗口大小事件方法
   */
  const resizeWindow = () => {
    setStyle();
  }

  const setEvents = () => {
    window.addEventListener('mousedown', mousedownEvent);
    window.addEventListener('resize', resizeWindow)
  }

  const leaveDropdown = () => {
    selectDropdown.value = false;
    window.removeEventListener('mousedown', mousedownEvent);
    window.removeEventListener('resize', resizeWindow);
  }

  return {
    selectDropdown,
    mousedownEvent,
    setEvents,
    leaveDropdown
  }
}
