import type { Canceler } from 'axios';
import type { KeyValuePair } from '@/mappings/types/common';

/** Axios(비동기 API) 요청 취소 */
export type CancelAxios = KeyValuePair<Canceler>;

/** 로딩 */
export type Loading = {
    /** 표시 여부 */
    isShow: boolean;
};

/** 로그인 */
export type Login = {
    // FIXME: API 정의에 맞춰서 수정 필요
    id: string;
    name: string;
    token: string;
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
    isConfirm?: boolean;

    /** 버튼 텍스트 */
    buttonText: {
        /** 확인 */
        ok?: string;

        /** 취소 */
        cancel?: string;
    };

    /** 버튼 클릭 시 콜백 함수 */
    callback: {
        /** 확인 */
        ok?: () => void;

        /** 취소 */
        cancel?: () => void;
    };
};
