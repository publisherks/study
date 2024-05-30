import type { InputValue, Primitive, Option, Nullish } from '@/mappings/types/common';

import isNumeric from '@/utils/isNumeric';

/**
 * `value`(변환 전 값) 타입이 `string`인 경우 해당 값의 형식에 따라 `InputValue`(입력 값) 타입으로 변환
 * @param value 변환 전 값
 * @param isConvertNumber 해당 값이 숫자 형식인 경우 `number` 타입으로 변환 여부
 * @return 변환 후 값
 */
const convertInputValue = (value: InputValue, isConvertNumber?: boolean): InputValue => {
    if (typeof value === 'string') {
        if (isConvertNumber && isNumeric(value)) {
            return Number(value);
        }

        const convertValue: Record<typeof value, Nullish> = {
            null: null,
            undefined,
        };
        const isNullish = Object.keys(convertValue)
            .includes(value);

        if (isNullish) {
            return convertValue[value];
        }
    }

    return value;
};

/**
 * `value`(변환 전 값) 타입이 `string`인 경우 해당 값의 형식에 따라 `Primitive`(원시 값) 타입으로 변환
 * @param value 변환 전 값
 * @param convert `number` : 해당 값이 숫자 형식인 경우 `number` 타입으로 변환, `string` : 변환 후 값이 `string` 타입이 아닌 경우 `''`_(빈 문자열)_ 로 반환
 * @return 변환 후 값
 */
const convertPrimitive = (value: Primitive, convert?: 'number' | 'string' | ('number' | 'string')[]): Primitive => {
    const isConvertNumber = convert?.includes('number');
    const isConvertString = convert?.includes('string');

    if (typeof value === 'string') {
        value = ['true', 'false'].includes(value) ? (value === 'true') : convertInputValue(value, isConvertNumber);
    }

    return (isConvertString && typeof value !== 'string') ? '' : value;
};

/**
 * `options`(목록) 값 앞에 전체를 추가한 `options`(목록) 값으로 변환
 * @param options 목록
 * @return `options`(목록) 값 앞에 전체를 추가한 `options`(목록) 값
 */
const convertOptionsToPrependAll = (options: Option[]) => [
    {
        label: '전체',
        value: undefined,
    },
    ...options,
];

export {
    convertInputValue,
    convertPrimitive,
    convertOptionsToPrependAll,
};
