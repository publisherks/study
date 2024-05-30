import type { Numeric } from '@/mappings/types/common';

import numberFrom from '@/utils/number/from';

const byteLimit = 1000;

/**
 * 파일 크기 형식화
 * @param size 형식화할 파일 크기
 * @return 형식화된 파일 크기
 * @example
 * fileSize(123); // '123 bytes'
 * fileSize('123'); // '123 bytes'
 * fileSize(123456); // '123KB'
 * fileSize('123456'); // '123KB'
 * fileSize(123456789); // '123MB'
 * fileSize('123456789'); // '123MB'
 * fileSize(9999999999); // '10GB'
 * fileSize('9999999999'); // '10GB'
 * fileSize('abc'); // ''
 */
const fileSize = (size: Numeric) => {
    size = numberFrom(size, NaN);

    if (isNaN(size)) {
        return '';
    }

    let out = size.toLocaleString('en', {
        notation: 'compact',
        style: 'unit',
        unit: 'byte',
        unitDisplay: (size < byteLimit) ? 'short' : 'narrow',
    });

    if (size > 1 && size < byteLimit) {
        out += 's';
    }

    return out.replaceAll('BB', 'GB');
};

export default fileSize;
