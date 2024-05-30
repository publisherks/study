<!-- Grid 컴포넌트 -->
<template>
    <div
        :class="[
            'grid-container',
            {
                row: isRow,
                [`cell-${cols}`]: !colsWidth.length,
                [`align-${align}`]: align,
            },
        ]"
        :style
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

import type { Numeric } from '@/mappings/types/common';

import isEmpty from '@/utils/isEmpty';
import isNumeric from '@/utils/isNumeric';
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
    colsWidth?: Numeric[];

    /**
     * `grid-template-rows` 픽셀 목록
     * - 해당 값 전달 시 `<VCell>`(Grid Cell) 컴포넌트에서 `row`(grid-row) 값 전달 불가
     */
    rowsWidth?: Numeric[];

    /** `column-gap` 픽셀 */
    colGap?: Numeric;

    /** `row-gap` 픽셀 */
    rowGap?: Numeric;

    /** 정렬 */
    align?: 'start' | 'end';
};

// props
const { cols = 12, rows: isRow, colsWidth = [], rowsWidth = [], colGap, rowGap, align } = defineProps<Props>();

// computed
/** 스타일 */
const style = computed(() => {
    const styles = Object.entries({
        colsWidth,
        rowsWidth,
        colGap,
        rowGap,
    });
    const styleProperties = [
        'gridTemplateColumns',
        'gridTemplateRows',
        'columnGap',
        'rowGap',
    ] as const;
    const style = styles.reduce<Record<string, typeof styleProperties[number]>>((result, [key], index) => ({
        ...result,
        [key]: styleProperties[index],
    }), {});

    return styles.reduce<CSSProperties>((result, [key, value]) => {
        if (!isEmpty(value)) {
            result = {
                ...result,
                [style[key]]: Array.isArray(value)
                    ? value.reduce((result, value) => `${result} ${isNumeric(value) ? rem(Number(value)) : value}`, '')
                    : isNumeric(value) ? rem(Number(value)) : value,
            };

            if (key === 'colGap' && !colsWidth.length) {
                const { columnGap } = result;
                const gap = `calc(${columnGap} * ${cols} - ${columnGap})`;

                result[style.colsWidth] = `repeat(${cols}, minmax(calc((100% - ${gap}) / ${cols}), auto))`;
            }
        }

        return result;
    }, {});
});
</script>
