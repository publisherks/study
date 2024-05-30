import type { CommonResponseList } from '@/api/interface';

/**
 * 코드 정보
 */
interface CodeInfo {
    /** idx */
    idx: number;

    /** 코드 */
    code: string;

    /** 코드명 */
    name: string;
}

/**
 * 공통 코드 목록 조회 API 요청 데이터 인터페이스
 */
export interface RequestCodeList {
    /** 상위 코드 */
    parentCode?: string;
}

/**
 * 공통 코드 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseCodeList extends CommonResponseList<CodeInfo> {}
