/**
 * @description core avatar test
 * @author 阿怪
 * @date 2025/1/14 09:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { describe, expect, it } from 'vitest';
import { AvatarCore } from '../../../components/base/avatar';
import { getPropsDefault } from '../../test.tools.ts';


const { props, useAvatar } = AvatarCore;
const defaultProps = getPropsDefault(props);

describe('avatar hook test', () => {

  describe('expect current class', () => {

    it('default', () => {
      const { renderInit } = useAvatar(defaultProps);
      expect(renderInit().avatarClass)
        .toMatchObject(['m-avatar', 'm-avatar-circle', 'm-avatar-default',]);
    });

    it('square and small',()=>{
      const { renderInit } = useAvatar({...defaultProps,variant:'square',size:'small'});
      expect(renderInit().avatarClass)
        .toMatchObject(['m-avatar', 'm-avatar-square', 'm-avatar-small',]);
    })

  });

  describe('expect current img', () => {

    it.skip('empty img',()=>{

    })

  })

});
