import type {
    RequestInquiryList,
    ResponseInquiryList,
    ResponseInquiryInfo,
    ResponseManagerList,
} from '@/api/inquiry/interface';

import { Response } from '@/mappings/enum';
import inquiery from '@/mappings/json/inquiery.json';
import manager from '@/mappings/json/manager.json';

// ***************** 임시 코드 시작 ***************** //
// ********** (실제 개발 시 임시 코드 삭제) ********** //
const inquieryDatas = inquiery.map((value) => value)
    .reverse();
const managerDatas = manager.map((value) => value);
// ***************** 임시 코드 끝 ***************** //

/**
 * 문의 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestInquiryList = async (params: RequestInquiryList | any) => { // eslint-disable-line require-await
    // FIXME: 실제 문의 목록 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const lists = inquieryDatas.filter((value) => {
        const { text } = params;
        const schTxt = new RegExp(text);
        return schTxt.test(value.companyName) || schTxt.test(value.inquiryMessage);
    });
    const response: ResponseInquiryList = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: lists.length,
        data: lists,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 문의 정보 조회
 * @param idx idx
 * @return 응답 데이터
 */
const requestInquiryInfo = async (seq: number) => { // eslint-disable-line require-await
    // FIXME: 실제 문의 정보 조회 API 요청 로직 구현 필요
    // const url = `${baseURL}/${idx}`;

    // return await request.get<ResponseAgencyInfo>(url);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseInquiryInfo = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 1,
        data: inquieryDatas.find((value) => (seq === value.seq)),
    };

    // 데이터가 없는 경우 (비정상 접근 시)
    if (!response.data) {
        Object.assign(response, {
            code: Response.Error,
            messageKo: '해당 데이터가 존재하지 않습니다.',
            messageEn: 'The result does not exist.',
        });
    }

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 문의 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestManagerList = async () => { // eslint-disable-line require-await
    // FIXME: 실제 문의 목록 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    /* eslint-disable */
    const lists = managerDatas;
    const response: ResponseManagerList = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: lists.length,
        data: lists,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

export {
    requestInquiryList,
    requestInquiryInfo,
    requestManagerList,
};
