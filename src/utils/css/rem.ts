/**
 * `px`(픽셀)을 `rem`으로 변환
 * @param px 픽셀
 * @param base rem 기준 픽셀
 * @return rem
 */
const rem = (px: number, base = 16) => `${1 / base * px}rem`;

export default rem;
