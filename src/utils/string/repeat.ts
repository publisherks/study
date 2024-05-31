/**
 * 문자열 패턴 반복
 * @param pattern 반복되는 패턴
 * @param count 패턴을 반복하는 횟수
 * @param sep 각 패턴을 구분하는 문자열
 * @return 반복된 문자열
 */
const repeat = (pattern: string, count: number, sep = '') => new Array<string>(Math.max(0, count))
    .fill(pattern)
    .join(sep);

export default repeat;
