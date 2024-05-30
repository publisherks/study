import request from '@/api';
import type { ResponseProfileInfo, RequestModifyProfile, ResponseModifyProfile, RequestModifyProfilePassword, ResponseModifyProfilePassword } from '@/api/user/profile/interface';

const baseURL = '/api/profile';

/**
 * 내 정보 검색
 * @return 응답 데이터
 */
const requestProfileInfo = () => request.get<ResponseProfileInfo>(baseURL);

/**
 * 내 정보 수정
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyProfile = (data: RequestModifyProfile) => request.put<ResponseModifyProfile>(baseURL, data);

/**
 * 내 비밀번호 수정
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifyProfilePassword = (data: RequestModifyProfilePassword) => request.put<ResponseModifyProfilePassword>(`${baseURL}/password`, data);

export {
    requestProfileInfo,
    requestModifyProfile,
    requestModifyProfilePassword,
};
