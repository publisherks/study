import isEmpty from '@/utils/isEmpty';

/**
 * `null`, `undefined`, `[]`(빈 배열), `{}`(빈 객체), `''`(빈 문자열)에 대한 항목을 삭제한 새로운 배열 반환
 * @param array 배열
 * @return `null`, `undefined`, `[]`(빈 배열), `{}`(빈 객체), `''`(빈 문자열)에 대한 항목을 삭제한 새로운 배열
 * @example
 * clean([null, 0, '', 1, [], {}]); // [0, 1]
 */
const clean = <T>(array: T[]) => array.filter((value) => !isEmpty(value));

export default clean;
