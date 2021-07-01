function deepClone<T extends Object | Date | RegExp>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;

  let temp: T;

  if (obj instanceof Date) {
    temp = new Date(obj) as T;
  } else if (obj instanceof RegExp) {
    temp = new RegExp(obj) as T;
  } else {
    temp = obj.constructor();
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      temp[key] = deepClone(obj[key]);
    }
  }

  return temp;
}

export default deepClone;
