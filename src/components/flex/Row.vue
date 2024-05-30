<!-- Flex Row 컴포넌트 -->
<template>
    <div :class="cols ? `row-cols-${cols}` : 'row'">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { Numeric } from '@/mappings/types/common';

// type
type Props = {
    /**
     * col 1 ~ 12
     * - `<VCol>`(Flex Column) 컴포넌트에서 `cols` 값을 전달하지 않아도 너비 자동 계산
     */
    cols?: Numeric;
};

// props
const { cols } = defineProps<Props>();
</script>
