import type { Nullish } from '@/mappings/types/common';

import isEmpty from '@/utils/isEmpty';

/**
 * `value` 값이 `null`, `undefined`, `[]`(빈 배열), `{}`(빈 객체), `''`(빈 문자열)이 아닌 경우 `value` 값을 반환하고 그렇지 않은 경우 `defaultValue` 값 반환
 * @param value 확인할 값
 * @param defaultValue `value` 값이 `null`, `undefined`, `[]`(빈 배열), `{}`(빈 객체), `''`(빈 문자열)인 경우 반환할 값
 * @param isAllowBlank `''`(빈 문자열) 허용 여부
 * @return `value` 값이 `null`, `undefined`, `[]`(빈 배열), `{}`(빈 객체), `''`(빈 문자열)이 아닌 경우 `value` 값, 그렇지 않은 경우 `defaultValue` 값
 */
const valueFrom = <T, U>(value: T, defaultValue: U, isAllowBlank?: boolean) => (
    isEmpty(value, isAllowBlank)
        ? defaultValue
        : value
) as T extends Nullish | '' | [] | Record<string, never> ? U : T;

export default valueFrom;
