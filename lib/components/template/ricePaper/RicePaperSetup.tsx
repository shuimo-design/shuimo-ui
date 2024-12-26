/**
 * @description rice-paper component setup
 * @author 阿怪
 * @date 2024/2/6 02:21
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 auto support dark mode
 */
import { onBeforeUnmount, onMounted, onUnmounted, watch } from 'vue';
import { WCSetup } from '../../types/template';
import { RicePaperProps } from './index';
import useImgMove from './compositions/useImgMove.ts';
import { useDarkMode } from '../../other/darkMode/useDarkMode.ts';
import { useDarkModeStorage } from '../../../utils/install/importComponents.ts';

export const MRicePaperSetup: WCSetup<RicePaperProps> = slot => {
  return (props, { slots }) => {
    if (props.autoDarkMode === true || (props.autoDarkMode as unknown as string) === 'true') {
      const { darkModeRef, initDarkMode } = useDarkModeStorage();
      const { onMountedHook, unmountedHook } = useDarkMode({
        autoMode: true,
        modelValue: darkModeRef.value,
      });
      let needInit = true;
      onMounted(() => {
        needInit = initDarkMode();
        if (needInit) {
          onMountedHook();
        }
      });
      onUnmounted(() => {
        if (needInit) {
          unmountedHook();
        }
      });
    }
    const {
      baseRef: mLBaseRef,
      midRef: mLMidRef,
      frontRef: mLFrontRef,
      front2Ref: mLFront2Ref,
      onMove: leftOnMove,
    } = useImgMove('left');

    const {
      baseRef: mRBaseRef,
      midRef: mRMidRef,
      frontRef: mRFrontRef,
      front2Ref: mRFront2Ref,
      onMove: rightOnMove,
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

    // todo use a better way to handle this.
    onMounted(() => {
      if (props.mountain) {
        window.addEventListener('mousemove', moveMountain);
      }
    });

    onBeforeUnmount(() => {
      if (props.mountain) {
        window.removeEventListener('mousemove', moveMountain);
      }
    });

    watch(() => props.mountain, val => {
      if (val) {
        window.addEventListener('mousemove', moveMountain);
      } else {
        window.removeEventListener('mousemove', moveMountain);
      }
    });

    return () => {

      const renderSlot = slot ?? slots.default?.();

      const mountain = props.mountain ? <div class="mountains">
        <div class="m-m-left">
          <div class="m-l-base m-m-reflect" ref={mLBaseRef}/>
          <div class="m-l-mid m-m-reflect" ref={mLMidRef}/>
          <div class="m-l-front m-m-reflect" ref={mLFrontRef}/>
          <div class="m-l-front-2 m-m-reflect" ref={mLFront2Ref}/>
        </div>
        <div class="m-m-right">
          <div class="m-r-base m-m-reflect" ref={mRBaseRef}/>
          <div class="m-r-mid m-m-reflect" ref={mRMidRef}/>
          <div class="m-r-front m-m-reflect" ref={mRFrontRef}/>
          <div class="m-r-front-2 m-m-reflect" ref={mRFront2Ref}/>
        </div>
      </div> : null;

      return (
        <div class={[
          'm-rice-paper',
          props.layout === 'full-screen' ? 'm-rice-paper-full-screen m-scroll' : '',
          `m-rice-paper-${props.type ?? 'default'}`,
        ]}>
          {mountain}
          <div class="m-rice-paper-hover"/>
          <div class="m-rice-paper-layout">
            {renderSlot}
          </div>
        </div>
      );
    };
  };
};
