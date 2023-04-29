/**
 * @description web-component version loading
 * @author 阿怪
 * @date 2023/03/05 01:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { createMElement } from '../../base/createElement';
import { defaultSpeed, props } from '@shuimo-design/core/lib/other/loading/api';
import { LoadingProps, LoadingRef } from '@shuimo-design/core/lib/other/loading';
import style from '@shuimo-design/core/lib/other/loading/loading.css?inline';
import { useLoading } from '@shuimo-design/core/lib/other/loading/useLoading';
import { styleParse } from '../../base/tools';

@createMElement({
  name: 'loading',
  props
})
export default class extends LitElement implements LoadingProps {

  mask?: boolean;
  sideLength?: number | string;
  speed: number = defaultSpeed;

  static styles = unsafeCSS(style);

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

  private shuaIndexList: number[] = [];
  private readonly onMountedHook: ReturnType<typeof useLoading>['onMountedHook'];
  private readonly getStyle: ReturnType<typeof useLoading>['getStyle'];

  constructor() {
    super();
    const loading = useLoading();
    this.shuaIndexList = loading.shuaIndexList;
    this.onMountedHook = loading.onMountedHook;
    this.getStyle = loading.getStyle;

  }


  get shuaList() {
    return this.shuaIndexList.map((_, i) => {
      return html`
        <div class=${`m-loading-item m-loading-shua${i % 4}`}
             ${ref(this[`shua${i}Ref` as keyof this] as Ref)}/>`;
    });
  }


  updated() {
    this.onMountedHook(this as LoadingProps & LoadingRef);
  }

  render() {
    return html`
      <div class=${['m-loading',this.mask?'m-loading-mask':''].join(' ')} style=${styleParse(this.getStyle(this))}
           ref=${ref(this.loadingRef)}>
        <div class="m-loading-shua-wrapper">
          ${this.shuaList}
        </div>
      </div>`;
  }
}
