import { defineStore } from 'pinia';

import type { Message } from '@/mappings/types/store';

/**
 * 메시지 상태
 */
const useMessageStore = defineStore({
    id: 'message',
    state: (): Message => ({
        isShow: false,
        title: '알림',
        message: '',
        isConfirm: false,
        buttonText: {
            ok: '확인',
            cancel: '취소',
        },
        callback: {
            ok() {},
            cancel() {},
        },
    }),
    actions: {
        /**
         * 버튼 클릭 시
         * @param type 확인/취소 구분
         */
        onClickButton(type: keyof Message['callback'] = 'ok') {
            // 콜백 함수가 있는 경우 콜백 함수 실행
            this.callback[type]?.();

            // 상태 초기화
            this.$reset();
        },
    },
});

export default useMessageStore;
