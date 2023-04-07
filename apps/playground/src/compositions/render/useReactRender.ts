/**
 * @description react render
 * @author 阿怪
 * @date 2023/4/7 10:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import useHTMLAst from '../ast/useHTMLAST';
import { createElement, ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import * as MReact from '@shuimo-design/react/index';

export default function useReactRender(): IRender {

  const { parse } = useHTMLAst();
  let root: ReactElement = null;
  const getElement = (code: TemplateCode) => {
    const ast = parse(code.templateHTML);
    return createElement('div', {}, ...ast
      .filter(item => /^[A-Z]/.test(item.name))
      .map((item) => {
        // @ts-ignore need help
        return createElement(MReact[item.name], item.attrs, item.innerHTML);
      }));
  };


  const initRoot = ()=>{
    if (!root) {
      root = createRoot(document.querySelector('.render')!);
    }
  }

  const init = async (code: TemplateCode) => {
    initRoot();
    const element = getElement(code);
    root.render(element);
  };

  const update = async (code: TemplateCode) => {
    initRoot();
    const element = getElement(code);
    root.render(element);
  };

  const clear = () => {
    if(root){
      root.unmount();
      root = null;
    }
  };

  return {
    init, update, clear
  };
}
