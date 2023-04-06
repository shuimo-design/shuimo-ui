/**
 * @description iframe hook
 * @author 阿怪
 * @date 2023/3/16 10:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export default function useIFrame() {
  let div: { value?: HTMLElement } = { value: undefined };
  let doc: Document | undefined;
  let iframe: HTMLIFrameElement;

  const getDoc = () => doc;

  const _initFrame = () => {
    doc = iframe.contentDocument!;
    div.value = doc.querySelector('.render') as HTMLElement;
    console.log(doc.getElementsByTagName('render'),div.value);
  };

  const initIFrame = () => {
    iframe = document.querySelector('iframe')!;
    _initFrame();

    return div;
  };

  const appendStyle = (styleInfo: string) => {
    if (!doc) return;
    const style = doc.createElement('style');
    style.innerHTML = styleInfo;
    doc.head.appendChild(style);
  };


  // const reset = () => {
  //   const playground = iframe.parentNode!;
  //   playground.removeChild(iframe);
  //   iframe = document.createElement('iframe');
  //   iframe.classList.add('viewer');
  //   playground.appendChild(iframe);
  //   _initFrame();
  // };

  return {
    getDoc,
    div,
    initIFrame,
    appendStyle,
  };
}
