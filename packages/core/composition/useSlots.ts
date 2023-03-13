/**
 * @description slots hook
 * @author 阿怪
 * @date 2023/3/13 20:37
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export default function useSlots(slots: any) {

  const getSlots = () => {
    // is React
    if(Array.isArray(slots)){
      return slots;
    }

    // is Vue
    if(slots.default){
      return slots.default()
    }
  };


  return {
    getSlots
  }
}
