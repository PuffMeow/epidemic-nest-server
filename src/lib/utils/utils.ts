type primityType =
  | 'array'
  | 'object'
  | 'function'
  | 'string'
  | 'number'
  | 'null'
  | 'undefined'
  | 'boolean'
  | 'symbol'
  | 'bigint'
  | 'date'
  | 'regexp';

/** 获取一个数据的类型 */
export function getTypeof(data: unknown): primityType {
  if (!data) return;
  return Object.prototype.toString.call(data).toLowerCase().slice(8, -1);
}

/** 移除一个对象中的某一个属性 */
export function removeKeyInObject<T extends object>(
  obj: T,
  toBeRemovedKey: keyof T,
) {
  const { [toBeRemovedKey]: _, ...others } = obj;
  return others;
}

/** 删除数组每一项里的对象中的某个属性 */
export function removeKeyInArray(array: any[], key: string) {
  return array.map(item => {
    if (getTypeof(item) === 'object') {
      return removeKeyInObject(item, key);
    }
  });
}

/** 将 url query 解析成一个对象 */
export function parseUrlQuery(url: string): Record<string, unknown> {
  const obj = {};
  const query = url.split('?')[1];

  for (const kV of query.split('&')) {
    const key = kV.split('=')[0];
    const val = kV.split('=')[1];

    obj[key] = val;
  }

  return obj;
}

/** 将一个url key-val 对象拼接成字符串 */
export function joinUrlQueryObj(obj: Record<string, unknown>): string {
  let query = '';

  Object.keys(obj).forEach((key, idx) => {
    if (idx !== Object.keys(obj).length - 1) {
      query = query += `${key}=${obj[key]}&`;
    } else {
      query = query += `${key}=${obj[key]}`;
    }
  });

  return query;
}

/** 将 url query 上的 key 进行字典序排序并返回 query */
export function sortKeyForUrlQuery(url: string): string {
  const parseQueryObj = parseUrlQuery(url);
  const sortParseQueryObj = {};
  Object.keys(parseQueryObj)
    .sort()
    .forEach(key => {
      sortParseQueryObj[key] = parseQueryObj[key];
    });

  return joinUrlQueryObj(sortParseQueryObj);
}
