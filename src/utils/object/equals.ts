import type { KeyValuePair } from '@/mappings/types/common';

import isJSON from '@/utils/isJSON';

/**
 * 두 객체의 내용 동일 여부 확인
 * @param o1 객체 1
 * @param o2 객체 2
 * @return 두 객체의 내용 동일 여부
 */
const check = <T extends object, U extends object>(o1: T, o2: U) => Object.entries(o1)
    .every(([key, o1Value]) => {
        const { [key]: o2Value } = o2 as KeyValuePair<any>;

        return (((isJSON(o1Value)) && isJSON(o2Value) && JSON.stringify(o1Value) === JSON.stringify(o2Value)) || o1Value === o2Value);
    });

/**
 * 두 객체의 내용 동일 여부 반환
 * @param object1 객체 1
 * @param object2 객체 2
 * @return 두 객체의 내용 동일 여부
 */
const equals = <T extends object, U extends object>(object1: T, object2: U) => (check(object1, object2) && check(object2, object1));

export default equals;
