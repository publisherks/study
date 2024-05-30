import { defineStore } from 'pinia';

import type { Loading } from '@/mappings/types/store';

/**
 * 로딩 상태
 */
const useLoadingStore = defineStore({
    id: 'loading',
    state: (): Loading => ({ isShow: false }),
});

export default useLoadingStore;
