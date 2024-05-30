/**
 * 배열에 아직 `item` 항목이 포함되어 있지 않은 경우 배열에 `item` 항목 추가
 * @param array 배열
 * @param item 포함할 항목
 * @example
 * include([0, 1], 2); // [0, 1, 2]
 * include([0, 1], 0); // [0, 1]
 */
const include = <T>(array: T[], item: T) => {
    if (!array.includes(item)) {
        array.push(item);
    }
};

export default include;
