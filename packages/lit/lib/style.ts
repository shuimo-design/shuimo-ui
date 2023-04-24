/**
 * @description default append global style
 * @author 阿怪
 * @date 2023/1/13 11:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import globalStyle from '@shuimo-design/core/lib/style/global.css?inline';

export const webComponentStyleInstall = () => {
  const style = document.createElement('style');
  style.innerHTML = globalStyle;
  document.head.appendChild(style);
};
