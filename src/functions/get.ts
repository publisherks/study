import Cookies from 'js-cookie';

import { StorageKey } from '@/mappings/enum';
import type { Login } from '@/mappings/types/store';

import decode from '@/utils/json/decode';

/**
 * 로그인 계정 초기 정보 반환
 * @return 로그인 계정 초기 정보
 */
const getInitLoginUser = (): Login => ({
    id: '',
    name: '',
    token: '',
});

/**
 * 로그인 계정 정보 반환
 * @return 로그인 계정 정보
 */
const getLoginUser = () => (decode<Login>(Cookies.get(StorageKey.LoginUser) ?? '', true) ?? getInitLoginUser());

export {
    getInitLoginUser,
    getLoginUser,
};
