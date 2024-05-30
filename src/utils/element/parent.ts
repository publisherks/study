/**
 * `selector` 문자열과 일치되는 부모 요소 반환
 * @param element 기준 요소
 * @param selector 부모 요소를 일치시키는 selector 문자열 (빈 값인 경우 `element`_(기준 요소)_ 값의 부모 요소로 설정)
 * @return `selector` 문자열과 일치되는 부모 요소
 */
const parent = (element: HTMLElement, selector?: string) => {
    let parent = element.parentElement;

    if (!selector) {
        return parent;
    }

    while (parent) {
        if (parent.matches(selector)) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return parent;
};

export default parent;
