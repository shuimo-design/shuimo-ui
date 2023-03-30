/**
 * @description web-component version loading
 * @author 阿怪
 * @date 2023/03/05 01:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { useLoading, LoadingProps } from '@shuimo-design/core';
import { createRef, Ref } from 'lit/directives/ref.js';

@createMElement({
  name: 'loading',
  hookFunc: useLoading
})
export default class extends MElement implements LoadingProps {

  mask?: boolean;
  sideLength?: number | string;
  speed?: number = 2000;

  loadingRef: Ref<HTMLElement> = createRef();

  // Looking for a more elegant way of writing
  shua0Ref: Ref<HTMLElement> = createRef();
  shua1Ref: Ref<HTMLElement> = createRef();
  shua2Ref: Ref<HTMLElement> = createRef();
  shua3Ref: Ref<HTMLElement> = createRef();
  shua4Ref: Ref<HTMLElement> = createRef();
  shua5Ref: Ref<HTMLElement> = createRef();
  shua6Ref: Ref<HTMLElement> = createRef();
  shua7Ref: Ref<HTMLElement> = createRef();

}
