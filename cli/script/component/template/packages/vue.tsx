/**
 * @description vue version {{name}}
 * @author {{author}}
 * @date {{&now}}
 * @version v1.0.0
 *
 * {{slogan}}
 */
import { defineComponent } from 'vue';
import { {{hook}}, {{name}}Props } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: '{{MName}}',
  props: {{name}}Props,
  setup: (props, { slots }) => {
    return () => {
      const { getTemplate } = {{hook}}();
      return cr(getTemplate({ props }), { slots });
    };
  }
});
