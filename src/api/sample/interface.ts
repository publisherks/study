import type { CommonRequestList, CommonResponse, CommonResponseList, CommonResponseInfo } from '@/api/interface';

/**
 * 정보
 */
interface SampleInfo {
    idx: number;
    rowNbr: number;
    aaa: string;
    bbb: boolean;
    ccc: number;
    ddd: {
        aaa: number;
        bbb: string;
        ccc: boolean;
    };
    eee: number[];
    isUsed: boolean;
}

/**
 * 목록 조회 API 요청 데이터 인터페이스스
 */
export interface RequestSampleList extends CommonRequestList {
    aaa?: string;
    bbb?: boolean;
    ccc?: number;
    isUsed?: boolean;
}

/**
 * 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseSampleList extends CommonResponseList<SampleInfo> {}

/**
 * 정보 조회 API 응답 데이터 인터페이스
 */
export interface ResponseSampleInfo extends CommonResponseInfo<SampleInfo> {}

/**
 * 등록 API 요청 데이터 인터페이스
 */
export interface RequestRegistSample {
    aaa: string;
    bbb: boolean;
    ccc: number;
    isUsed: boolean;
}

/**
 * 등록 API 응답 데이터 인터페이스
 */
export interface ResponseRegistSample extends CommonResponse {}

/**
 * 수정 API 요청 데이터 인터페이스
 */
export interface RequestModifySample {
    aaa: string;
    bbb: boolean;
    ccc: number;
    isUsed: boolean;
}

/**
 * 수정 API 응답 데이터 인터페이스
 */
export interface ResponseModifySample extends CommonResponse {}

/**
 * 삭제 API 응답 데이터 인터페이스
 */
export interface ResponseDeleteSample extends CommonResponse {}
