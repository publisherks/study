import request from '@/api';
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
    ResponseRefreshUserToken,
} from '@/api/user/interface';

import { getLoginUser } from '@/functions/get';

import { HeaderName } from '@/mappings/enum';

const baseURL = '/api/user';

/**
 * 계정 목록 검색
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestUserList = (params: RequestUserList) => request.get<ResponseUserList>(baseURL, params);

/**
 * 계정 정보 검색
 * @param idx idx
 * @return 응답 데이터
 */
const requestUserInfo = (idx: number) => request.get<ResponseUserInfo>(`${baseURL}/${idx}`);

/**
 * 계정 등록
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestRegistUser = (data: RequestRegistUser) => request.post<ResponseRegistUser>(baseURL, data);

/**
 * 계정 수정
 * @param idx idx
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyUser = (idx: number, data: RequestModifyUser) => request.put<ResponseModifyUser>(`${baseURL}/${idx}`, data);

/**
 * 계정 비밀번호 수정
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyUserPassword = (data: RequestModifyUserPassword) => request.put<ResponseModifyUserPassword>(`${baseURL}/password`, data);

/**
 * 계정 일괄 미사용
 * @param idxes idx 목록
 * @return 응답 데이터
 */
const requestDeleteUser = (idxes: number[]) => request.delete<ResponseDeleteUser>(`${baseURL}/${idxes.join()}`);

/**
 * 계정 일괄 사용
 * @param idxes idx 목록
 * @return 응답 데이터
 */
const requestRestoreUser = (idxes: number[]) => request.put<ResponseRestoreUser>(`${baseURL}/${idxes.join()}`);

/**
 * 계정 비밀번호 찾기
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestFindUserPassword = (params: RequestFindUserPassword) => request.get<ResponseFindUserPassword>(`${baseURL}/find`, params);

/**
 * 계정 토큰 재발행
 * @return 응답 데이터
 */
const requestRefreshUserToken = () => {
    const { accessToken, refreshToken } = getLoginUser();

    return request.get<ResponseRefreshUserToken>(`${baseURL}/refresh`, undefined, {
        headers: {
            [HeaderName.AccessToken]: accessToken,
            [HeaderName.RefreshToken]: refreshToken,
        },
        isValidAuth: false,
    });
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
    requestRefreshUserToken,
};
