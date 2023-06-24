/**
 * @description web-component version progress
 * @author 阿怪
 * @date 2023/03/09 16:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS, css } from 'lit';
import { createMElement } from '../../base/createElement';
import { ProgressProps } from '@shuimo-design/core/lib/base/progress';
import { props } from '@shuimo-design/core/lib/base/progress/api';
import style from '@shuimo-design/core/lib/base/progress/progress.css?inline';
import { useProgress, leaf } from '@shuimo-design/core/lib/base/progress/useProgress';
import { styleParse } from '../../base/tools';

@createMElement({
  name: 'progress',
  props
})
export default class extends LitElement implements ProgressProps {
  width: number = 399;
  height: number = 26.547;
  value: number = 0;
  max: number = 100;
  showInfo: boolean = false;
  infoWidth: number = 44;
  leafHeight: number = 28;

  static styles = unsafeCSS(style);

  render() {
    const { getProgressInfo, getProgressWrapperStyle } = useProgress({ props: this });
    const progressInfo = getProgressInfo();
    const progress = html`
      <progress class="m-progress"
                value=${this.value} max=${this.max} style=${styleParse(progressInfo.style)}/>`;
    if (!this.showInfo) {
      return progress;
    }

    const progressWrapperInfo = getProgressWrapperStyle(progressInfo);

    return html`
      <div class="m-progress-border" style=${styleParse(progressWrapperInfo.baseStyle)}>
        <div class="m-progress-per" style=${styleParse(progressWrapperInfo.textStyle)}>
          <img class="m-progress-leaf" src=${leaf} alt=""/>
          <slot/>
        </div>
        ${progress}
      </div>`;
  }
}
