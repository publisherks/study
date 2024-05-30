import type { CommonResponseInfo } from '@/api/interface';
import type { UserInfo } from '@/api/user/interface';

/**
 * 내 정보 검색 API 응답 데이터 인터페이스
 */
export interface ResponseProfileInfo extends CommonResponseInfo<UserInfo> {}

/**
 * 내 정보 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyProfile {
    /** 이름 */
    name: string;

    /** 직급 */
    position: string;

    /** 부서명 */
    partname: string;

    /** 팀명 */
    team?: string;

    /** 이메일 */
    email: string;

    /** 연락처 */
    tel?: string;
}

/**
 * 내 정보 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyProfile extends CommonResponseInfo {}

/**
 * 내 비밀번호 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyProfilePassword {
    /** 비밀번호 */
    password: string;
}

/**
 * 내 비밀번호 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyProfilePassword extends CommonResponseInfo {}
