/**
 * @description quadrilateral deg mode
 * @author 阿怪
 * @date 2023/6/27 10:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ALGORITHM, CASE, CASE_ALGORITHM, DegModeOptions, getPolygon, QPoints, toRes } from './algorithm/common';
import TLE from './algorithm/TLE';
import BLE from './algorithm/BLE';
import TRE from './algorithm/TRE';
import BRE from './algorithm/BRE';
import TL_BRE from './algorithm/TL_BRE';
import TR_BLE from './algorithm/TR_BLE';
import ALL_CASE from './algorithm/ALL';

export default function useDegMode(w: number, h: number, degList: number[]) {
  degList = degList.map(e => e ?? 0);
  // Convert to binary according to the positive and negative values of degList, positive is 1 and negative is 0
  // 根据degList的正负值转成二进制，正为1 负为0
  const degDecimal = parseInt(degList.map(d => d >= 0 ? 1 : 0).join(''), 2) as CASE;


  const algorithm = CASE_ALGORITHM[degDecimal];

  const options: DegModeOptions = {
    w, h, degList,
    degDecimal,
  };

  let points: QPoints | undefined;

  switch (algorithm) {
    case ALGORITHM.ALL:
      ALL_CASE(options);
      points = ALL_CASE(options);

      if (degList[0] < 0) {
        degList = degList.map(e => 90 + e);
      }

      break;
    case ALGORITHM.TLE:
      points = TLE(options);
      break;
    case ALGORITHM.BLE:
      points = BLE(options);
      break;
    case ALGORITHM.TRE:
      points = TRE(options);
      break;
    case ALGORITHM.BRE:
      points = BRE(options);
      break;
    case ALGORITHM.TL_BRE:
      points = TL_BRE(options);
      break;
    case ALGORITHM.TR_BLE:
      points = TR_BLE(options);
      break;
    default:
      points = undefined;
      console.error('algorithm error');
  }
  if (!points) {
    return;
  }

  const p = toRes(points, degList);

  return {
    ...p,
    path: getPolygon(w, h, p),
  };
}
