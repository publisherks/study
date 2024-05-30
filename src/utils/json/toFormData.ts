import type { Primitive, UploadFile } from '@/mappings/types/common';

import isFile from '@/utils/isFile';
import isFileList from '@/utils/isFileList';
import isObject from '@/utils/isObject';

// type
type JSONValue = { [key: string]: Primitive | JSONValue | JSONValue[] | UploadFile };

/**
 * `json` 값을 `FormData` 값으로 변환
 * @param json JSON
 * @param formData FormData
 * @param parentKey 상위 키
 * @return `FormData`
 */
const toFormData = (json: JSONValue, formData = new FormData(), parentKey?: string): FormData => Object.entries(json)
    .reduce((result, [key, value]) => {
        if (parentKey) {
            key = `${parentKey}.${key}`;
        }

        if (Array.isArray(value)) {
            return value.reduce((result, value, index) => toFormData(value, result, `${key}[${index}]`), result);
        }

        if (isFileList(value)) {
            return Array.from(value)
                .reduce((result, value, index) => {
                    result.set(`${key}[${index}]`, value);

                    return result;
                }, result);
        }

        if (isObject(value) && !isFile(value)) {
            return toFormData(value, result, key);
        }

        if (typeof value !== 'string' && !isFile(value)) {
            value = String(value);
        }

        result.set(key, value);

        return result;
    }, formData);

export default toFormData;
export type { JSONValue };
