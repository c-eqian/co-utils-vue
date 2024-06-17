import { useValPassword } from '../src';

describe('useValPassword', () => {
  it('具有大小写、数字、特殊字符', () => {
    expect(useValPassword('Passw0rd!')).toBeTruthy();
    expect(useValPassword('PASSWORD123!')).toBeFalsy();
    expect(useValPassword('PAaaWORD123!')).toBeTruthy();
    expect(useValPassword('P0rd!')).toBeFalsy();
    expect(useValPassword('PASSWO396636RD123!')).toBeFalsy();
    expect(useValPassword('PAaaWO396636RD123!', 6, 20)).toBeTruthy();
  });
  it('具有大小写', () => {
    expect(useValPassword('Passw0rd')).toBeFalsy();
    expect(useValPassword('PASSWORD123')).toBeFalsy();
    expect(useValPassword('PAaaWORD123')).toBeFalsy();
    expect(useValPassword('P0rd')).toBeFalsy();
    expect(useValPassword('PASSWO396636RD123')).toBeFalsy();
    expect(useValPassword('PAaaWO396636RD123', 6, 20)).toBeFalsy();
  });
    it('具有数字，特殊字符', () => {
        expect(useValPassword('@123456')).toBeFalsy();
        expect(useValPassword('@111396636123!')).toBeFalsy();
    });
});
