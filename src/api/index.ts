import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import request from '@/plugins/axios';

/**
 * `get`(조회)
 * @param url URL
 * @param params 요청 데이터
 * @param config 설정
 * @return 응답 데이터
 */
const requestGet = async <Response, Request extends object = object>(url: string, params?: Request, config?: AxiosRequestConfig<Request>) => {
    const { data: response } = await request.get<Response, AxiosResponse<Response>, Request>(url, {
        ...config,
        params,
    });

    return response;
};

/**
 * `post`(등록)
 * @param url URL
 * @param data 요청 데이터
 * @param config 설정
 * @return 응답 데이터
 */
const requestPost = async <Response, Request extends object = object>(url: string, data?: Request, config?: AxiosRequestConfig<Request>) => {
    let { post } = request;

    if (config?.isFormData) {
        post = request.postForm;
    }

    const { data: response } = await post<Response, AxiosResponse<Response>, Request>(url, data, config);

    return response;
};

/**
 * `postForm`(폼 데이터로 등록)
 * @param url URL
 * @param data 요청 데이터
 * @param config 설정
 * @return 응답 데이터
 */
const requestPostForm = async <Response, Request extends object = object>(url: string, data?: Request, config?: AxiosRequestConfig<Request>) => await requestPost<Response, Request>(url, data, {
    ...config,
    isFormData: true,
});

/**
 * `put`(수정)
 * @param url URL
 * @param data 요청 데이터
 * @param config 설정
 * @return 응답 데이터
 */
const requestPut = async <Response, Request extends object = object>(url: string, data?: Request, config?: AxiosRequestConfig<Request>) => {
    let { put } = request;

    if (config?.isFormData) {
        put = request.putForm;
    }

    const { data: response } = await put<Response, AxiosResponse<Response>, Request>(url, data, config);

    return response;
};

/**
 * `putForm`(폼 데이터로 수정)
 * @param url URL
 * @param data 요청 데이터
 * @param config 설정
 * @return 응답 데이터
 */
const requestPutForm = async <Response, Request extends object = object>(url: string, data?: Request, config?: AxiosRequestConfig<Request>) => await requestPut<Response, Request>(url, data, {
    ...config,
    isFormData: true,
});

/**
 * `delete`(삭제)
 * @param url URL
 * @param data 요청 데이터
 * @param config 설정
 * @return 응답 데이터
 */
const requestDelete = async <Response, Request extends object = object>(url: string, data?: Request, config?: AxiosRequestConfig<Request>) => {
    // NOTE: delete 요청 시 바디 데이터(data)는 옵션 값에 지정해야 됨
    // NOTE: API에서 바디 데이터(data)로 전송해야 되는지 파라미터(params)로 전송해야 되는지에 따라 옵션 값이 달라짐
    const { data: response } = await request.delete<Response, AxiosResponse<Response>, Request>(url, {
        ...config,
        data,
    });
    const { data: response2 } = await request.delete<Response, AxiosResponse<Response>, Request>(url, {
        ...config,
        params: data,
    });

    console.log(response2); // eslint-disable-line no-console

    return response;
};

export default {
    get: requestGet,
    post: requestPost,
    postForm: requestPostForm,
    put: requestPut,
    putForm: requestPutForm,
    delete: requestDelete,
};
