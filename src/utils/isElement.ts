/**
 * `HTMLElement` 여부 반환
 * @param value 확인할 값
 * @return `HTMLElement` 여부
 */
const isElement = (value: unknown): value is HTMLElement => value instanceof HTMLElement;

export default isElement;
