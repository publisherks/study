import isObject from '@/utils/isObject';

// type
type NestedObject<T> = { [key: string]: NestedObject<T> | T | undefined };

/**
 * `nestedObject`(중첩된 객체) 값에서 `partialObject`(일부 객체) 값의 프로퍼티만 수정
 * @param nestedObject 중첩된 객체
 * @param partialObject 일부 객체
 * @return `partialObject`(일부 객체) 값의 프로퍼티만 수정된 `nestedObject`(중첩된 객체)
 */
const assignNestedProperty = <T>(nestedObject: NestedObject<T>, partialObject: Partial<NestedObject<T>>) => Object.entries(partialObject)
    .reduce((result, [key, value]) => {
        if (isObject(value)) {
            result[key] ??= {};

            assignNestedProperty(result[key] as NestedObject<T>, value);
        } else {
            result[key] = value;
        }

        return result;
    }, nestedObject);

export default assignNestedProperty;
