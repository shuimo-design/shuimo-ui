import { reactive, toRefs } from 'vue';

export default function useTypeTable(props: any) {
  const { minDate, maxDate, date, value } = toRefs(props);
  const tableRows = reactive<Array<Array<CellType>>>([[], [], [], [], [], []]);

  return {
    minDate,
    maxDate,
    date,
    value,
    tableRows
  };
}
