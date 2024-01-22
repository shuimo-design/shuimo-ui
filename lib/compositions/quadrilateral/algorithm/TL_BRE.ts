/**
 * @description deg mode top left and bottom right empty algorithm
 * @author 阿怪
 * @date 2023/6/29 00:18
 * @version v1.0.0
 *
 * case: DB 0101 5
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { DegModeOptions, getPoints, initCase, QPoints, tan } from './common';

export default function TL_BRE(options: DegModeOptions): QPoints {
  const {
    w, h, degList, degDecimal,
    A, B, C, D,
  } = initCase(options);

  let { Pa, Pb, Pc, Pd } = getPoints();

  Pb = { x: w, y: 0 };
  Pd = { x: 0, y: h };

  const Ka = tan(A);
  const Ba = w * Ka * -1;
  const Kd = tan(90 - D) * -1;
  const Bd = h;

  const Xa = (Bd - Ba) / (Ka - Kd);
  const Ya = Ka * Xa + Ba;
  Pa = { x: Xa, y: Ya };


  if (tan(B) !== 0) {
    const Kb = -1 / tan(B);
    const Bb = Kb * -1 * w;

    const Kc = tan(C);
    const Bc = h;

    const Xc = (Bb - Bc) / (Kc - Kb);
    const Yc = Kb * Xc + Bb;
    Pc = { x: Xc, y: Yc };
  }else{
    const Yc = h - w * tan(-C);
    Pc = { x: w, y: Yc };
  }




  return [Pa, Pb, Pc, Pd];

}
