/**
 * `FileList` 객체 여부 반환
 * @param value 확인할 값
 * @return `FileList` 객체 여부
 */
const isFileList = (value: unknown): value is FileList => value instanceof FileList;

export default isFileList;
