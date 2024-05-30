import type { Numeric } from '@/mappings/types/common';

import numberFrom from '@/utils/number/from';

/**
 * 숫자에 쉼표 추가
 * @param v 쉼표를 추가할 숫자
 * @return 쉼표가 추가된 숫자
 * @example
 * comma(123456.789); // '123,456.789'
 * comma('123456.789'); // '123,456.789'
 * comma('abc'); // ''
 */
const comma = (v: Numeric) => {
    v = numberFrom(v, NaN);

    if (isNaN(v)) {
        return '';
    }

    const [, precision] = String(v)
        .split('.');

    let value = Math.trunc(v)
        .toLocaleString();

    if (precision) {
        value += `.${precision}`;
    }

    return value;
};

export default comma;
