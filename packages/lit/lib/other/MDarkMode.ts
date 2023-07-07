/**
 * @description web-component DarkMode template
 * @author 阿怪
 * @date 2023/1/31 11:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { html, svg, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { DarkModeProps } from '@shuimo-design/core/lib/other/darkMode';
import style from '@shuimo-design/core/lib/other/darkMode/darkMode.css?inline';
import { useDarkMode } from '@shuimo-design/core/lib/other/darkMode/useDarkMode';

const { onMountedHook, toggleDarkMode ,getBrowserDarkMode} = useDarkMode();

@createMElement({
  name: 'dark-mode'
})
export default class MDarkMode extends LitElement implements DarkModeProps {
  public value: boolean = false;
  static styles = unsafeCSS(style);

  constructor() {
    super();
    onMountedHook();
    const isDark = getBrowserDarkMode();
    if (isDark) {
      this.value = true;
      toggleDarkMode(this);
    }
  }

  clickHandler() {
    this.value = !this.value;
    toggleDarkMode(this);
  }

  get svg() {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" class="m-dark-mode-svg"
     stroke-width="1">
  <title>Dark Mode</title>
  <filter id="outset-shadow" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="20" flood-color="black"/>
  </filter>
  <filter id="outset-shadow-white" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="0" dy="0" stdDeviation="20" flood-color="white"/>
  </filter>
  <path
    class="svg-black"
    transform="translate(0)"
    fill="#000000"/>
  <path
    class="svg-white"
    transform="translate(0) rotate(180, 250, 250)"
    fill="#FFFFFF"/>
  <path
    class="fins"
    transform="translate(0)"
    fill="#000000"/>
  <circle class="svg-black" cx="250" cy="375" r="40"/>
  <circle class="svg-white" cx="250" cy="125" r="40" fill="#fff"/>
</svg>`;
  }

  render() {
    return html`
      <div class="m-dark-mode"
           @click=${(e: MouseEvent) => this.clickHandler()}>
        ${this.svg}
      </div>`;
  }

}
