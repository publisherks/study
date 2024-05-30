<!-- Flex Column 컴포넌트 -->
<template>
    <div :class="cols ? `col-${cols}` : 'col'">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { Numeric } from '@/mappings/types/common';

// type
type Props = {
    /**
     * col 1 ~ 12
     * - `<VRow>`(Flex Row) 컴포넌트에서 `cols` 값을 전달하지 않은 경우 필수 전달 필요
     */
    cols?: Numeric;
};

// props
const { cols } = defineProps<Props>();
</script>
