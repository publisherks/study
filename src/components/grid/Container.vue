<!-- Grid 컴포넌트 -->
<template>
    <div
        :class="[
            'grid-container',
            {
                row: isRow,
                [`cell-${cols}`]: !colsWidth.length,
            },
        ]"
        :style="style"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

import type { Numeric } from '@/mappings/types/common';

import rem from '@/utils/css/rem';

// type
type Props = {
    /** cell 1 ~ 12 */
    cols?: Numeric;

    /** 여러 줄 여부 */
    rows?: boolean;

    /**
     * `grid-template-columns` 픽셀 목록
     * - 해당 값 전달 시 `<VCell>`(Grid Cell) 컴포넌트에서 `col`(grid-column) 값 전달 불가
     */
    colsWidth?: (number | string)[];

    /**
     * `grid-template-rows` 픽셀 목록
     * - 해당 값 전달 시 `<VCell>`(Grid Cell) 컴포넌트에서 `row`(grid-row) 값 전달 불가
     */
    rowsWidth?: (number | string)[];

    /** `grid-column-gap` 픽셀 목록 */
    colGap?: number[];

    /** `grid-row-gap` 픽셀 목록 */
    rowGap?: number[];
};

// props
const { cols = 12, rows: isRow, colsWidth = [], rowsWidth = [], colGap = [], rowGap = [] } = defineProps<Props>();

// computed
/** 스타일 */
const style = computed(() => {
    const styles = Object.entries({
        colsWidth,
        rowsWidth,
        colGap,
        rowGap,
    });

    return styles.reduce<CSSProperties>((result, [key, value]) => {
        if (!value.length) {
            return result;
        }

        const type = key.includes('row') ? 'Row' : 'Column';
        const style = key.includes('Gap') ? `grid${type}Gap` : `gridTemplate${type}s`;

        result = {
            ...result,
            [style]: value.reduce((result, value) => `${result} ${(typeof value === 'number') ? rem(value) : value}`, ''),
        };

        if (key === 'colGap' && !colsWidth.length) {
            const remValue = rem(Number(value));
            const gap = `calc(${remValue} * ${cols} - ${remValue})`;

            result.gridTemplateColumns = `repeat(${cols}, minmax(calc((100% - ${gap}) / ${cols}), auto))`;
        }

        return result;
    }, {});
});
</script>
