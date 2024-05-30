/**
 * `\n`(LF) 또는 `\r\n`(CRLF) 새 줄을 `<br />`(HTML 태그) 문자열로 변환
 * @param v 문자열 값
 * @return `\n`(LF) 또는 `\r\n`(CRLF) 새 줄 대신 `<br />` 태그로 변환된 문자열
 */
const nl2br = (v: string) => v.replace(/\r?\n/g, '<br />');

export default nl2br;
