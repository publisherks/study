/**
 * 숫자 형식 여부 반환
 * @param value 확인할 값
 * @return 숫자 형식 여부
 */
const isNumeric = (value: unknown) => {
    const number = Number.parseFloat(String(value));

    return (!isNaN(number) && isFinite(number));
};

export default isNumeric;
