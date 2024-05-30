import type { JSONValue, Nullable } from '@/mappings/types/common';

/**
 * `string`(문자열) 값을 `JSON` 값으로 변환
 * @param string 문자열
 * @param isSafe 변환 오류 발생 시 예외 처리 여부 (`null` 반환)
 * @return `JSON` 또는 `null`
 */
function decode<T extends JSONValue>(string: string, isSafe: true): Nullable<T>;
function decode<T extends JSONValue>(string: string, isSafe?: false): T;
function decode(string: string, isSafe?: boolean) {
    try {
        return JSON.parse(string);
    } catch {
        if (isSafe) {
            return null;
        }

        throw Error(`[utils.json.decode] You're trying to decode an invalid JSON String: ${string}`);
    }
}

export default decode;
