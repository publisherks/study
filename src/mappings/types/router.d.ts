import 'vue-router';

import type { UserAuthority } from '@/mappings/enum';

declare module 'vue-router' {
    interface RouteMeta {
        /** 로그인 필요 여부 */
        isRequireLogin?: boolean;

        /** 권한 목록 */
        roles?: UserAuthority[];
    }
}
