import type { Nullish } from '@/mappings/types/common';

/**
 * `null`, `undefined` 여부 반환
 * @param value 확인할 값
 * @return `null`, `undefined` 여부
 */
const isNullish = (value: unknown): value is Nullish => (value === null || typeof value === 'undefined');

export default isNullish;
