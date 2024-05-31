import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        /** 로그인 필요 여부 */
        isRequireLogin?: boolean;
    }
}
