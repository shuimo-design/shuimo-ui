/**
 * @description web-component version {{name}}
 * @author {{author}}
 * @date {{&now}}
 * @version v1.0.0
 *
 * {{slogan}}
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { {{hook}}, {{propsName}} } from '@shuimo-design/core';

@createMElement({
  name: '{{name}}',
  hookFunc: {{hook}}
})
export default class {{Mname}} extends MElement implements {{propsName}} {

}
