import type { NavigationGuardWithThis, RouteLocationNamedRaw } from 'vue-router';

import { getLoginUser } from '@/functions/get';

import { RouterName } from '@/mappings/enum';

import useMessageStore from '@/stores/message';

import isEmpty from '@/utils/isEmpty';

/**
 * 경로 변경 전에 로그인 여부 확인
 * @param to 경로 변경 정보
 */
const beforeEach: NavigationGuardWithThis<undefined> = (to) => {
    const location: RouteLocationNamedRaw = {};
    const messageStore = useMessageStore();
    const { isRequireLogin } = to.meta;

    // 토큰 존재(로그인) 여부 확인
    // NOTE: 토큰 수와 토큰명은 프로젝트에 따라 다를 수 있음
    const { token } = getLoginUser();

    switch (Boolean(token)) {
        // 로그인을 한 경우
        case true:
            // 로그인이 필요하지 않는 화면으로 이동 시 메인 화면으로 이동 (존재하지 않는 경로 안내 화면으로 이동 시 제외)
            if (!isRequireLogin && to.name !== RouterName.NotFound) {
                // location.name = RouterName.Main;
            }

            break;

        // 로그인을 하지 않거나 토큰 만료 시
        default:
            // 로그인이 필요한 화면으로 이동 시 로그인 화면으로 이동
            if (isRequireLogin) {
                location.name = RouterName.Login;

                if (to.name !== RouterName.Main) {
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
