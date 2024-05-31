import type { CommonResponse, CommonResponseInfo } from '@/api/interface';
import type { UserInfo } from '@/api/user/interface';

/**
 * 내 정보 조회 API 응답 데이터 인터페이스
 */
export interface ResponseProfileInfo extends CommonResponseInfo<UserInfo> {}

/**
 * 내 정보 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyProfile {
    name: string;
    position: string;
    partname: string;
    team?: string;
    email: string;
    tel?: string;
}

/**
 * 내 정보 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyProfile extends CommonResponse {}

/**
 * 내 비밀번호 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyProfilePassword {
    password: string;
}

/**
 * 내 비밀번호 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyProfilePassword extends CommonResponse {}
