/**
 * `Date` 객체 여부 반환
 * @param value 확인할 값
 * @return `Date` 객체 여부
 */
const isDate = (value: unknown): value is Date => value instanceof Date;

export default isDate;
