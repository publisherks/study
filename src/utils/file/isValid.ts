/**
 * 파일 유효성 확인
 * @param file 파일
 * @param accept 파일 형식
 * @return 파일 유효성 여부
 */
const isValid = (file?: File, accept?: string) => {
    if (!file) {
        return false;
    }

    const name = file.name.toLowerCase();

    return (
        !accept
        || (
            accept.includes(',')
            && accept.split(',')
                .some((ext) => (name === ext.toLowerCase()))
        )
        || file.type.toLowerCase()
            .includes(
                accept.replaceAll('/*', '')
                    .toLowerCase(),
            )
    );
};

export default isValid;
