import type { NavigationGuardWithThis, RouteLocationNamedRaw } from 'vue-router';

import { getLoginUser, getMainRouterName } from '@/functions/get';

import { RouterName } from '@/mappings/enum';

import useMessageStore from '@/stores/message';

import isEmpty from '@/utils/isEmpty';

/**
 * 경로 변경 전에 로그인 여부 확인
 * @param to 경로 변경 정보
 */
const beforeEach: NavigationGuardWithThis<undefined> = (to) => {
    const location: RouteLocationNamedRaw = {};
    const { accessToken, authority } = getLoginUser();
    const { roles } = to.meta;

    let { isRequireLogin } = to.meta;

    if (accessToken) {
        // 로그인을 한 경우
        if (to.name === RouterName.Main) {
            // 메인 경로로 이동 시 로그인 계정 권한의 메인 화면으로 이동
            location.name = getMainRouterName(authority);
        } else if (isRequireLogin === false || (roles && !roles.includes(authority))) {
            // 로그인이 필요하지 않는 화면으로 이동하거나 권한이 없는 경우 존재하지 않는 경로 안내 화면으로 이동
            location.name = RouterName.NotFound;
        }
    } else {
        // 로그인을 하지 않거나 토큰이 만료된 경우
        isRequireLogin = Boolean(to.name === RouterName.Main || isRequireLogin || roles?.length);

        // 로그인이 필요한 화면으로 이동 시
        if (isRequireLogin) {
            const messageStore = useMessageStore();

            // 로그인 화면으로 이동
            location.name = RouterName.Login;

            // 메시지 표시
            if (to.name !== RouterName.Main && !messageStore.message) {
                messageStore.$patch({
                    isShow: true,
                    message: '로그인이 필요합니다.',
                });
            }
        }
    }

    if (!isEmpty(location)) {
        return Object.assign(location, { replace: true });
    }
};

export { beforeEach };
