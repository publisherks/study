import 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        /** 폼 데이터 여부 */
        isFormData?: boolean;

        /** 요청을 보냈을 때부터 응답을 받을 때까지 로딩 표시 여부 */
        isShowLoading?: boolean;

        /** 인증 확인 여부 */
        isValidAuth?: boolean;
    }
}
