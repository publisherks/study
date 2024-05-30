import type { Nullable } from '@/mappings/types/common';

/**
 * 목록 검색 API 공통 요청 데이터 인터페이스
 */
export interface CommonRequestList {
    /** 페이지 번호 */
    page?: number;

    /** 페이지당 항목 수 */
    size?: number;
}

/**
 * API 공통 응답 데이터 인터페이스
 */
interface CommonResponse {
    /** 성공 여부 */
    success?: boolean;

    /** 코드 */
    code?: number;

    /** 메시지 */
    message?: Nullable<string>;
}

/**
 * 목록 검색 API 공통 응답 데이터 인터페이스
 */
export interface CommonResponseList<T extends object> extends CommonResponse {
    /** 데이터 */
    data?: Nullable<{
        /** 목록 */
        results: T[];

        /** 총 항목 수 */
        totalCount: number;
    }>;
}

/**
 * 정보 검색 API 공통 응답 데이터 인터페이스
 */
export interface CommonResponseInfo<T extends object = object> extends CommonResponse {
    /** 정보 */
    data?: Nullable<T>;
}
