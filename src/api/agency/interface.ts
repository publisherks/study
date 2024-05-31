/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CommonRequestList, CommonResponse, CommonResponseList, CommonResponseInfo } from '@/api/interface';

/**
 * 대리점 정보
 */
export interface AgencyInfo {
    seq: number;
    agencyName: string;
    adminAccountCount: number;
    managerAccountCount: number;
    currentAdminAccountCount: number;
    currentManagerAccountCount: number;
}

/**
 * 대리점 목록 조회 API 요청 데이터 인터페이스
 */
export interface RequestAgencyList extends CommonRequestList {}

/**
 * 대리점 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseAgencyList extends CommonResponseList<AgencyInfo> {}

/**
 * 대리점 정보 조회 API 응답 데이터 인터페이스
 */
export interface ResponseAgencyInfo extends CommonResponseInfo<AgencyInfo> {}
