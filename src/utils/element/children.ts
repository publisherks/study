/**
 * 하위 요소 반환
 * - 하위 요소가 없는 경우 생성 후 반환
 * @param selector 하위 요소 선택자
 * @param base 기준 요소
 * @param style 하위 요소가 없는 경우 생성 시 적용할 스타일
 * @return 하위 요소
 */
const children = (selector: string, base = document.body, style?: Partial<CSSStyleDeclaration>) => {
    let list = base.querySelector<HTMLElement>(selector);

    if (!list) {
        list = document.createElement(selector);

        if (style) {
            Object.assign(list.style, style);
        }

        base.appendChild(list);
    }

    return list;
};

export default children;
