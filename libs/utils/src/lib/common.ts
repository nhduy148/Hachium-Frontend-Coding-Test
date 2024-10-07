import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';

export type EmptyObject = {
  [K in string | number]: never;
};

export const isNilOrEmpty = (value: any): value is null | undefined | '' | EmptyObject =>
  isNil(value) || isEmpty(value);

export function compareObjects(obj1: any, obj2: any, fieldsToCompare: string[]) {
  for (const field of fieldsToCompare) {
    if (!isEqual(obj1[field], obj2[field])) {
      return false;
    }
  }
  return true;
}

export function filterByRange<T>(data: T[], property: keyof T, value1: number, value2: number): T[] {
  return filter(data, (item) => {
    const propValue = item[property];

    if (typeof propValue !== 'number') {
      throw new Error(`Property '${String(property)}' is not a number`);
    }

    if (value2 === Infinity) {
      return propValue >= value1;
    }

    return propValue >= value1 && propValue <= value2;
  });
}

export function replaceLastCharIf(value: string, char: string, replacement: string) {
  return value.slice(-1) === char ? value.slice(0, -1) + replacement : value;
}

export function findLTEClosestKeyInObject(obj: Record<string, any>, targetValue: number) {
  let closestKey = null;
  let minDifference = Infinity;

  for (const key in obj) {
    const numericKey = Number(key);
    if (numericKey <= targetValue) {
      const difference = targetValue - numericKey;
      if (difference < minDifference) {
        minDifference = difference;
        closestKey = numericKey;
      }
    }
  }

  return closestKey !== null ? obj[closestKey] : null;
}
