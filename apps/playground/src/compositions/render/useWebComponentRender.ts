/**
 * @description
 * @author 阿怪
 * @date 2023/4/3 16:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export default function useWebComponentRender(): IRender {

  const init = async (code: TemplateCode) => {
    const div = document.querySelector('.render');
    if (div) {
      div.innerHTML = code.templateHTML;
    }
  };

  const update = async (code: TemplateCode) => {

  };

  const clear = () => {

  }

  return {
    init,
    clear,
    update
  };

}
