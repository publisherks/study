/**
 * 문자열의 첫 글자를 대문자로 변환
 * @param string 변환 전 문자열
 * @return 변환 후 문자열
 */
const capitalize = (string: string) => {
    const first = string.charAt(0)
        .toUpperCase();

    return `${first}${string.substring(1)}`;
};

export default capitalize;
