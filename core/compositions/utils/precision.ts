/**
 * @description 精度处理工具函数
 * @author cursor
 * @date 2025/05/30
 * @version v1.0.0
 *
 * 解决JavaScript浮点数计算精度问题
 */

/**
 * 获取数字的小数位数
 * @param num 数字
 * @returns 小数位数
 */
export function getDecimalPlaces(num: number): number {
  const str = num.toString();
  const dotIndex = str.indexOf('.');
  if (dotIndex === -1) return 0;
  return str.length - dotIndex - 1;
}

/**
 * 精确加法
 * @param a 第一个数
 * @param b 第二个数
 * @returns 精确的加法结果
 */
export function preciseAdd(a: number, b: number): number {
  const aDecimals = getDecimalPlaces(a);
  const bDecimals = getDecimalPlaces(b);
  const maxDecimals = Math.max(aDecimals, bDecimals);
  const multiplier = Math.pow(10, maxDecimals);
  
  return Math.round((a * multiplier + b * multiplier)) / multiplier;
}

/**
 * 精确乘法
 * @param a 第一个数
 * @param b 第二个数
 * @returns 精确的乘法结果
 */
export function preciseMultiply(a: number, b: number): number {
  const aDecimals = getDecimalPlaces(a);
  const bDecimals = getDecimalPlaces(b);
  const maxDecimals = Math.max(aDecimals, bDecimals);
  const multiplier = Math.pow(10, maxDecimals);
  
  return Math.round((a * multiplier) * (b * multiplier)) / (multiplier * multiplier);
}

/**
 * 精确除法
 * @param a 被除数
 * @param b 除数
 * @returns 精确的除法结果
 */
export function preciseDivide(a: number, b: number): number {
  const aDecimals = getDecimalPlaces(a);
  const bDecimals = getDecimalPlaces(b);
  const maxDecimals = Math.max(aDecimals, bDecimals);
  const multiplier = Math.pow(10, maxDecimals);
  
  const result = (a * multiplier) / (b * multiplier);
  // 对结果进行精度修正
  return toFixed(result, Math.max(aDecimals, bDecimals));
}

/**
 * 将数字格式化到指定的小数位数
 * @param num 数字
 * @param decimals 小数位数
 * @returns 格式化后的数字
 */
export function toFixed(num: number, decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(num * multiplier) / multiplier;
}

/**
 * 基于步长计算精确值 - 高性能版本
 * @param value 当前值
 * @param min 最小值
 * @param max 最大值
 * @param step 步长
 * @returns 精确的步长值
 */
export function getStepValue(value: number, min: number, max: number, step: number): number {
  // 计算相对于最小值的差值
  const diff = value - min;
  
  // 获取step的小数位数
  const stepStr = step.toString();
  const stepDecimals = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
  const multiplier = Math.pow(10, stepDecimals);
  
  // 使用整数运算来避免浮点数精度问题
  const diffInt = Math.round(diff * multiplier);
  const stepInt = Math.round(step * multiplier);
  const minInt = Math.round(min * multiplier);
  
  // 计算最接近的步数
  const steps = Math.round(diffInt / stepInt);
  
  // 计算结果
  const resultInt = minInt + steps * stepInt;
  const result = resultInt / multiplier;
  
  // 确保结果在范围内
  if (result < min) return min;
  if (result > max) return max;
  
  return result;
}

/**
 * 简化版精确值计算 - 专门用于高频调用场景如滑块
 * @param value 当前值
 * @param min 最小值
 * @param step 步长
 * @param stepDecimals 步长的小数位数（预先计算好传入，避免重复计算）
 * @returns 精确的步长值
 */
export function getStepValueFast(value: number, min: number, step: number, stepDecimals: number): number {
  const diff = value - min;
  const multiplier = Math.pow(10, stepDecimals);
  
  // 使用与getStepValue相同的整数运算逻辑
  const diffInt = Math.round(diff * multiplier);
  const stepInt = Math.round(step * multiplier);
  const minInt = Math.round(min * multiplier);
  
  // 计算最接近的步数
  const steps = Math.round(diffInt / stepInt);
  
  // 计算结果
  const resultInt = minInt + steps * stepInt;
  return resultInt / multiplier;
} 