import type { CommonResponseInfo } from '@/api/interface';
import type { Login } from '@/mappings/types/store';

/**
 * 로그인 API 요청 데이터 인터페이스
 */
export interface RequestLogin {
    /** 아이디 */
    id: string;

    /** 비밀번호 */
    password: string;
}

/**
 * 로그인 API 응답 데이터 인터페이스
 */
export interface ResponseLogin extends CommonResponseInfo<Login> {}
