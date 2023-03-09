/**
 * @description default append global style
 * @author 阿怪
 * @date 2023/1/13 11:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useGlobal } from '@shuimo-design/core';

const { globalStyle } = useGlobal();

export const webComponentStyleInstall = () => {
  const style = document.createElement('style');
  style.innerHTML = globalStyle;
  document.head.appendChild(style);
};
