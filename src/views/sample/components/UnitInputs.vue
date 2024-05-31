<template>
    <VTitle sub>
        - Input Units
    </VTitle>
    <VInput
        v-model:value="inputs[0]"
        class="mb-10"
    >
        <template #unit>
            원
        </template>
    </VInput>
    <VInput
        v-model:value="inputs[1]"
        leftUnit
    >
        <template #unit>
            $
        </template>
    </VInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { InputValue } from '@/mappings/types/common';

// state
/** 현재 입력 값 목록 */
const inputs = ref<InputValue[]>([]);
</script>
