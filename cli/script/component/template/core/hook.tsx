/**
 * @description {{description}}
 * @author {{author}}
 * @date {{&now}}
 * @version v1.0.0
 *
 * {{slogan}}
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { {{propsName}} } from './index';

const style = await import('./{{name}}.pcss');
export const {{name}}Props: MCOPO<{{propsName}}> = {

};

export function use{{upperCaseFirstName}}() {

  const getTemplate = (options?: {}) => {
    const {} = useDefaultOptions(options!, { props: {{name}}Props });
    return <div/> as MNodeTemplate;
  }

  return {
    options:{
      props: {{name}}Props,
      style
    },
    getTemplate
  }
}
