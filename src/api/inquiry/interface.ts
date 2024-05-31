import type { CommonRequestList, CommonResponseList, CommonResponseInfo } from '@/api/interface';

/**
 * 메모 정보
 */
export interface inquiryMemoInfo {
    text: string;
    createdUserName: string;
    createdDateTime: string;
}

/**
 * 문의 정보
 */
export interface InquiryInfo {
    seq: number;
    companyName: string;
    address: string;
    inquiryMessage: string;
    homepage: string;
    inquirerName: string;
    position: string;
    contactNumber: string;
    email: string;
    regDtcreatedDate: string;
    inquiryPath: string;
    inquiryManagerName: string | null;
    inquiryStatus: string;
    primaryBusiness: string;
    inquiryMemoList: [inquiryMemoInfo];
}

/**
 * 담당자 정보
 */
export interface managerInfo {
    seq: number;
    name: string;
    dept: string;
    agencyName: string;
}

/**
 * 문의 정보 조회 API 요청 데이터 인터페이스
 */
export interface RequestInquiryList extends CommonRequestList {}

/**
 * 문의 정보 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseInquiryList extends CommonResponseList<InquiryInfo> {}

/**
 * 문의 정보 조회 API 응답 데이터 인터페이스
 */
export interface ResponseInquiryInfo extends CommonResponseInfo<InquiryInfo> {}

/**
 * 담당자 정보 조회 API 요청 데이터 인터페이스
 */
export interface RequestManagerList extends CommonRequestList {}

/**
 * 담당자 정보 목록 조회 API 응답 데이터 인터페이스
 */
export interface ResponseManagerList extends CommonResponseList<managerInfo> {}
