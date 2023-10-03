/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export function MapElement<T>(ob1: T, ob2: T): T {
  var res: T = ob1;
  for (var [key, value] of Object.entries(ob2)) {
    if (key != '_id' && key != 'createdAt' && res[key]) res[key] = value;
  }

  return res;
}

export function DeleteElement<T>(ob1: T, keysToIgnore: [string]): T {
  var res: T;

  for (var [key, value] of Object.entries(ob1)) {
    if (!keysToIgnore.includes(key) && value) res[key] = value;
  }

  return res;
}
