/**
 * @description react version pagination
 * @author 阿怪
 * @date 2023/05/25 23:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/template/pagination/pagination.css';
import { PaginationProps } from '@shuimo-design/core/lib/template/pagination';
import { usePagination } from '@shuimo-design/core/lib/template/pagination/usePagination';

export default function MPagination(props: PaginationProps ) {
  const {transform}= usePagination();


  return <div>

  </div>;
}

