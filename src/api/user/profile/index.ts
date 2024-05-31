// import request from '@/api';
import type { ResponseProfileInfo, RequestModifyProfile, ResponseModifyProfile, RequestModifyProfilePassword, ResponseModifyProfilePassword } from '@/api/user/profile/interface';

import { Response } from '@/mappings/enum';
import users from '@/mappings/json/users.json';

// import request from '@/plugins/axios';

// const baseURL = '/api/user/profile';

/**
 * 내 정보 조회
 * @return 응답 데이터
 */
const requestProfileInfo = async () => { // eslint-disable-line require-await
    // FIXME: 실제 내 정보 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseProfileInfo>(url);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const index = users.findIndex(({ name }) => (name === '서명환'));
    const response: ResponseProfileInfo = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 1,
        data: {
            ...users[index],
            idx: (index + 1),
            rowNbr: (users.length - index),
        },
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 내 정보 수정
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyProfile = async (data: RequestModifyProfile) => { // eslint-disable-line
    // const url = baseURL;

    // return await request.put<ResponseModifyProfile>(url, data);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseModifyProfile = {
        code: Response.Success,
        messageKo: '수정이 완료되었습니다.',
        messageEn: 'Modification is complete.',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 0,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 내 비밀번호 수정
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyProfilePassword = async (data: RequestModifyProfilePassword) => { // eslint-disable-line
    // const url = `${baseURL}/password`;

    // return await request.put<ResponseModifyProfilePassword>(url, data);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseModifyProfilePassword = {
        code: Response.Success,
        messageKo: '수정이 완료되었습니다.',
        messageEn: 'Modification is complete.',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 0,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

export {
    requestProfileInfo,
    requestModifyProfile,
    requestModifyProfilePassword,
};
