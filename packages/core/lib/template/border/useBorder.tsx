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


export function useBorder(children?: MNodeTemplate[]) {


  const baseLineClass = 'm-border-line';

  enum lineType {
    top = 'top',
    left = 'left',
    right = 'right',
    bottom = 'bottom'
  }


  const getTemplate = (): MNodeTemplate => {
    const main: MNodeTemplate = <div class="m-border-main">
      {!children ? <slot/> : (children.map(child => { return child; }))}
    </div>;

    return <div class="m-border">
      {main}
      {
        ...Object.keys(lineType).map(type => {
          return <div class={[baseLineClass, `m-border-${type}-line`].join(' ')}></div>;
        })
      }
    </div>;

  };


  return { options: { style }, getTemplate };
}
