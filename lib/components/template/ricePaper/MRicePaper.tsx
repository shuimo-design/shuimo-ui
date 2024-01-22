/**
 * @description 宣纸背景组件
 * @author 阿怪
 * @date 2022/7/14 23:22
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 默认改为冷色调，添加色调选项
 */
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import { props } from './api';
import useImgMove from './compositions/useImgMove';

export default defineComponent((props,{slots})=>{


  const {
    baseRef: mLBaseRef,
    midRef: mLMidRef,
    frontRef: mLFrontRef,
    front2Ref: mLFront2Ref,
    onMove: leftOnMove
  } = useImgMove('left');

  const {
    baseRef: mRBaseRef,
    midRef: mRMidRef,
    frontRef: mRFrontRef,
    front2Ref: mRFront2Ref,
    onMove: rightOnMove
  } = useImgMove('right');

  const moveMountain = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const xPercent = x / w;
    const yPercent = y / h;
    const xMove = xPercent * 10 - 5;
    const yMove = (yPercent * 10 - 5) * 0.5; // UI said y-axis must move very slow.
    leftOnMove(xMove, yMove);
    rightOnMove(xMove, yMove);
  };

  onMounted(() => {
    window.addEventListener('mousemove', moveMountain);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', moveMountain);
  });

  return ()=> {

    const mountain = <div class="mountains w-100 absolute">
      <div class="flex between-end">
        <div class="m-m-left">
          <div class="m-l-base bg-100 absolute m-m-reflect" ref={mLBaseRef}/>
          <div class="m-l-mid bg-100 absolute m-m-reflect" ref={mLMidRef}/>
          <div class="m-l-front bg-100 absolute m-m-reflect" ref={mLFrontRef}/>
          <div class="m-l-front-2 bg-100 absolute m-m-reflect" ref={mLFront2Ref}/>
        </div>
        <div class="m-m-right">
          <div class="m-r-base bg-100 absolute m-m-reflect" ref={mRBaseRef}/>
          <div class="m-r-mid bg-100 absolute m-m-reflect" ref={mRMidRef}/>
          <div class="m-r-front bg-100 absolute m-m-reflect" ref={mRFrontRef}/>
          <div class="m-r-front-2 bg-100 absolute m-m-reflect" ref={mRFront2Ref}/>
        </div>
      </div>
    </div>;

    return (
      <div class="m-bg w-100 h-100 absolute t0r0">
        {mountain}
        <div class="rice-paper-hover w-100 h-100 absolute t0r0"/>
        <div class="m-bg-layout absolute t0r0 w-100 h-100">
          {slots.default?.()}
        </div>
      </div>
    )
  }

}, {
  name: 'MRicePaper',
  props
})
