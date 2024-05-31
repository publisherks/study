import type { KeyValuePair, Nullish } from '@/mappings/types/common';

import isNullish from '@/utils/isNullish';
import isObject from '@/utils/isObject';

/**
 * `null`, `undefined`, `[]`(빈 배열), `{}`(빈 객체), `''`(빈 문자열) 여부 반환
 * @param value 확인할 값
 * @param isAllowEmptyString `''`(빈 문자열) 허용 여부
 * @return `null`, `undefined`, `[]`(빈 배열), `{}`(빈 객체), `''`(빈 문자열) 여부
 */
const isEmpty = (value: unknown, isAllowEmptyString?: boolean): value is Nullish | '' | [] | KeyValuePair<never> => (
    isNullish(value)
    || (!isAllowEmptyString && value === '')
    || (Array.isArray(value) && !value.length)
    || (isObject(value) && !Object.keys(value).length)
);

export default isEmpty;
