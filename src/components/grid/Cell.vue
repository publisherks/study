<!-- Grid Cell 컴포넌트 -->
<template>
    <div
        class="cell"
        :style="style"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

// type
type Props = {
    /** [`grid-row-start`, `grid-row-end`] */
    row?: number[];

    /** [`grid-column-start`, `grid-column-end`] */
    col?: number[];
};

// props
const { row: rows = [], col: cols = [] } = defineProps<Props>();

// computed
/** 스타일 */
const style = computed(() => {
    const style: CSSProperties = {};

    if (rows.length === 2) {
        style['grid-row'] = `${rows[0]} / ${rows[1]}`;
    }

    if (cols.length === 2) {
        style['grid-column'] = `${cols[0]} / ${cols[1]}`;
    }

    return style;
});
</script>
