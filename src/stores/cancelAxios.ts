import { defineStore } from 'pinia';

import type { CancelAxios } from '@/mappings/types/store';

/**
 * Axios(비동기 API) 요청 취소 상태
 */
const useCancelAxiosStore = defineStore({
    id: 'cancelAxios',
    state: (): CancelAxios => ({ controllers: [] }),
    actions: {
        /**
         * `AbortController`(요청 취소) 추가
         * @param controller `AbortController`(요청 취소)
         */
        add(controller: CancelAxios['controllers'][number]) {
            this.controllers.push(controller);
        },

        /**
         * 요청 취소
         */
        cancel() {
            this.controllers.forEach((controller) => controller.abort());
            this.$reset();
        },
    },
});

export default useCancelAxiosStore;
