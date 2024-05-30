import request from '@/api';
import type { RequestLogin, ResponseLogin } from '@/api/login/interface';

const baseURL = '/login';

/**
 * 로그인
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestLogin = (data: RequestLogin) => request.post<ResponseLogin>(baseURL, data, { isValidAuth: false });

export { requestLogin };
