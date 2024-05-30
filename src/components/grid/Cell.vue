<!-- Grid Cell 컴포넌트 -->
<template>
    <div
        class="cell"
        :style
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

// type
type Props = {
    /** [`grid-column-start`, `grid-column-end`] */
    col?: number[];

    /** [`grid-row-start`, `grid-row-end`] */
    row?: number[];
};

// props
const { col: cols = [], row: rows = [] } = defineProps<Props>();

// computed
/** 스타일 */
const style = computed(() => {
    const style: CSSProperties = {};
    const [colStart, colEnd] = cols;
    const [rowStart, rowEnd] = rows;

    if (typeof colStart === 'number' && typeof colEnd === 'number') {
        style.gridColumn = `${colStart} / ${colEnd}`;
    }

    if (typeof rowStart === 'number' && typeof rowEnd === 'number') {
        style.gridRow = `${rowStart} / ${rowEnd}`;
    }

    return style;
});
</script>
