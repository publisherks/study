import type { InputValue, Primitive } from '@/mappings/types/common';

import isNumeric from '@/utils/isNumeric';

/**
 * `value`(변환 전 값) 타입이 `string`인 경우 해당 값의 형식에 따라 `InputValue`(입력 값) 타입으로 변환
 * @param value 변환 전 값
 * @param isConvertNumber 해당 값이 숫자 형식인 경우 `number` 타입으로 변환 여부
 * @return 변환 후 값
 */
const convertInputValue = (value: InputValue, isConvertNumber?: boolean) => {
    if (typeof value === 'string') {
        const number = Number(value);

        if (isConvertNumber && !isNaN(number) && isNumeric(value)) {
            return number;
        }

        switch (value) {
            case 'null':
                return null;

            case 'undefined':
                return undefined;
        }
    }

    return value;
};

/**
 * `value`(변환 전 값) 타입이 `string`인 경우 해당 값의 형식에 따라 `Primitive`(원시 값) 타입으로 변환
 * @param value 변환 전 값
 * @param convert `number` : 해당 값이 숫자 형식인 경우 `number` 타입으로 변환, `string` : 변환 후 값을 `string` 타입으로 변환 (변환 후 값이 `string` 타입이 아닌 경우 `''`_(빈 문자열)_ 로 반환)
 * @return 변환 후 값
 */
const convertPrimitive = (value: Primitive, convert?: 'number' | 'string' | ('number' | 'string')[]): Primitive => {
    const isConvertNumber = (convert && (convert === 'number' || convert.includes('number')));
    const isConvertString = (convert && (convert === 'string' || convert.includes('string')));

    return (typeof value === 'string')
        ? ['true', 'false'].includes(value)
            ? (value === 'true')
            : convertInputValue(value, isConvertNumber)
        : isConvertString
            ? (typeof value === 'string')
                ? value
                : ''
            : value;
};

export {
    convertInputValue,
    convertPrimitive,
};
