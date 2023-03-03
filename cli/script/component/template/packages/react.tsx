/**
 * @description react version {{name}}
 * @author {{author}}
 * @date {{&now}}
 * @version v1.0.0
 *
 * {{slogan}}
 */
import { {{hook}}, {{propsName}} } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default function {{MName}}(props: {{propsName}} ) {
  const { getTemplate } = {{hook}}();

  return cr(getTemplate({ props }),props)
}

