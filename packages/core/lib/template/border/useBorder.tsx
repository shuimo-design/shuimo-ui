/**
 * @description border core
 * @author 阿怪
 * @date 2022/12/12 13:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '@shuimo-design/types';
import style from './border.pcss';


const handlerChildren = (children: Record<string, MNodeTemplate>)=>{
  const arr:MNodeTemplate[] = [];
  Object.keys(children).forEach(k=>{
    const child = children[k];
    if (child.props) {
      child.props['m-name'] = k;
    }else{
      child.props = {'m-name': k};
    }
    arr.push(child);
  })
  return arr;
}

export function useBorder(children?: Record<string, MNodeTemplate>) {


  const baseLineClass = 'm-border-line';

  enum lineType {
    top = 'top',
    left = 'left',
    right = 'right',
    bottom = 'bottom'
  }

  const main: MNodeTemplate = <div class="m-border-main" m-name="main">
    {!children ? <slot/> : handlerChildren(children)}
  </div>;

  const template: MNodeTemplate = <div class="m-border">
    {main}
    </div>

  Object.keys(lineType).forEach(type => {
    template.children![type] = <div m-name={type} class={[baseLineClass, `m-border-${type}-line`]}></div>;
  });

  return { options: { template, style } };
}
