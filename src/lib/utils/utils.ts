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
  | 'bigint';
export function getTypeof(data: any): primityType {
  if (!data) return;
  return Object.prototype.toString.call(data).toLowerCase().slice(8, -1);
}

export function removeKeyInObject<T extends object>(
  obj: T,
  toBeRemovedKey: keyof T,
) {
  const { [toBeRemovedKey]: _, ...others } = obj;
  return others;
}

export function removeKeyInArray(array: any[], key: string) {
  return array.map(item => {
    if (getTypeof(item) === 'object') {
      return removeKeyInObject(item, key);
    }
  });
}
