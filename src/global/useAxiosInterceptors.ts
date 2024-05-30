import { ref, onUnmounted } from 'vue';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

import type { CommonResponseInfo } from '@/api/interface';
import { requestRefreshUserToken } from '@/api/user';

import { getLoginUserToken } from '@/functions/get';

import { RouterName, Response } from '@/mappings/enum';

import api from '@/plugins/axios';

import router from '@/router';

import useCancelAxiosStore from '@/stores/cancelAxios';
import useLoadingStore from '@/stores/loading';
import useLoginStore from '@/stores/login';
import useMessageStore from '@/stores/message';

import isObject from '@/utils/isObject';
import toFormData from '@/utils/json/toFormData';
import type { JSONValue } from '@/utils/json/toFormData';

/**
 * Axios(비동기 API) 인터셉터 사용
 */
const setup = () => {
    // store
    /** Axios(비동기 API) 취소 */
    const cancelAxiosStore = useCancelAxiosStore();
    /** 로딩 */
    const loadingStore = useLoadingStore();
    /** 로그인 */
    const loginStore = useLoginStore();
    const { logout } = loginStore;
    /** 메시지 */
    const messageStore = useMessageStore();

    // state
    /** 인터셉터 */
    const interceptors = ref({
        request: 0,
        response: 0,
    });

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

                // 인증 확인 시
                if (config.isValidAuth !== false) {
                    const { accessToken } = getLoginUserToken();

                    // 요청 헤더에 토큰 추가
                    config.headers.setAuthorization(accessToken);
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
                        config.data = toFormData(config.data as JSONValue);
                    }
                }

                // 요청 취소 함수 추가 (경로 변경 시 요청 취소를 위함)
                const controller = new AbortController();

                config.signal = controller.signal;

                cancelAxiosStore.add(controller);

                return config;
            }, (error: AxiosError) => {
                // 요청 오류가 있는 작업 실행
                loadingStore.$reset();

                return Promise.reject(error);
            }),

            /** 응답 인터셉터 */
            response: api.interceptors.response.use(async (response) => {
                // 응답 데이터가 전달되기 전에 작업 실행 (2xx 범위에 있는 상태 코드인 경우)
                const { data, config } = response;

                // 인증 확인 시
                if (config.isValidAuth !== false) {
                    const { code, message } = data as CommonResponseInfo;

                    // 토큰 만료 시
                    // FIXME: API 정의에 맞춰서 수정 필요
                    if (code === Response.Unauthorized) {
                        // 토큰 재발행 API 요청
                        const { code, data } = await requestRefreshUserToken();

                        // 실패
                        if (code !== Response.Ok) {
                            // 로그아웃
                            logout();

                            // 메시지가 있는 경우
                            if (message) {
                                // 메시지 표시
                                messageStore.$patch({
                                    isShow: true,
                                    message,
                                });
                            }

                            // 로그인 화면 표시
                            router.push({ name: RouterName.Login });

                            return response;
                        }

                        // 성공
                        if (data) {
                            // 로그인 계정 정보 재설정
                            loginStore.$patch(data);

                            // API 요청 헤더에 토큰 갱신
                            config.headers.setAuthorization(data.accessToken);

                            // 기존 API 재요청
                            return await api.request(config);
                        }
                    }
                }

                loadingStore.$reset();

                return response;
            }, (error: AxiosError<CommonResponseInfo>) => {
                // 응답 오류가 있는 작업 실행 (2xx 외의 범위에 있는 상태 코드인 경우)
                const { code: errorCode, status, message, response, config } = error;
                const code = (status ?? response?.status ?? Response.InternalServerError);

                // 응답 데이터가 없을 수 있어서 기본 응답 데이터 설정
                const defaultResponse: AxiosResponse<CommonResponseInfo> = {
                    data: {
                        success: false,
                        code,
                        message: (errorCode === AxiosError.ERR_CANCELED) ? null : message,
                        data: null,
                    },
                    status: code,
                    statusText: (response?.statusText || 'Internal Server Error'),
                    headers: (response?.headers ?? {}),
                    config: config!,
                };

                loadingStore.$reset();

                // NOTE: Promise.reject로 반환 시 오류(예 : VueUse의 useAsyncState에서 onError)로 실행되기 때문에 성공(예 : VueUse의 useAsyncState에서 onSuccess)일 경우와 동일하게 실행하기 위해 일반적인 응답 데이터로 반환
                return response?.data ? response : defaultResponse;
            }),
        };
    };

    // lifecycle
    useAxiosInterceptors();
    onUnmounted(ejectAxiosInterceptors);
};

export default setup;
