import type { JSON } from '@/mappings/types/common';

import isObject from '@/utils/isObject';

/**
 * `JSON` 여부 반환
 * @param value 확인할 값
 * @return `JSON` 여부
 */
const isJSON = (value: unknown): value is JSON => (Array.isArray(value) || isObject(value));

export default isJSON;
