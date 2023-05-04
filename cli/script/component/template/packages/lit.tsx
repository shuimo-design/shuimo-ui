/**
 * @description web-component version {{name}}
 * @author {{author}}
 * @date {{&now}}
 * @version v1.0.0
 *
 * {{slogan}}
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/{{group}}/{{name}}/api';
import { {{propsName}} } from '@shuimo-design/core/lib/{{group}}/{{name}}';
import style from '@shuimo-design/core/lib/{{group}}/{{name}}/{{name}}.css?inline';

@createMElement({
  name: '{{name}}',
  props
})
export default class {{Mname}} extends LitElement implements {{propsName}} {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
