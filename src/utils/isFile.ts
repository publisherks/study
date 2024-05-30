/**
 * `File` 객체 여부 반환
 * @param value 확인할 값
 * @return `File` 객체 여부
 */
const isFile = (value: unknown): value is File => value instanceof File;

export default isFile;
