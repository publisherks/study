const byteLimit = 1000;

/**
 * 파일 크기 형식화
 * @param size 형식화할 파일 크기
 * @return 형식화된 파일 크기
 * @example
 * fileSize(123); // '123 bytes'
 * fileSize(123456); // '123KB'
 * fileSize(123456789); // '123MB'
 * fileSize(9999999999); // '10GB'
 */
const fileSize = (size: number) => {
    let out = size.toLocaleString('en', {
        notation: 'compact',
        style: 'unit',
        unit: 'byte',
        unitDisplay: (size < byteLimit) ? 'short' : 'narrow',
    });

    if (size > 1 && size < byteLimit) {
        out += 's';
    }

    return out.replaceAll('BB', 'GB');
};

export default fileSize;
