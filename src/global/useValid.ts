import { ValidError } from '@/mappings/error';

import useMessageStore from '@/stores/message';

/**
 * 유효성 확인
 */
const setup = () => {
    // store
    /** 메시지 */
    const messageStore = useMessageStore();

    // methods
    /**
     * 유효성 확인
     * @param func 함수
     */
    const valid = async (func: () => unknown) => {
        const error = await func();

        if (error instanceof ValidError) {
            messageStore.$patch({
                isShow: true,
                message: error.message,
            });
        }
    };

    return { valid };
};

export default setup;
