/**
 * @description
 * @author 阿怪
 * @date 2024/1/3 16:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
import type { Ref } from 'vue';


const setTransform = (el: Ref<HTMLElement | undefined>, value: string) => {
  if (!el.value) {return;}

  el.value.style.cssText = `transform: ${value};`;
};


export default function useImgMove(position: 'left' | 'right' = 'left') {

  const baseRef = ref<HTMLElement>();
  const midRef = ref<HTMLElement>();
  const frontRef = ref<HTMLElement>(); // left front
  const front2Ref = ref<HTMLElement>(); // right front


  const onMove = (x: number, y: number) => {
    const leftFrontRadio = x < 0 ? 2 : 1;
    const rightFrontRadio = x > 0 ? 2 : 1;
    const leftSlowRadio = position === 'left' ? 0.95 : 1;
    const rightSlowRadio = position === 'right' ? 0.95 : 1;


    setTransform(baseRef, `translate(${x * 0.3}px, ${y * 0.3}px)`);
    setTransform(midRef, `translate(${x * 0.8}px, ${y * 0.8}px)`);
    setTransform(frontRef, `translate(${x * leftSlowRadio * leftFrontRadio}px, ${y * leftSlowRadio}px)`);
    setTransform(front2Ref, `translate(${x * rightSlowRadio * rightFrontRadio}px, ${y * rightSlowRadio}px)`);
  };


  return {
    baseRef, midRef, frontRef, front2Ref,
    onMove
  };
}
