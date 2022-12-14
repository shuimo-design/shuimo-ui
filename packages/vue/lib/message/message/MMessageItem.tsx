/**
 * @description message消息组件
 * @author: qunbotop
 * @date 2021/1/8 4:37 下午
 * @version v2.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 *
 * v1.0.0 第一版非常粗暴的message消息组件
 * v1.1.0 添加类型定义
 * v1.1.1 类型定义优化
 * v2.0.0 重构组件
 * v2.0.1 添加拖拽功能
 */
import { defineComponent, ref, onBeforeMount, onMounted, nextTick, Ref } from 'vue';
import { fadeIn, fadeOut } from './animate';
import { props } from './api';
import successIcon from '../../assets/message/success.png';
import errorIcon from '../../assets/message/error.png';
import warningIcon from '../../assets/message/warning.png';
import infoIcon from '../../assets/message/info.png';
import type { MessageType } from '../../../types/components/MMessage';
import { useDraggable } from '../../dependents/_composables/useDraggable';
export default defineComponent({
  name: 'MMessageItem',
  props,
  emits: ['closeDuration'],
  setup(props, { emit }) {
    const messageIcon: Record<MessageType, any> = {
      success: successIcon,
      warning: warningIcon,
      info: infoIcon,
      error: errorIcon
    };
    const timer = ref<number | undefined>(0);
    const domRef = ref<HTMLElement | null>(null);

    const clearTimer = () => {
      props.duration && clearTimeout(timer.value);
    };
    const setTimer = () => {
      timer.value = setTimeout(() => {
        clearTimer();
        const dom = domRef.value;
        fadeOut(dom, props.direction, () => {
          emit('closeDuration');
        });
      }, props.duration);
    };

    onBeforeMount(() => {
      props.duration && setTimer();
    });
    const triggerFn = (domRef: Ref<HTMLElement | null>) => {
      if (domRef.value !== null) {
        domRef.value!.style.opacity = '0.3';
        domRef.value!.style.filter = 'opacity(70%)';
      }
    };
    const triggeredFn = (domRef: Ref<HTMLElement | null>) => {
      if (domRef.value !== null) {
        fadeOut(domRef.value, props.direction, () => {
          emit('closeDuration');
        });
      }
    };
    onMounted(() => {
      const dom = domRef.value;
      fadeIn(dom, props.direction);
    });
    nextTick(() => {
      if (props.dragAllow === true) {
        // 启动拖拽
        useDraggable(domRef, props.direction, props.dragConfig.triggerBoundary, () => triggerFn(domRef), () => triggeredFn(domRef))

      }
    });

    const iconDom = <img class={'m-message-icon'} src={`${messageIcon[props.type]}`} />;

    const contentDom = <div class={'m-message-content'}>{props.content}</div>;
    const PostStyle = 'position: relative;user-select:none;';
    return () => {
      return (
        <div style={PostStyle} class={'m-message'} ref={domRef} onMouseenter={clearTimer} onMouseleave={setTimer}>
          {iconDom}
          {contentDom}
        </div>
      );
    };
  }
});
