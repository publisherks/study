/**
 * `selector` 문자열과 일치되는 부모 요소 반환
 * @param element 기준 요소
 * @param selector 부모 요소를 일치시키는 selector 문자열
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

    return null;
};

export default parent;
