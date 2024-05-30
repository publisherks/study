import request from '@/api';
import type { RequestCodeList, ResponseCodeList } from '@/api/code/interface';

const baseURL = '/api/code';

/**
 * 공통 코드 목록 검색
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestCodeList = (params: RequestCodeList) => request.get<ResponseCodeList>(baseURL, params);

export { requestCodeList };
