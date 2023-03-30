/**
 * @description
 * @author 阿怪
 * @date 2023/3/16 10:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export default function useIFrame() {
  const iframe = document.querySelector('iframe')!;
  const doc = iframe.contentDocument!;
  const div = doc.createElement('div');
  doc.body.appendChild(div);

  const appendStyle = (styleInfo: string) => {
    const style = doc.createElement('style');
    style.innerHTML = styleInfo;
    doc.head.appendChild(style);
  };


  return {
    div,
    appendStyle
  };
}
