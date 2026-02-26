/**
 * @description headless descriptions-item 标记组件，不渲染任何内容
 *              MDescriptions 通过读取此组件的 props 和 slots 来构建描述列表项
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { DescriptionsCore } from '@shuimo-design/ui-core';

const { descriptionsItemProps } = DescriptionsCore;

export default defineComponent({ name: 'MDescriptionsItem', props: descriptionsItemProps });
