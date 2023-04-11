/**
 * @description
 * @author 阿怪
 * @date 2023/4/6 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import tHTML from '../../template/template.html?raw';
import tCss from '../../template/template.css?raw';
import tScript from '../../template/template.js?raw';
import useIframeParent from '../../iframe/useIframeParent';


export default function useHome() {
  const { register } = useIframeParent();
  const templateType = register<TemplateType>('type', 'vue');
  const templateHTML = register('html', tHTML);
  const templateCss = register('css', tCss);
  const templateScript = register('script', tScript);

  return {
    templateType, templateHTML, templateCss, templateScript
  };
}


