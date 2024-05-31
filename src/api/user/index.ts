// import request from '@/api';
import type {
    RequestUserList,
    ResponseUserList,
    ResponseUserInfo,
    RequestRegistUser,
    ResponseRegistUser,
    RequestModifyUser,
    ResponseModifyUser,
    RequestModifyUserPassword,
    ResponseModifyUserPassword,
    ResponseDeleteUser,
    ResponseRestoreUser,
    RequestFindUserPassword,
    ResponseFindUserPassword,
} from '@/api/user/interface';

import { Response } from '@/mappings/enum';
import users from '@/mappings/json/users.json';

// const baseURL = '/api/user';

// ***************** 임시 코드 시작 ***************** //
// ********** (실제 개발 시 임시 코드 삭제) ********** //
const datas = users.map((value, index) => ({
    ...value,
    idx: (index + 1),
}))
    .reverse()
    .map((value, index) => ({
        ...value,
        rowNbr: (index + 1),
    }));
// ***************** 임시 코드 끝 ***************** //

/**
 * 계정 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestUserList = async (params: RequestUserList) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 목록 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const lists = datas.filter(
        (value) => Object.entries(value)
            .every(([key, value]) => {
                const { [key as keyof RequestUserList]: param } = params;
                const likeSearchs = [
                    'name',
                    'email',
                    'tel',
                ];

                return (
                    key === 'id'
                    || typeof param === 'undefined'
                    || (
                        likeSearchs.includes(key)
                        && typeof value === 'string'
                        && typeof param === 'string'
                        && value.toLowerCase()
                            .includes(param.toLowerCase())
                    )
                    || (value === param)
                );
            }),
    );
    const { size = 12 } = params;
    const response: ResponseUserList = {
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
const requestUserInfo = async (idx: number) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 정보 조회 API 요청 로직 구현 필요
    // const url = `${baseURL}/${idx}`;

    // return await request.get<ResponseUserInfo>(url);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseUserInfo = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 1,
        data: datas.find((value) => (idx === value.idx)),
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

/**
 * 계정 등록
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestRegistUser = async (data: RequestRegistUser) => { // eslint-disable-line
    // FIXME: 실제 계정 등록 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.post<ResponseRegistUser>(url, data);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseRegistUser = {
        code: Response.Success,
        messageKo: '등록이 완료되었습니다.',
        messageEn: 'Registration is complete.',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 0,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 계정 수정
 * @param idx idx
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyUser = async (idx: number, data: RequestModifyUser) => { // eslint-disable-line
    // FIXME: 실제 계정 수정 API 요청 로직 구현 필요
    // const url = `${baseURL}/${idx}`;

    // return await request.put<ResponseModifyUser>(url, data);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseModifyUser = {
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
 * 계정 비밀번호 수정
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyUserPassword = async (data: RequestModifyUserPassword) => { // eslint-disable-line
    // FIXME: 실제 계정 비밀번호 수정 API 요청 로직 구현 필요
    // const url = `${baseURL}/password`;

    // return await request.put<ResponseModifyUserPassword>(url, data);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseModifyUserPassword = {
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
 * 계정 일괄 미사용
 * @param idxes idx 목록
 * @return 응답 데이터
 */
const requestDeleteUser = async (idxes: number[]) => { // eslint-disable-line
    // FIXME: 실제 계정 일괄 미사용 API 요청 로직 구현 필요
    // const url = `${baseURL}/${idxes.join()}`;

    // return await request.delete<ResponseDeleteUser>(url);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseDeleteUser = {
        code: Response.Success,
        messageKo: '삭제가 완료되었습니다.',
        messageEn: 'Deletion is complete.',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 0,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 계정 일괄 사용
 * @param idxes idx 목록
 * @return 응답 데이터
 */
const requestRestoreUser = async (idxes: number[]) => { // eslint-disable-line
    // FIXME: 실제 계정 일괄 사용 API 요청 로직 구현 필요
    // const url = `${baseURL}/${idxes.join()}`;

    // return await request.put<ResponseRestoreUser>(url);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseRestoreUser = {
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
 * 계정 비밀번호 찾기
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestFindUserPassword = async (params: RequestFindUserPassword) => { // eslint-disable-line
    // const url = `${baseURL}/find`;

    // return await request.get<ResponseFindUserPassword>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseFindUserPassword = {
        code: Response.Success,
        messageKo: '요청이 완료되었습니다.',
        messageEn: 'Request completed.',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 0,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

export {
    requestUserList,
    requestUserInfo,
    requestRegistUser,
    requestModifyUser,
    requestModifyUserPassword,
    requestDeleteUser,
    requestRestoreUser,
    requestFindUserPassword,
};
