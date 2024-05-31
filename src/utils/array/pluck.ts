import type { KeyValuePair } from '@/mappings/types/common';

/**
 * 배열의 각 항목에서 `propertyName`(프로퍼티명)의 값이 있는 새로운 배열 반환
 * @param array 값을 가져올 배열
 * @param propertyName 각 항목에서 가져올 프로퍼티명
 * @return 배열의 각 항목에서 `propertyName`(프로퍼티명)의 값이 있는 새로운 배열
 * @example
 * pluck([{ a: 1, b: 2 }, { a: 2, b: 3 }], 'a'); // [1, 2]
 */
const pluck = <T extends KeyValuePair<any>, U extends keyof T>(array: T[], propertyName: U) => array.map(({ [propertyName]: value }) => value);

export default pluck;
