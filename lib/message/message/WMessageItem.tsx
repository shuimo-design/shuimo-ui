/**
 * @description message消息组件
 * @author: qunbotop
 * @date 2021/1/8 4:37 下午
 * @version V2.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 *
 * V1.0.0 第一版非常粗暴的message消息组件
 * V1.1.0 添加类型定义
 * V1.1.1 类型定义优化
 * V2.0.0 重构组件
 */
import { defineComponent, ref, onBeforeMount, onMounted } from 'vue';
import { fadeIn, fadeOut } from './animate';
import { props } from './api';
import successIcon from '../../assets/message/success.png';
import errorIcon from '../../assets/message/error.png';
import warningIcon from '../../assets/message/warning.png';
import infoIcon from '../../assets/message/info.png';
import type { MessageType } from "../../../types/components/WMessage";

export default defineComponent({
  name: 'WMessageItem',
  props,
  setup(props, { emit }) {
    const messageIcon: Record<MessageType, any> = {
      success: successIcon,
      warning: warningIcon,
      info: infoIcon,
      error: errorIcon
    }

    let timer = ref<number>(0);
    let domRef = ref(null);

    const clearTimer = () => {
      props.duration && clearTimeout(timer.value);
    }

    const setTimer = () => {
      timer.value = setTimeout(() => {
        clearTimer();
        const dom = domRef.value;
        fadeOut(dom, props.direction, () => {
          emit('close-duration');
        })
      }, props.duration);
    }

    onBeforeMount(() => {
      props.duration && setTimer();
    })

    onMounted(() => {
      const dom = domRef.value;
      fadeIn(dom, props.direction);
    })

    const iconDom = (
      <img class={'w-message-icon'} src={`${messageIcon[props.type]}`}/>
    )

    const contentDom = (
      <div class={'w-message-content'}>{props.content}</div>
    )

    return () => {
      return (
        <div class={'w-message'} ref={domRef} onMouseenter={clearTimer} onMouseleave={setTimer}>
          {iconDom}
          {contentDom}
        </div>
      )
    }
  }
})
