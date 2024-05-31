import { defineStore } from 'pinia';

import type { CancelAxios } from '@/mappings/types/store';

/**
 * Axios(비동기 API) 요청 취소 상태
 */
const useCancelAxiosStore = defineStore({
    id: 'cancelAxios',
    state: (): CancelAxios => ({}),
});

export default useCancelAxiosStore;
