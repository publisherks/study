import { defineStore } from 'pinia';

import { getInitLoginUser, getLoginUser } from '@/functions/get';

import type { Login } from '@/mappings/types/store';

/**
 * 로그인 상태
 */
const useLoginStore = defineStore({
    id: 'login',
    state: (): Login => getLoginUser(),
    actions: {
        /**
         * 로그아웃
         */
        logout() {
            this.$state = getInitLoginUser();
        },
    },
});

export default useLoginStore;
