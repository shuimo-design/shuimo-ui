/**
 * @description web-component version slider
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/slider/api';
import { SliderProps } from '@shuimo-design/core/lib/base/slider';
import style from '@shuimo-design/core/lib/base/slider/slider.css?inline';

@createMElement({
  name: 'm-slider',
  props
})
export default class MSlider extends LitElement implements SliderProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
