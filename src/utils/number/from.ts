/**
 * `value` 값을 `number` 타입으로 변환 시 유효한 숫자인 경우 `number` 타입으로 변환한 값을 반환하고 그렇지 않은 경우 `defaultValue`(기본 값) 반환
 * @param value 값
 * @param defaultValue 기본 값
 * @return `number` 타입으로 변환한 값 또는 `defaultValue`(기본 값)
 * @example
 * from('1.23', 1); // 1.23
 * from('abc', 1); // 1
 */
const from = (value: any, defaultValue: number): number => {
    if (isFinite(value)) {
        value = Number.parseFloat(value);
    }

    return isNaN(value) ? defaultValue : value;
};

export default from;
