import { ref, reactive } from 'vue';

import type { KeyValuePair } from '@/mappings/types/common';

/**
 * 모달 컴포넌트
 */
const setup = <T extends KeyValuePair<any>>() => {
    // state
    /** 표시 여부 */
    const isShow = ref<boolean>(false);
    /** 모달에 전달할 `state` */
    const props = reactive({} as T);

    // event
    /**
     * 표시
     * @param state 모달에 전달할 `state`
     */
    const onShow = (state?: T) => {
        isShow.value = true;

        Object.assign(props, state);
    };

    /**
     * 숨김
     */
    const onHide = () => {
        isShow.value = false;
    };

    return {
        isShow,
        props,
        onShow,
        onHide,
    };
};

export default setup;
