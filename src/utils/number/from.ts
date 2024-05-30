import type { Numeric } from '@/mappings/types/common';

/**
 * `value` 값을 `number` 타입으로 변환 시 유효한 숫자인 경우 `number` 타입으로 변환한 값을 반환하고 그렇지 않은 경우 `defaultValue`(기본 값) 반환
 * @param value 값
 * @param defaultValue 기본 값
 * @return `number` 타입으로 변환한 값 또는 `defaultValue`(기본 값)
 * @example
 * from('1.23', 1); // 1.23
 * from('abc', 1); // 1
 */
const from = (value: Numeric, defaultValue: number): number => {
    if (isFinite(Number(value))) {
        value = Number.parseFloat(String(value));
    }

    value = value as number;

    return isNaN(value) ? defaultValue : value;
};

export default from;
