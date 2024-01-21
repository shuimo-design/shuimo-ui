/**
 * @description react version loading
 * @author 阿怪
 * @date 2023/03/05 01:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { useRef } from 'react';
import '@shuimo-design/core/lib/other/loading/loading.css';
import { LoadingProps } from '@shuimo-design/core/lib/other/loading';
import { useLoading } from '@shuimo-design/core/lib/other/loading/useLoading';
import { props as loadingProps } from '@shuimo-design/core/lib/other/loading/api';
import { withDefault } from '../../base/tools';

export default function MLoading(baseProps: LoadingProps) {
  const props = withDefault(baseProps, loadingProps);
  const { getStyle } = useLoading();

  const loadingRef = useRef(null);

  const style = getStyle(props) as React.CSSProperties;

  return <div className={['m-loading', props.mask ? 'm-loading-mask' : ''].join(' ')} style={style} ref={loadingRef}>
    <div className="m-loading-wrapper">
      <div className="m-loading-main"></div>
    </div>
  </div>;
}

