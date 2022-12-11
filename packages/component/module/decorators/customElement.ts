/**
 * @description createElement decorator
 * @author 阿怪
 * @date 2022/12/10 15:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import ShuimoElement from '../elements/ShuimoElement';


export const customElement = (
  params: { name: string, style?: string }
) => {
  const { name, style } = params;

  return (target: typeof ShuimoElement) => {
    if (customElements.get(name)) {
      return;
    }


    // new a custom element
    class NewShuimoElement extends target {
      constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        if (shadow) {
          // create component
          const node = this.render();
          if (node) {
            // mount to shadow root
            shadow.appendChild(node);
            if (style) {
              const styleTag = document.createElement('style');
              styleTag.innerHTML = style;
              shadow.appendChild(styleTag);
            }
          }
        }
      }

      render() {
        return super.render();
      }
    }

    customElements.define(name, NewShuimoElement);
  };
};
