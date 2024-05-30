import type { NavigationGuardWithThis, NavigationHookAfter } from 'vue-router';
import { storeToRefs } from 'pinia';

import useLoadingStore from '@/stores/loading';

/**
 * 경로 변경 전에 로딩 표시
 */
const beforeEach: NavigationGuardWithThis<undefined> = () => {
    const { isShow } = storeToRefs(useLoadingStore());

    isShow.value = true;
};

/**
 * 경로 변경 후에 로딩 숨김
 */
const afterEach: NavigationHookAfter = () => {
    const loadingStore = useLoadingStore();

    loadingStore.$reset();
};

export {
    beforeEach,
    afterEach,
};
