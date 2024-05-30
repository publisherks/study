import { useSlots, ref, onBeforeUpdate } from 'vue';

import isEmpty from '@/utils/isEmpty';

/**
 * 존재하는 슬롯 확인
 */
const setup = () => {
    // slots
    const slots = useSlots();

    // state
    /** 존재하는 슬롯 목록 */
    const hasSlots = ref<string[]>([]);

    // methods
    /**
     * 존재하는 슬롯 확인
     * - 슬롯 안에 노드가 있고 하위 노드가 있는 경우
     * - 자체 닫힘(내용이 없는) 요소 예외 처리 (`v-html`, `<area />`, `<br />`, `<col />`, `<embed />`, `<hr />`, `<img />`, `<input />`, `<source />`, `<track />`, `<wbr />`)
     */
    const checkHasSlots = () => {
        hasSlots.value = Object.entries(slots)
            .filter(([, slot]) => {
                const vNodes = slot?.();

                return (
                    vNodes?.length
                    && vNodes.some(({ children, props, type }) => {
                        /**
                         * 자체 닫힘(내용이 없는) 요소 목록
                         * @see {@link https://developer.mozilla.org/ko/docs/Glossary/Void_element}
                         */
                        const selfClosingHTMLs = [
                            'area',
                            'br',
                            'col',
                            'embed',
                            'hr',
                            'img',
                            'input',
                            'source',
                            'track',
                            'wbr',
                        ];

                        return (props?.innerHTML || (typeof type === 'string' && selfClosingHTMLs.includes(type)) || !isEmpty(children));
                    })
                );
            })
            .map(([key]) => key);
    };

    // lifecycle
    checkHasSlots();
    onBeforeUpdate(checkHasSlots);

    return {
        slots,
        hasSlots,
    };
};

export default setup;
