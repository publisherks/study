/**
 * 파일 유효성 확인
 * @param file 파일
 * @param accept 파일 형식
 * @return 파일 유효성 여부
 */
const isValidFile = (file?: File, accept?: string) => {
    if (!file) {
        return false;
    }

    const { name, type } = file;

    return (
        !accept
        || (
            accept.includes(',')
            && accept.split(',')
                .map((ext) => ext.toLowerCase())
                .includes(name.toLowerCase())
        )
        || type.toLowerCase()
            .includes(
                accept.replaceAll('/*', '')
                    .toLowerCase(),
            )
    );
};

export default isValidFile;
