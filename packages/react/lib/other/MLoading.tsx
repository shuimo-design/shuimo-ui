/**
 * @description react version loading
 * @author 阿怪
 * @date 2023/03/05 01:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { useEffect, useRef } from 'react';
import '@shuimo-design/core/lib/other/loading/loading.css';
import { LoadingProps } from '@shuimo-design/core/lib/other/loading';
import { useLoading } from '@shuimo-design/core/lib/other/loading/useLoading';
import { props as loadingProps } from '@shuimo-design/core/lib/other/loading/api';
import { withDefault } from '../../base/tools';

export default function MLoading(baseProps: LoadingProps) {
  const props = withDefault(baseProps, loadingProps);
  const { onMountedHook, shuaIndexList, getStyle } = useLoading();

  const loadingRef = useRef(null);
  const shua0Ref = useRef(null);
  const shua1Ref = useRef(null);
  const shua2Ref = useRef(null);
  const shua3Ref = useRef(null);
  const shua4Ref = useRef(null);
  const shua5Ref = useRef(null);
  const shua6Ref = useRef(null);
  const shua7Ref = useRef(null);

  const refs = {
    loadingRef,
    shua0Ref, shua1Ref, shua2Ref, shua3Ref, shua4Ref, shua5Ref, shua6Ref, shua7Ref
  };

  useEffect(() => {
    onMountedHook({ ...props, ...refs });
  });

  const shuaList = shuaIndexList.map((_, i) => {
    return <div className={`m-loading-item m-loading-shua${i % 4}`}
                key={`m-loading-shua-${i}`}
                ref={refs[`shua${i}Ref` as keyof typeof refs]}/>;
  });

  const style = getStyle(props) as React.CSSProperties;

  return <div className={['m-loading', props.mask ? 'm-loading-mask' : ''].join(' ')} style={style} ref={loadingRef}>
    <div className="m-loading-shua-wrapper">
      {shuaList}
    </div>
  </div>;
}

