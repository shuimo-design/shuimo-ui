/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 13:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export default function useBorder() {

  const baseLineClass = 'm-border-line';


  enum lineType {
    top = 'top',
    left = 'left',
    right = 'right',
    bottom = 'bottom'
  }

  const template: NodeTemplate = {
    type: 'div',
    props: { class: 'm-border' },
    children: [
      { type: 'div', props: { class: 'm-border-main' }, slots: ['default'] },
      ...Object.keys(lineType)
        .map(key => ({ type: 'div', props: { class: [baseLineClass, `m-border-${key}-line`] } }))
    ]
  };


  return {
    template
  };
}
