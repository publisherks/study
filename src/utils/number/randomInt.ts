/**
 * 범위 사이의 랜덤 정수 반환
 * @param from 최소 값
 * @param to 최대 값
 * @returns 범위 사이의 랜덤 정수
 */
const randomInt = (from: number, to: number) => Math.floor((Math.random() * (to - from + 1)) + from);

export default randomInt;
