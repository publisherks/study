import { ref, onUnmounted } from 'vue';
import axios, { AxiosError, toFormData } from 'axios';
import type { AxiosResponse } from 'axios';

import type { CommonResponse } from '@/api/interface';

import { Response } from '@/mappings/enum';
import type { KeyValuePair } from '@/mappings/types/common';

import api from '@/plugins/axios';

import useCancelAxiosStore from '@/stores/cancelAxios';
import useLoadingStore from '@/stores/loading';

import isObject from '@/utils/isObject';

/**
 * Axios(비동기 API) 인터셉터 사용
 */
const setup = () => {
    // store
    /** Axios(비동기 API) 취소 */
    const cancelAxiosStore = useCancelAxiosStore();
    /** 로딩 */
    const loadingStore = useLoadingStore();

    // state
    /** 인터셉터 */
    const interceptors = ref<KeyValuePair<number>>({
        request: 0,
        response: 0,
    });

    // methods
    /**
     * 응답 데이터 변환
     * @param response 변환 전 응답 데이터
     * @param isCancel 요청 취소 여부
     * @return 변환 후 응답 데이터
     */
    const convertResponse = (response: AxiosResponse<CommonResponse>, isCancel?: boolean): AxiosResponse<CommonResponse> => {
        const { data } = response;
        const { code, messageKo } = data;

        return {
            ...response,
            data: {
                ...data,
                message: (!isCancel && code === Response.Error && !messageKo) ? '서버에서 오류가 발생했습니다.\n시스템 관리자에게 문의해 주세요.' : messageKo,
            },
        };
    };

    /**
     * Axios(비동기 API) 인터셉터 해제
     */
    const ejectAxiosInterceptors = () => {
        api.interceptors.request.eject(interceptors.value.request);
        api.interceptors.response.eject(interceptors.value.response);
    };

    /**
     * Axios(비동기 API) 인터셉터 사용
     * @see {@link https://axios-http.com/kr/docs/interceptors}
     */
    const useAxiosInterceptors = () => {
        interceptors.value = {
            /** 요청 인터셉터 */
            request: api.interceptors.request.use((config) => {
                // 요청이 전달되기 전에 작업 실행
                if (config.isShowLoading !== false) {
                    // 로딩 표시
                    loadingStore.isShow = true;
                }

                // 폼 데이터 요청 시
                if (config.isFormData) {
                    // 요청 헤더에 'Content-Type' 값이 'multipart/form-data'가 아닌 경우
                    if (config.headers.get('Content-Type') !== 'multipart/form-data') {
                        // 요청 헤더에 'Content-Type' 값을 'multipart/form-data'로 설정
                        config.headers.setContentType('multipart/form-data', true);
                    }

                    // 요청 데이터가 객체인 경우
                    if (isObject(config.data)) {
                        // 폼 데이터로 변환
                        config.data = toFormData(config.data);
                    }
                }

                // 요청 취소 추가 (경로 변경 시 요청 취소를 위함)
                config.cancelToken ??= new axios.CancelToken((cancel) => {
                    if (config.url) {
                        cancelAxiosStore.$patch({ [config.url]: cancel });
                    }
                });

                return config;
            }, (error: AxiosError) => {
                // 요청 오류가 있는 작업 실행
                loadingStore.$reset();

                return Promise.reject(error);
            }),

            /** 응답 인터셉터 */
            response: api.interceptors.response.use((response) => {
                // 응답 데이터가 전달되기 전에 작업 실행 (2xx 범위에 있는 상태 코드인 경우)
                loadingStore.$reset();

                return convertResponse(response);
            }, (error: AxiosError<CommonResponse>) => {
                // 응답 오류가 있는 작업 실행 (2xx 외의 범위에 있는 상태 코드인 경우)
                const { code: errorCode, status, message, stack, response, config } = error;
                const code = (status ?? response?.status ?? Response.Error);
                const isCancel = (errorCode === AxiosError.ERR_CANCELED);

                // 응답 데이터가 없을 수 있어서 기본 응답 데이터 설정
                const defaultResponse: AxiosResponse<CommonResponse> = {
                    data: {
                        code,
                        messageKo: isCancel ? '' : message,
                        messageEn: isCancel ? '' : message,
                        error: stack,
                        timestamp: Number(new Date()),
                    },
                    status: code,
                    statusText: (response?.statusText || message),
                    headers: {},
                    config: config!,
                };

                loadingStore.$reset();

                // NOTE: Promise.reject로 반환 시 catch(예외)로 실행되기 때문에 일반적인 응답 데이터로 반환
                return convertResponse(response?.data ? response : defaultResponse, isCancel);
            }),
        };
    };

    // lifecycle
    useAxiosInterceptors();
    onUnmounted(ejectAxiosInterceptors);
};

export default setup;
