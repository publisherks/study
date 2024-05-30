import type { Primitive, Option } from '@/mappings/types/common';

/**
 * Select Option
 */
const setup = () => {
    // methods
    /**
     * `options`(목록)에서 `value`(값)에 대한 `label`(라벨) 반환
     * @param options 목록
     * @param value 값
     * @return `label`(라벨)
     */
    const getLabelByValue = (options: Option[], value: Primitive) => options.find((option) => (value === option.value))?.label;

    /**
     * `options`(목록)에서 `label`(라벨)에 대한 `value`(값) 반환
     * @param options 목록
     * @param label 라벨
     * @return `value`(값)
     */
    const getValueByLabel = (options: Option[], label: string) => options.find((option) => (label === option.label))?.value;

    /**
     * 숫자 목록 반환
     * @param start 시작 숫자
     * @param end 끝 숫자
     * @param isPadStartZero `end`(끝 숫자) 자리 수만큼 시작(좌측)부터 0으로 채워넣기 여부
     * @return 숫자 목록
     */
    const getNumberOptions = (start: number, end: number, isPadStartZero = true) => Array<number>(end + 1)
        .fill(start)
        .map((start, index) => {
            const value = (start + index);
            const label = String(value);

            return {
                label: isPadStartZero ? label.padStart(String(end).length, '0') : label,
                value,
            };
        });

    return {
        getLabelByValue,
        getValueByLabel,
        getNumberOptions,
    };
};

export default setup;
