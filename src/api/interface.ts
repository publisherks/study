/**
 * 목록 조회 API 공통 요청 데이터 인터페이스
 */
export interface CommonRequestList {
    /** 페이지 번호 */
    page: number;

    /** 페이지당 항목 수 */
    size?: number;
}

/**
 * API 공통 응답 데이터 인터페이스
 */
export interface CommonResponse {
    /** 코드 */
    code?: number;

    /** 메시지 */
    message?: string;

    /** 메시지 (한국어) */
    messageKo?: string;

    /** 메시지 (영어) */
    messageEn?: string;

    /** 오류 메시지 */
    error?: string;

    /** 시간 */
    timestamp?: number;

    /** 총 항목 수 */
    totalCount?: number;
}

/**
 * 목록 조회 API 공통 응답 데이터 인터페이스
 */
export interface CommonResponseList<T extends object> extends CommonResponse {
    /** 목록 */
    data?: T[];
}

/**
 * 정보 조회 API 공통 응답 데이터 인터페이스
 */
export interface CommonResponseInfo<T extends object> extends CommonResponse {
    /** 정보 */
    data?: T;
}
