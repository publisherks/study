import type { CommonRequestList, CommonResponseList, CommonResponseInfo } from '@/api/interface';
import type { RequestLogin } from '@/api/login/interface';

import type { Login } from '@/mappings/types/store';

/**
 * 계정 정보
 */
export interface UserInfo {
    /** idx */
    idx: number;

    /** 이름 */
    name: string;

    /** 직급 */
    position: string;

    /** 부서명 */
    partname: string;

    /** 팀명 */
    team: string;

    /** 이메일 */
    email: string;

    /** 연락처 */
    tel: string;

    /** 사용 여부 */
    isUsed: boolean;
}

/**
 * 계정 목록 검색 API 요청 데이터 인터페이스
 */
export interface RequestUserList extends CommonRequestList {
    /** 이름 */
    name?: string;

    /** 직급 */
    position?: string;

    /** 부서명 */
    partname?: string;

    /** 팀명 */
    team?: string;

    /** 이메일 */
    email?: string;

    /** 연락처 */
    tel?: string;

    /** 사용 여부 */
    isUsed?: boolean;
}

/**
 * 계정 목록 검색 API 응답 데이터 인터페이스
 */
export interface ResponseUserList extends CommonResponseList<UserInfo> {}

/**
 * 계정 정보 검색 API 응답 데이터 인터페이스
 */
export interface ResponseUserInfo extends CommonResponseInfo<UserInfo> {}

/**
 * 계정 등록 API 요청 데이터 인터페이스
 */
export interface RequestRegistUser {
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

    /** 사용 여부 */
    isUsed: boolean;
}

/**
 * 계정 등록 API 응답 데이터 인터페이스
 */
export interface ResponseRegistUser extends CommonResponseInfo {}

/**
 * 계정 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyUser {
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

    /** 사용 여부 */
    isUsed: boolean;
}

/**
 * 계정 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyUser extends CommonResponseInfo {}

/**
 * 계정 비밀번호 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifyUserPassword extends RequestLogin {}

/**
 * 계정 비밀번호 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifyUserPassword extends CommonResponseInfo {}

/**
 * 계정 일괄 미사용 API 응답 데이터 인터페이스
 */
export interface ResponseDeleteUser extends CommonResponseInfo {}

/**
 * 계정 일괄 사용 API 응답 데이터 인터페이스
 */
export interface ResponseRestoreUser extends CommonResponseInfo {}

/**
 * 계정 비밀번호 찾기 API 요청 데이터 인터페이스
 */
export interface RequestFindUserPassword {
    /** 아이디 */
    id: string;

    /** 이름 */
    name: string;
}

/**
 * 계정 비밀번호 찾기 API 응답 데이터 인터페이스
 */
export interface ResponseFindUserPassword extends CommonResponseInfo {}

/**
 * 계정 토큰 재발행 API 응답 데이터 인터페이스
 */
export interface ResponseRefreshUserToken extends CommonResponseInfo<Login> {}
