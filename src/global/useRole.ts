import { storeToRefs } from 'pinia';

import { UserAuthority } from '@/mappings/enum';

import useLoginStore from '@/stores/login';

/**
 * 권한 확인
 */
const setup = () => {
    // store
    const { authority } = storeToRefs(useLoginStore());

    // methods
    /**
     * 권한 여부 반환
     * @param role 권한
     * @return 권한 여부
     */
    const hasRole = (role: UserAuthority) => {
        const roles = Object.values(UserAuthority);
        const index = roles.indexOf(role);

        return (index >= 0 && index >= roles.indexOf(authority.value));
    };

    return { hasRole };
};

export default setup;
