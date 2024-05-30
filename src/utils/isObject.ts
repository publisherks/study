/**
 * 객체 여부 반환
 * @param value 확인할 값
 * @return 객체 여부
 */
const isObject = (value: unknown): value is object => (Object.prototype.toString.call(value) === '[object Object]');

export default isObject;
