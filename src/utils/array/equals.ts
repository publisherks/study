/**
 * 두 배열의 내용 동일 여부 확인
 * @param array1 배열 1
 * @param array2 배열 2
 * @return 두 배열의 내용 동일 여부
 */
const equals = (array1: unknown[], array2: unknown[]) => (array1.length === array2.length && array1.every((value, index) => (value === array2[index])));

export default equals;
