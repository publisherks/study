import type { Numeric } from '@/mappings/types/common';

/**
 * 숫자 형식 여부 반환
 * @param value 확인할 값
 * @return 숫자 형식 여부
 */
const isNumeric = (value: unknown): value is Numeric => {
    if (typeof value !== 'number' && typeof value !== 'string') {
        return false;
    }

    if (typeof value !== 'number') {
        value = Number.parseFloat(value);
    }

    const number = value as number;

    return (!isNaN(number) && isFinite(number));
};

export default isNumeric;
