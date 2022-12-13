/**
 * @description shuimo line svg filter
 * @author 阿怪
 * @date 2022/12/11 03:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export const LineSvgFilter = `<svg width="0" height="0">
                                 <filter id="m-line-filter">
                                      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2"/>
                                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="6"/>
                                      <feGaussianBlur in="noise" stdDeviation="0.6"/>
                                  </filter>
                              </svg>`
