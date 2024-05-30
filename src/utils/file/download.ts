/**
 * 파일 다운로드
 * @param data 데이터
 * @param name 파일 이름
 * @param type 파일 구분
 */
const download = (data: string, name: string, type?: string) => {
    const link = document.createElement('a');

    document.body.appendChild(Object.assign(link, {
        download: name,
        href: URL.createObjectURL(new Blob([data], { type })),
    }));

    link.click();
    link.remove();
};

export default download;
