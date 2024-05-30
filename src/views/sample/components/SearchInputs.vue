<!-- Input 컴포넌트 (검색 필드) -->
<template>
    <VTitle sub>
        - Search Inputs
    </VTitle>

    <VTitle sub>
        단일 Search Input
    </VTitle>
    <VInput
        v-model:value="inputs[0]"
        search
        class="mb-20"
        @search="onSearch"
    />

    <VTitle sub>
        검색 조건(Select 컴포넌트)이 있는 Search Input
    </VTitle>
    <div class="flex mb-30">
        <VSelect
            v-model:value="select"
            :options
            placeholder="검색 조건"
            class="sm"
        />
        <VInput
            v-model:value="inputs[1]"
            leftUnit
            search
            class="ml-10"
        />
        <VBtn
            :kind="ButtonType.Sub1"
            class="ml-10"
            @click="onSearch(inputs[1])"
        >
            검색
        </VBtn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { ButtonType } from '@/mappings/enum';
import type { InputValue, Primitive, Option } from '@/mappings/types/common';

// state
/** 현재 입력 값 목록 */
const inputs = ref<InputValue[]>([]);
/** 검색 조건 목록 */
const options = ref<Option[]>(
    new Array<number>(7)
        .fill(1)
        .map((start, index) => {
            const number = (start + index);

            return {
                label: `옵션${number}`,
                value: `option${number}`,
            };
        }),
);
/** 선택한 검색 조건 */
const select = ref<Primitive>();

// event
/**
 * 검색
 * @param value 입력 값
 */
const onSearch = (value: InputValue) => console.log(value); // eslint-disable-line no-console
</script>
