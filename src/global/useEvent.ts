import { useRouter } from 'vue-router';

import type { CommonResponseInfo } from '@/api/interface';

import useMessageStore from '@/stores/message';

import parent from '@/utils/element/parent';

/**
 * event
 */
const setup = () => {
    // router
    const router = useRouter();

    // store
    /** 메시지 */
    const messageStore = useMessageStore();

    // event
    /**
     * 목록 클릭 시
     * @param event 이벤트 정보
     * @param callback 콜백 함수
     */
    const onClickList = (event: MouseEvent, callback: () => void) => {
        const element = event.target as HTMLElement;
        const className = 'cursor-p';

        if (element.classList.contains(className) || parent(element, `.${className}`)) {
            callback();
        }
    };

    /**
     * API 응답 시
     * @param response 응답 데이터
     * @param options 옵션
     * @param options.isShowMessage 실패 여부와 관계없이 메시지 표시 여부
     * @param options.isShowMessageOnError 실패 시 메시지 표시 여부
     * @param options.isShowBackOnError 실패 시 이전 화면 표시 여부
     * @param options.success 성공 시 콜백 함수
     * @param options.error 실패 시 콜백 함수
     * @param options.complete 완료 시 콜백 함수
     */
    const onResponse = (
        { success: isSuccess, message }: CommonResponseInfo,
        { isShowMessage = true, isShowMessageOnError, isShowBackOnError, success, error, complete }: {
            isShowMessage?: boolean;
            isShowMessageOnError?: boolean;
            isShowBackOnError?: boolean;
            success?: () => void;
            error?: () => void;
            complete?: () => void;
        } = {},
    ) => {
        // 실패 시 메시지를 표시하는 경우
        if (isShowMessageOnError) {
            // 실패한 경우만 메시지 표시
            isShowMessage = false;
        }

        // 메시지가 있을 때 실패 여부와 관계없이 메시지를 표시하는 경우
        if (message && isShowMessage) {
            // 메시지 표시
            messageStore.$patch({
                isShow: true,
                message,
            });
        }

        if (isSuccess) {
            // 성공 시 콜백 함수 실행
            success?.();
        } else {
            // 메시지가 있을 때 실패 시 메시지를 표시하는 경우
            if (message && isShowMessageOnError) {
                // 메시지 표시
                messageStore.$patch({
                    isShow: true,
                    message,
                });
            }

            // 실패 시 콜백 함수 실행
            error?.();

            // 실패 시 이전 화면을 표시하는 경우
            if (isShowBackOnError) {
                // 이전 화면 표시
                router.back();
            }
        }

        // 완료 시 콜백 함수 실행
        complete?.();
    };

    return {
        onClickList,
        onResponse,
    };
};

export default setup;
