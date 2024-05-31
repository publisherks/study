import type { CommonRequestList, CommonResponseList, CommonResponseInfo } from '@/api/interface';

/**
 * 영업 정보
 */
export interface SalesInfo {
    seq: number;
    salesName: string;
    startDate: string;
    salesStatus: string;
    clientName: string;
    clientRegion: string;
    mainSalesMangerName: string;
    mainSalesMangerPosition: string;
    mainSalesMangerAgencyName: string;
    subSalesMangerName: string;
    subSalesMangerPosition: string;
    subSalesMangerAgencyName: string;
    estimatedAmount: number;
    estimatedAmountThisYear: number;
    contractAmount: number;
    salesAmountThisYear: number;
    reflectedAmount: number;
}

/**
 * 외부 업체 정보
 */
export interface ClientApiInfo {
    seq?: number;
    clientName: string;
    salesCount: number;
    isApi: boolean;
    bizNo: string;
}

/**
 * 영업 정보 상세
 */
export interface SalesDetail {
    seq: number;
    salesName: string;
    salesServiceType: string;
    clientType: string;
    product: string;
    homepage: string;
    bizNo: string;
    address: string;
    startDate: string;
    salesStatus: string;
    mainSalesMangerName: string;
    mainSalesMangerPosition: string;
    mainSalesMangerAgencyName: string;
    subSalesMangerName: string;
    subSalesMangerPosition: string;
    subSalesMangerAgencyName: string;
    clientName: string;
    mainClientContactName: string;
    position: string;
    email: string;
    companyTelNumber: string;
    personalTelNumber: string;
    salesClientSimpleDtoList: {
        seq: number;
        clientContactName: string;
        position: string;
    };
    estimatedAmount: number;
    contractTargetDate: string;
    contractPossibility: string;
    estimatedAmountThisYear: number;
    contractAmount: number;
    contractStartDate: string;
    contractEndDate: string;
    salesAmountThisYear: number;
    reflectedAmount: number;
    salesStatusHistoryDtoList: {
        statusSeqGroup?: number[];
        seq: number;
        salesStatus: string;
        createDate: string;
        createdUserName: string;
        msg: string;
        fileDtoList: any[];
    };
}

/**
 * 영업 목록 조회 API 요청 데이터 인터페이스
 */
export interface RequestSalesList extends CommonRequestList {}

/**
 * 영업 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseSalesList extends CommonResponseList<SalesInfo> {}

/**
 * 외부 업체 정보 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseClientApiList extends CommonResponseList<ClientApiInfo> {}

/**
 * 영업 정보 상세 조회 API 응답 데이터 인터페이스
 */
export interface ResponseSalesInfo extends CommonResponseInfo<SalesDetail> {}
