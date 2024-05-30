/**
 * 문자열의 첫 글자를 소문자로 변환
 * @param string 변환 전 문자열
 * @return 변환 후 문자열
 */
const uncapitalize = (string: string) => {
    const first = string.charAt(0)
        .toLowerCase();

    return `${first}${string.substring(1)}`;
};

export default uncapitalize;
