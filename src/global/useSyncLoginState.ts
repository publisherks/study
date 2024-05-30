import Cookies from 'js-cookie';

import { StorageKey } from '@/mappings/enum';

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
     * 로그인 상태를 쿠키에 동기화
     * @see {@link https://pinia.vuejs.kr/core-concepts/state.html#subscribing-to-the-state}
     */
    const syncLoginState = () => loginStore.$subscribe((mutation, state) => {
        const { accessToken } = state;

        // 토큰이 있는 경우
        if (accessToken) {
            // 쿠키에 로그인 계정 정보 저장
            Cookies.set(StorageKey.LoginUser, JSON.stringify(state), { expires: 1 });

            return;
        }

        // 토큰이 없는 경우 쿠키에서 로그인 계정 정보 삭제
        Cookies.remove(StorageKey.LoginUser);
    }, { immediate: true });

    // lifecycle
    syncLoginState();
};

export default setup;
