import request from '@/api';
import type {
    RequestSampleList,
    ResponseSampleList,
    ResponseSampleInfo,
    RequestRegistSample,
    ResponseRegistSample,
    RequestModifySample,
    ResponseModifySample,
    ResponseDeleteSample,
} from '@/api/sample/interface';

const baseURL = '/sample';

/**
 * 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestSampleList = async (params: RequestSampleList) => await request.get<ResponseSampleList>(baseURL, params);

/**
 * 정보 조회
 * @param idx idx
 * @return 응답 데이터
 */
const requestSampleInfo = async (idx: number) => await request.get<ResponseSampleInfo>(`${baseURL}/${idx}`);

/**
 * 등록
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestRegistSample = async (data: RequestRegistSample) => await request.post<ResponseRegistSample>(baseURL, data);

/**
 * 수정
 * @param idx idx
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestModifySample = async (idx: number, data: RequestModifySample) => await request.put<ResponseModifySample>(`${baseURL}/${idx}`, data);

/**
 * 삭제
 * @param idx idx
 * @return 응답 데이터
 */
const requestDeleteSample = async (idx: number) => await request.delete<ResponseDeleteSample>(`${baseURL}/${idx}`);

export {
    requestSampleList,
    requestSampleInfo,
    requestRegistSample,
    requestModifySample,
    requestDeleteSample,
};
