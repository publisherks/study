import type {
    RequestAgencyList,
    ResponseAgencyList,
    ResponseAgencyInfo,
} from '@/api/agency/interface';

import { Response } from '@/mappings/enum';
import agencys from '@/mappings/json/agency.json';

// ***************** 임시 코드 시작 ***************** //
// ********** (실제 개발 시 임시 코드 삭제) ********** //
const datas = agencys.map((value) => value)
    .reverse();
// ***************** 임시 코드 끝 ***************** //

/**
 * 계정 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestAgencyList = async (params: RequestAgencyList) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 목록 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const lists = datas;
    // const lists = datas.filter(
    //     (value) => Object.entries(value)
    //         .every(([key, value]) => {
    //             const { [key as keyof RequestAgencyList]: param } = params;
    //             const likeSearchs = ['agencyName'];

    //             return (
    //                 key === 'id'
    //                 || typeof param === 'undefined'
    //                 || (
    //                     likeSearchs.includes(key)
    //                     && typeof value === 'string'
    //                     && typeof param === 'string'
    //                     && value.toLowerCase()
    //                         .includes(param.toLowerCase())
    //                 )
    //                 || (value === param)
    //             );
    //         }),
    // );
    const { size = 11 } = params;
    const response: ResponseAgencyList = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: lists.length,
        data: lists.slice(size * (params.page - 1), size * params.page),
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
const requestAgencyInfo = async (seq: number) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 정보 조회 API 요청 로직 구현 필요
    // const url = `${baseURL}/${idx}`;

    // return await request.get<ResponseAgencyInfo>(url);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseAgencyInfo = {
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
    requestAgencyList,
    requestAgencyInfo,
};
