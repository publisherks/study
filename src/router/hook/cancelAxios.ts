import type { NavigationGuardWithThis } from 'vue-router';

import useCancelAxiosStore from '@/stores/cancelAxios';

/**
 * 경로 변경 전에 Axios(비동기 API) 요청 취소
 */
const beforeEach: NavigationGuardWithThis<undefined> = () => {
    const cancelAxiosStore = useCancelAxiosStore();

    Object.values(cancelAxiosStore.$state)
        .forEach((cancel) => cancel());

    cancelAxiosStore.$state = {};
};

export { beforeEach };
