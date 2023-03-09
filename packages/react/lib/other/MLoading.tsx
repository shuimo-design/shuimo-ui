/**
 * @description react version loading
 * @author 阿怪
 * @date 2023/03/05 01:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useLoading, LoadingProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import { useRef, useEffect } from 'react';

export default function MLoading(props: LoadingProps) {
  const { getTemplate, onMountedHook } = useLoading();


  const loadingRef = useRef<HTMLElement>();
  const shua0Ref = useRef<HTMLElement>();
  const shua1Ref = useRef<HTMLElement>();
  const shua2Ref = useRef<HTMLElement>();
  const shua3Ref = useRef<HTMLElement>();
  const shua4Ref = useRef<HTMLElement>();
  const shua5Ref = useRef<HTMLElement>();
  const shua6Ref = useRef<HTMLElement>();
  const shua7Ref = useRef<HTMLElement>();

  const ref = {
    loadingRef,
    shua0Ref, shua1Ref, shua2Ref, shua3Ref, shua4Ref, shua5Ref, shua6Ref, shua7Ref
  };

  useEffect(() => {
    onMountedHook({ ...props, ...ref })
  });

  return cr(getTemplate({
    props,
    ref
  }), props);
}

