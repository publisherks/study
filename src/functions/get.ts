import Cookies from 'js-cookie';

import { RouterName, StorageKey, UserAuthority } from '@/mappings/enum';
import type { Login } from '@/mappings/types/store';

import decode from '@/utils/json/decode';

/**
 * 로그인 계정 초기 정보 반환
 * @return 로그인 계정 초기 정보
 */
const getInitLoginUser = (): Login => ({
    id: '',
    name: '',
    prefix: '',
    accessToken: '',
    refreshToken: '',
    authority: UserAuthority.User,
});

/**
 * 로그인 계정 정보 반환
 * @return 로그인 계정 정보
 */
const getLoginUser = () => (decode<Login>(Cookies.get(StorageKey.LoginUser) ?? '', true) ?? getInitLoginUser());

/**
 * 로그인 계정 토큰 반환
 * @return 로그인 계정 토큰
 */
const getLoginUserToken = () => {
    const loginUser = getLoginUser();
    const { prefix } = loginUser;

    let { accessToken, refreshToken } = loginUser;

    if (prefix) {
        accessToken = `${prefix}${accessToken}`;
        refreshToken = `${prefix}${refreshToken}`;
    }

    return {
        accessToken,
        refreshToken,
    };
};

/**
 * 해당 권한의 메인 경로명 반환
 * @param authority 권한
 * @return 해당 권한의 메인 경로명
 */
const getMainRouterName = (authority?: UserAuthority) => {
    authority ||= getLoginUser().authority;

    // FIXME: 계정 권한 정의에 맞춰서 수정 필요
    switch (authority) {
        case UserAuthority.System:
        case UserAuthority.Master:
        case UserAuthority.Admin:
            return RouterName.WidgetDashboard;

        default:
            return RouterName.UserList;
    }
};

export {
    getInitLoginUser,
    getLoginUser,
    getLoginUserToken,
    getMainRouterName,
};
