import type {
    RequestClientList,
    ResponseClientList,
    ResponseClientInfo,
} from '@/api/client/interface';

import { Response } from '@/mappings/enum';
import clients from '@/mappings/json/client.json';

// ***************** 임시 코드 시작 ***************** //
// ********** (실제 개발 시 임시 코드 삭제) ********** //
const datas = clients.map((value) => value);
// ***************** 임시 코드 끝 ***************** //

/**
 * 계정 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestClientList = async (params: RequestClientList) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 목록 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const lists = datas;
    const { size = 12 } = params;
    const response: ResponseClientList = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: lists.length,
        data: datas.slice(size * (params.page - 1), size * params.page),
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 계정 정보 조회
 * @param idx idx
 * @return 응답 데이터
 */
const requestClientInfo = async (seq: number) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 정보 조회 API 요청 로직 구현 필요
    // const url = `${baseURL}/${idx}`;

    // return await request.get<ResponseAgencyInfo>(url);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseClientInfo = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 1,
        data: datas.find((value) => (seq === value.seq)),
    };

    // 데이터가 없는 경우 (비정상 접근 시)
    if (!response.data) {
        Object.assign(response, {
            code: Response.Error,
            messageKo: '해당 데이터가 존재하지 않습니다.',
            messageEn: 'The result does not exist.',
        });
    }

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

export {
    requestClientList,
    requestClientInfo,
};
