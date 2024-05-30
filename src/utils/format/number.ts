import type { Numeric } from '@/mappings/types/common';

import numberFrom from '@/utils/number/from';

/**
 * 숫자 형식화
 * @param v 형식화할 숫자
 * @param options 옵션
 * @link {@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#syntax}
 * @return 형식화된 숫자
 * @example
 * number(123456.789, { maximumFractionDigits: 0 }); // '123,457' => 쉼표와 숫자를 표시하고 소수점 없음
 * number(123456.789, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // '123,456.79' => 쉼표와 숫자를 표시하고 소수점 이하 2자리 고정
 * number(123456.789, { minimumFractionDigits: 4, maximumFractionDigits: 4 }); // '123,456.7890' => 쉼표와 숫자를 표시하고 소수점 이하 4자리 고정
 * number(123456.789, { maximumFractionDigits: 4 }); // '123,456.789' => 쉼표, 숫자, 최대 소수점 이하 4자리까지 표시
 * number(123456.789, { minimumFractionDigits: 2, maximumFractionDigits: 4 }); // '123,456.789' => 숫자만 표시하고 소수점 이하 2자리, 최대 4자리까지 표시
 */
const number = (v: Numeric, options?: Intl.NumberFormatOptions) => {
    v = numberFrom(v, NaN);

    return isNaN(v) ? '' : v.toLocaleString('ko', options);
};

export default number;
