import type { CommonRequestList, CommonResponse, CommonResponseList, CommonResponseInfo } from '@/api/interface';
import type { RequestLogin } from '@/api/login/interface';

/**
 * 계정 정보
 */
export interface UserInfo {
    idx: number;
    name: string;
    position: string;
    dept: string;
    agencyName: string;
    email: string;
    personalTelNumber: string;
    companyTelNumber: string;
    addAuthorities: string;
}

/**
 * 계정 목록 조회 API 요청 데이터 인터페이스
 */
export interface RequestUserList extends CommonRequestList {
    name?: string;
    position?: string;
    dept?: string;
    agencyName?: string;
    email?: string;
    personalTelNumber?: string;
    companyTelNumber?: string;
    addAuthorities?: string;
}

/**
 * 계정 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseUserList extends CommonResponseList<UserInfo> {}

/**
 * 계정 정보 조회 API 응답 데이터 인터페이스
 */
export interface ResponseUserInfo extends CommonResponseInfo<UserInfo> {}

/**
 * 계정 등록 API 요청 데이터 인터페이스
 */
export interface RequestRegistUser {
    name: string;
    position: string;
    partname: string;
    team?: string;
    email: string;
    tel?: string;
    isUsed: boolean;
}

/**
 * 계정 등록 API 응답 데이터 인터페이스
 */
export interface ResponseRegistUser extends CommonResponse {}

/**
 * 계정 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyUser {
    name: string;
    position: string;
    partname: string;
    team?: string;
    email: string;
    tel?: string;
    isUsed: boolean;
}

/**
 * 계정 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyUser extends CommonResponse {}

/**
 * 계정 비밀번호 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyUserPassword extends RequestLogin {}

/**
 * 계정 비밀번호 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyUserPassword extends CommonResponse {}

/**
 * 계정 일괄 미사용 API 응답 데이터 인터페이스
 */
export interface ResponseDeleteUser extends CommonResponse {}

/**
 * 계정 일괄 사용 API 응답 데이터 인터페이스
 */
export interface ResponseRestoreUser extends CommonResponse {}

/**
 * 계정 비밀번호 찾기 API 요청 데이터 인터페이스
 */
export interface RequestFindUserPassword {
    id: string;
    name: string;
}

/**
 * 계정 비밀번호 찾기 API 응답 데이터 인터페이스
 */
export interface ResponseFindUserPassword extends CommonResponse {}
