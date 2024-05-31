<!--
    Tab 컴포넌트

    1. model (* : 필수)
    1) v-model:value (Primitive : '@/mappings/types/common') : 현재 탭

    2. props (* : 필수)
    1) * tabs (Option<Primitive | Primitive[]>[] : '@/mappings/types/common') : 목록
-->
<template>
    <VTab
        v-model:value="value"
        :tabs="tabs"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Option } from '@/mappings/types/common';

// state
/** 현재 탭 */
const value = ref<number>(1);
/** 목록 */
const tabs = ref<Option<number>[]>(
    new Array(3)
        .fill(1)
        .map((start, index) => {
            const value = (start + index);

            return {
                label: `Tab${value}`,
                value,
            };
        }),
);
</script>
