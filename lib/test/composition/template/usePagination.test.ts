/**
 * @description Pagination hook test
 * @author 阿怪
 * @date 2023/5/31 23:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';
import { PaginationProps } from '../../../components/template/pagination';
import { Pager, usePagination } from '../../../components/template/pagination/usePagination.ts';
import { Ref, ref } from 'vue';

describe('pagination hook', function () {

  const baseProps: Required<PaginationProps> = {
    total: 100,
    modelValue: 1,
    defaultCurrent: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50, 100],
    layout: 'prev, pager, next, jumper, total',
    foldedMaxPageBtn: null,
    maxPageBtn: null,
    showEdgePageNum: true,
  };


  const getPagination = (props: PaginationProps, value?: { currentValue?: Ref<number> }) => {
    return usePagination({
      props: { ...baseProps, ...props },
      value: { currentValue: ref(1), ...value },
    });
  };

  const mapValue = (arr: Pager[]) => arr.map(item => item.value);

  describe('page number button render', () => {

    test('when total is less then pageSize', () => {
      const { getPageNumList } = getPagination({
        total: 5,
        pageSize: 10,
      });
      expect(mapValue(getPageNumList())).toMatchObject([1]);
    });

    test('when total is equal to pageSize', () => {
      const { getPageNumList } = getPagination({
        total: 10,
        pageSize: 10,
      });
      expect(mapValue(getPageNumList())).toMatchObject([1]);
    });

    describe('when total is greater than pageSize', () => {

      describe('when foldedMaxPageBtn is null', () => {

        describe('when maxPageBtn is null', function () {
          // means base case
          test('when current=1 total=20 pageSize=5', () => {
            const { getPageNumList } = getPagination({
              total: 20, pageSize: 5,
            });
            expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4]);
          });

          test('when not divisible', () => {
            const { getPageNumList } = getPagination({
              total: 21, pageSize: 5,
            });
            expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5]);
          });
        });

        describe('when maxPageBtn is not null', () => {

          test('no need to fold', () => {
            const { getPageNumList } = getPagination({
              total: 20, pageSize: 5, maxPageBtn: 5,
            });
            expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4]);
          });

          describe('need fold', function () {
            describe('show edge', () => {
              test('current is 1', () => {
                const { getPageNumList } = getPagination({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                });
                expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, '...', 10]);
              });

              test('test current', () => {
                const current = ref(10);
                const { getPageNumList } = getPagination({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                }, { currentValue: current });
                expect(mapValue(getPageNumList())).toMatchObject([1, '...', 7, 8, 9, 10]);
                current.value = 9;
                expect(mapValue(getPageNumList())).toMatchObject([1, '...', 7, 8, 9, 10]);
                current.value = 7;
                expect(mapValue(getPageNumList())).toMatchObject([1, '...', 6, 7, 8, 9, 10]);
                current.value = 6;
                expect(mapValue(getPageNumList())).toMatchObject([1, '...', 5, 6, 7, '...', 10]);
                current.value = 5;
                expect(mapValue(getPageNumList())).toMatchObject([1, '...', 4, 5, 6, '...', 10]);
                current.value = 4;
                expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, '...', 10]);
                current.value = 1;
                expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, '...', 10]);
              });

              describe('foldedMaxPageBtn', () => {


                const initPageNumList = (foldedMaxPageBtn = 3) => {
                  const current = ref(1);
                  const { getPageNumList } = getPagination({
                    total: 50, pageSize: 5, maxPageBtn: 5, foldedMaxPageBtn,
                  }, { currentValue: current });
                  return { getPageNumList, current };
                };

                // need test leftEdgeNum ?


                test('foldedMaxPageBtn = 3', () => {
                  const { getPageNumList } = initPageNumList();
                  expect(mapValue(getPageNumList())).toMatchObject([1, 2, '...', 10]);
                });

                test('foldedMaxPageBtn = 7', () => {
                  const { getPageNumList, current } = initPageNumList(7);
                  expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, 6, '...', 10]);
                  current.value = 4;
                  expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, 6, '...', 10]);
                  current.value = 6;
                  expect(mapValue(getPageNumList())).toMatchObject([1, '...', 4, 5, 6, 7, 8, 9, 10]);
                  current.value = 8;
                  expect(mapValue(getPageNumList())).toMatchObject([1, '...', 5, 6, 7, 8, 9, 10]);
                });

                test('foldedMaxPageBtn = 8', () => {
                  const { getPageNumList } = initPageNumList(8);
                  expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, '...', 10]);
                });

                test('foldedMaxPageBtn = 9', () => {
                  const { getPageNumList } = initPageNumList(9);
                  expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                });

                test('foldedMaxPageBtn = 20', () => {
                  const { getPageNumList } = initPageNumList(20);
                  expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                });

              });
            });


            describe('not show edge', () => {
              const getHide = (props: PaginationProps, value?: { currentValue?: Ref<number> }) => getPagination({
                ...props,
                showEdgePageNum: false,
              }, value);
              test('current is left edge', () => {
                const { getPageNumList } = getHide({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                });
                expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, '...']);
              });

              test('current is end edge', () => {
                const current = ref(10);
                const { getPageNumList } = getHide({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                }, { currentValue: current });
                expect(mapValue(getPageNumList())).toMatchObject(['...', 6, 7, 8, 9, 10]);
              });

              test('current is middle', () => {
                const current = ref(5);
                const { getPageNumList } = getHide({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                }, { currentValue: current });
                expect(mapValue(getPageNumList())).toMatchObject(['...', 3, 4, 5, 6, 7, '...']);
              });

              test('current is 4', () => {
                const current = ref(4);
                const { getPageNumList } = getHide({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                }, { currentValue: current });
                expect(mapValue(getPageNumList())).toMatchObject([1, 2, 3, 4, 5, '...']);
              });

              test('current is 6', () => {
                const current = ref(6);
                const { getPageNumList } = getHide({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                }, { currentValue: current });
                expect(mapValue(getPageNumList())).toMatchObject(['...', 4, 5, 6, 7, 8, '...']);
              });

              test('current is 5', () => {
                const current = ref(5);
                const { getPageNumList } = getHide({
                  total: 50, pageSize: 5, maxPageBtn: 5,
                }, { currentValue: current });
                expect(mapValue(getPageNumList())).toMatchObject(['...', 3, 4, 5, 6, 7, '...']);
              });
            });
          });
        });
      });
    });
  });
});
