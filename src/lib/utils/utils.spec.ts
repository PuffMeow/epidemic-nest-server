import {
  getTypeof,
  joinUrlQueryObj,
  parseUrlQuery,
  removeKeyInObject,
  sortKeyForUrlQuery,
} from './utils';

describe('utils test', () => {
  it('getTypeof should return regexp', () => {
    expect(getTypeof(/\w+/g)).toBe('regexp');
  });

  it('getTypeof should return date', () => {
    expect(getTypeof(new Date())).toBe('date');
  });

  it('removeKeyInObject should remove on specified key', () => {
    expect(removeKeyInObject({ a: 1, b: 2, c: 3 }, 'c')).toMatchObject({
      a: 1,
      b: 2,
    });
  });

  it('parseUrlQuery should parse on url', () => {
    expect(
      parseUrlQuery(
        'https://apis.map.qq.com/ws/geocoder/v1?location=28.7033487,115.8660847&key=5Q5BZ-5EVWJ-SN5F3-K6QBZ',
      ),
    ).toMatchObject({
      location: '28.7033487,115.8660847',
      key: '5Q5BZ-5EVWJ-SN5F3-K6QBZ',
    });
  });

  it('joinUrlQueryObj should join a obj into an url query', () => {
    expect(
      joinUrlQueryObj({
        location: '28.7033487,115.8660847',
        key: '5Q5BZ-5EVWJ-SN5F3-K6QBZ',
      }),
    ).toBe('location=28.7033487,115.8660847&key=5Q5BZ-5EVWJ-SN5F3-K6QBZ');
  });

  it('sort the key of url query', () => {
    expect(
      sortKeyForUrlQuery(
        'https://apis.map.qq.com/ws/geocoder/v1?location=28.7033487,115.8660847&key=5Q5BZ-5EVWJ-SN5F3-K6QBZ',
      ),
    ).toBe('key=5Q5BZ-5EVWJ-SN5F3-K6QBZ&location=28.7033487,115.8660847');
  });
});
