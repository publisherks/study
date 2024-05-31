/**
 * 숫자에 쉼표 추가
 * @param v 쉼표를 추가할 숫자
 * @return 쉼표가 추가된 숫자
 * @example
 * comma(123456.789); // '123,456.789'
 */
const comma = (v: number) => {
    if (isNaN(v)) {
        return '';
    }

    const [, precision] = String(v)
        .split('.');

    let value = Math.trunc(v)
        .toLocaleString();

    if (precision) {
        value += `.${precision}`;
    }

    return value;
};

export default comma;
