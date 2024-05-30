import { toValue, ref } from 'vue';
import type { MaybeRefOrGetter, Ref } from 'vue';

// type
type Props = {
    /** 모달에 전달한 `state` 초기화 여부 */
    isInitProps?: boolean;
};

/**
 * 모달 컴포넌트
 */
const setup = <T extends object>(props?: MaybeRefOrGetter<Props>) => {
    // props
    const { isInitProps = true } = toValue(props ?? {});

    // state
    /** 표시 여부 */
    const isShow = ref<boolean>(false);
    /** 모달에 전달할 `state` */
    const modalProps = ref({}) as Ref<T>;

    // event
    /**
     * 표시
     * @param state 모달에 전달할 `state`
     */
    const onShow = (state?: T) => {
        isShow.value = true;

        if (state) {
            modalProps.value = isInitProps ? state : {
                ...modalProps.value,
                state,
            };
        }
    };

    /**
     * 숨김
     */
    const onHide = () => {
        isShow.value = false;

        if (isInitProps) {
            modalProps.value = {} as T;
        }
    };

    return {
        isShow,
        props: modalProps,
        onShow,
        onHide,
    };
};

export default setup;
