// import request from '@/api';
import type { RequestLogin, ResponseLogin } from '@/api/login/interface';

import { Response } from '@/mappings/enum';

/**
 * 로그인
 * @param data 요청 데이터
 * @return 응답 데이터
 */
const requestLogin = async (data: RequestLogin) => { // eslint-disable-line require-await
    // FIXME: 실제 로그인 API 요청 로직 구현 필요
    // const url = '/login';

    // return await request.post<ResponseLogin>(url, data);

    // ***************** 임시 코드 시작 ***************** //
    // ********** (실제 개발 시 임시 코드 삭제) ********** //
    const response: ResponseLogin = {
        code: Response.Error,
        messageKo: '로그인 실패.\n삭제 또는 등록 되지 않은 아이디거나,\n아이디 또는 비밀번호를 잘못 입력하셨습니다.',
        messageEn: 'Login is Failed.\nDeleted or unregistered ID,\nYou have entered the wrong user id or password.',
        error: '',
        timestamp: Number(new Date()),
        totalCount: 0,
    };
    const valid = '0000';
    const { id, password } = data;

    if (id === valid && password === valid) {
        Object.assign(response, {
            code: Response.Success,
            messageKo: '',
            messageEn: '',
            totalCount: 1,
            data: {
                id,
                name: '서명환',
                token: new Array<string>(10)
                    .fill('')
                    .map(() => Math.random()
                        .toString(36)
                        .substring(2))
                    .join(''),
            },
        });
    }

    response.message = response.messageKo;
    // ***************** 임시 코드 끝 ***************** //

    return response;
};

export { requestLogin };
