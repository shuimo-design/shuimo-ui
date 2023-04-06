/**
 * @description
 * @author 阿怪
 * @date 2023/3/24 01:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


type TemplateCode = {
  templateHTML: string,
  templateCss: string,
  templateScript: string
}

type TemplateType = 'vue' | 'react' | 'web-component';

interface IRender {
  init: (code: TemplateCode) => Promise<void>;
  clear: () => void;
  update: (code: TemplateCode) => Promise<void>;
}
