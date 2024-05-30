import type { Numeric } from '@/mappings/types/common';

import numberFrom from '@/utils/number/from';

// type
type Params = {
    /** hostname */
    host?: string;

    /** port */
    port?: Numeric;
};

/**
 * URL로 변환
 * @param host hostname (빈 값인 경우 `location.hostname`_(브라우저의 hostname)_ 값으로 설정)
 * @param port port (빈 값인 경우 `location.port`_(브라우저의 port)_ 값으로 설정)
 * @return URL
 * @example
 * url({ host: 'localhost', port: 8080 }); // 'http://localhost:8080'
 * url({ host: 'localhost' }); // 'http://localhost'
 * url({ host: 'localhost', port: 80 }); // 'http://localhost'
 * url({ host: 'localhost', port: 443 }); // 'https://localhost'
 */
const url = ({ host, port }: Params) => {
    // 브라우저의 hostname 및 port 값을 가져옴
    const { hostname, port: currentPort } = location;

    // 브라우저의 protocol 값을 가져옴
    let { protocol } = location;

    // hostname 값이 빈 값인 경우 브라우저의 hostname 값으로 설정
    host ||= hostname;

    // port 값이 빈 값인 경우 브라우저의 port 값으로 설정
    port = numberFrom(port ?? NaN, numberFrom(currentPort, 80));

    // port 값이 443인 경우 protocol 값을 'https'로 설정
    if (port === 443) {
        protocol = 'https';
    }

    // protocol 값의 끝에 ':'이 없는 경우 추가
    if (protocol.substr(-1) !== ':') {
        protocol += ':';
    }

    // URL에 protocol 값과 hostname 값 추가
    let url = [protocol, host].join('//');

    // port 값이 80이 아니고 protocol 값이 'https:'가 아닌 경우 URL에 port 값 추가
    if (port !== 80 && protocol !== 'https:') {
        url += `:${port}`;
    }

    return url;
};

export default url;
