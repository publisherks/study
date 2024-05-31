import Cookies from 'js-cookie';

import { HeaderName, StorageKey } from '@/mappings/enum';

import request from '@/plugins/axios';

import useLoginStore from '@/stores/login';

/**
 * 로그인 상태 동기화
 */
const setup = () => {
    // store
    /** 로그인 */
    const loginStore = useLoginStore();

    // methods
    /**
     * 로그인 상태를 API 요청 헤더 및 쿠키에 동기화
     * @see {@link https://pinia.vuejs.kr/core-concepts/state.html#subscribing-to-the-state}
     */
    const syncLoginState = () => loginStore.$subscribe((mutation, state) => {
        const { token } = state;

        // 토큰이 있는 경우
        if (token) {
            // API 요청 헤더에 토큰 설정
            request.defaults.headers.common[HeaderName.Token] = token;

            // 쿠키에 토큰 설정
            Cookies.set(StorageKey.LoginUser, JSON.stringify(state), { expires: 1 });

            return;
        }

        // 토큰이 없는 경우 API 요청 헤더에서 토큰 삭제
        delete request.defaults.headers.common[HeaderName.Token];

        // 쿠키에서 토큰 삭제
        Cookies.remove(StorageKey.LoginUser);
    }, { immediate: true });

    // lifecycle
    syncLoginState();
};

export default setup;
