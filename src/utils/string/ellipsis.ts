/**
 * 문자열 끝에 `...` 추가
 * @param value 생략할 문자열
 * @param length 허용할 최대 길이
 * @param isWord 단어 기준 생략 여부
 * @return 변환된 텍스트
 */
const ellipsis = (value: string, length: number, isWord?: boolean) => {
    if (value && length < value.length) {
        if (isWord) {
            const vs = value.substr(0, length - 2);
            const index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));

            if (index >= 0 && index >= (length - 15)) {
                return `${vs.substr(0, index)}...`;
            }
        }

        return `${value.substr(0, length - 3)}...`;
    }

    return value;
};

export default ellipsis;
