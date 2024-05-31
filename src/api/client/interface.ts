import type { CommonRequestList, CommonResponseList, CommonResponseInfo } from '@/api/interface';

/**
 * 관련된 영업
 */
export interface ClientSalesSimpleD {
    salesSeq: number;
    salesName: string;
    salesStatus: string;
    salesServiceType: string;
    startDate: string;
}

/**
 * 고객사 연락처
 */
export interface ClientContact {
    contactName: string;
    position: string;
    dept: string;
    personalTelNumber: string;
    companyTelNumber: string;
    email: string;
    clientContactSalesSimpleDtoList: ClientSalesSimpleD;
}

/**
 * 고객사 정보
 */
export interface ClientInfo {
    seq: number;
    clientName: string;
    address: string;
    salesCount: number;
    clientContactCount: number;
    clientType: string;
    product: string;
    bizNo: string;
    homePage: string;
    clientSalesSimpleDtoList: ClientSalesSimpleD;
    clientContact: ClientContact;
}

/**
 * 고객 연락처 정보
 */
export interface ContactInfo {
    seq: number;
    contactName: string;
    position: string;
    dept: string;
    personalTelNumber: string;
    companyTelNumber: string;
    email: string;
    clientContactSalesSimpleDtoList: ClientSalesSimpleD;
}

/**
 * 고객사 정보 조회 API 요청 데이터 인터페이스
 */
export interface RequestClientList extends CommonRequestList {}

/**
 * 고객사 정보 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseClientList extends CommonResponseList<ClientInfo> {}

/**
 * 고객사 정보 조회 API 응답 데이터 인터페이스
 */
export interface ResponseClientInfo extends CommonResponseInfo<ClientInfo> {}
