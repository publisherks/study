import type {
    RequestSalesList,
    ResponseSalesList,
    ResponseClientApiList,
    ResponseSalesInfo,
} from '@/api/sales/interface';

import { Response } from '@/mappings/enum';
import sales from '@/mappings/json/seles.json';
import client from '@/mappings/json/client.json';
import clientApi from '@/mappings/json/listByClientWithApiData.json';
import salesDetails from '@/mappings/json/selesDetails.json';

// ***************** 임시 코드 시작 ***************** //
// ********** (실제 개발 시 임시 코드 삭제) ********** //
const salesDatas = sales.map((value) => value);
const clientApiDatas = client.map((value) => ({
    seq: value.seq,
    clientName: value.clientName,
    salesCount: value.salesCount,
    isApi: false,
    bizNo: '123-456-7890',
}))
    .concat(clientApi.map((value) => value));
const salesDetail = salesDetails.map((value) => value);
// ***************** 임시 코드 끝 ***************** //

/**
 * 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestSalesList = async (params: RequestSalesList) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 목록 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const lists = salesDatas;
    const { size = 10 } = params;
    const response: ResponseSalesList = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: lists.length,
        data: lists.slice(size * (params.page - 1), size * params.page),
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

/**
 * 업체 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestClientApiList = async (params: ResponseClientApiList | any) => { // eslint-disable-line require-await
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const lists = clientApiDatas.filter((value) => {
        const schTxt = new RegExp(params.value);
        return schTxt.test(value.clientName);
    });
    const response: ResponseClientApiList = {
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
 * 목록 조회
 * @param params 요청 데이터
 * @return 응답 데이터
 */
const requestSalesInfo = async (seq: ResponseSalesInfo.seq) => { // eslint-disable-line require-await
    // FIXME: 실제 계정 목록 조회 API 요청 로직 구현 필요
    // const url = baseURL;

    // return await request.get<ResponseUserList>(url, params);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const datas = salesDetail.find((item: ResponseSalesInfo) => item.seq === seq);
    const response: ResponseSalesList = {
        code: Response.Success,
        messageKo: '',
        messageEn: '',
        error: '',
        timestamp: Number(new Date()),
        totalCount: salesDetail.length,
        data: datas,
    };

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

export {
    requestSalesList,
    requestClientApiList,
    requestSalesInfo,
};
