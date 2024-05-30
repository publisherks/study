import type { UserAuthority } from '@/mappings/enum';

/** Axios(비동기 API) 요청 취소 */
export type CancelAxios = {
    /** `AbortController`(요청 취소) 목록 */
    controllers: AbortController[];
};

/** 로딩 */
export type Loading = {
    /** 표시 여부 */
    isShow: boolean;
};

/** 로그인 */
export type Login = {
    // FIXME: API 정의에 맞춰서 수정 필요
    /** 아이디 */
    id: string;

    /** 이름 */
    name: string;

    /** 토큰 접두사 */
    prefix: string;

    /** 인증 토큰 */
    accessToken: string;

    /** 재발행용 토큰 */
    refreshToken: string;

    /** 권한 */
    authority: UserAuthority;
};

/** 메시지 */
export type Message = {
    /** 표시 여부 */
    isShow: boolean;

    /** 제목 */
    title: string;

    /** 메시지 */
    message: string;

    /** 컨펌 메시지 여부 */
    isConfirm: boolean;

    /** 버튼 텍스트 */
    buttonText: {
        /** 확인 */
        ok: string;

        /** 취소 */
        cancel: string;
    };

    /** 버튼 클릭 시 콜백 함수 */
    callback: {
        /** 확인 */
        ok: () => void;

        /** 취소 */
        cancel: () => void;
    };
};
