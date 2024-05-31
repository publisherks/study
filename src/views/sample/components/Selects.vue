<!--
    Select 컴포넌트

    1. model (* : 필수)
    1) v-model:value (Primitive : '@/mappings/types/common') : 현재 값

    2. props (* : 필수)
    1) * options (Option[] : '@/mappings/types/common') : 목록
    2) placeholder (string) : 힌트 (default : '선택해주세요.')
    3) disabled (boolean) : 비활성화 여부 (default : false)
    4) input (boolean): 입력 값도 현재 값으로 설정 여부 (default : false)
    5) invalid (boolean) : 유효성 여부 (default : false)
    6) leftLabel (boolean) : 좌측 라벨 여부 (default : false)
    7) moveToBody (boolean) : <Option> 컴포넌트를 <body> 하위로 이동 여부 (default : false)
    8) required (boolean) : 필수 여부 (default : false)
    9) search (boolean) : options(목록) 검색 여부 (default : false)
    10) invalidMessage (string) : 유효하지 않는 경우 메시지

    3. emits
    1) emit('scroll:bottom') : 최하단으로 스크롤 시

    4. slots
    1) <template #label> : 라벨
    2) <template #info> : 정보 텍스트
-->
<template>
    <VTitle sub>
        - Selects
    </VTitle>
    <VSelect
        v-model:value="selects[0]"
        :options="options"
        class="xs mb-10"
    />
    <VSelect
        v-model:value="selects[1]"
        :options="options"
        disabled
        class="sm mb-10"
    />
    <VSelect
        v-model:value="selects[2]"
        :options="options"
        placeholder="invalid"
        :invalid="!selects[2]"
        required
        class="lg mb-10"
    />
    <VSelect
        v-model:value="selects[3]"
        :options="options"
        moveToBody
        class="xl mb-30"
    />

    <VTitle sub>
        - Select Labels & Info Text & Valid Text
    </VTitle>
    <VSelect
        v-model:value="selects[4]"
        :options="options"
        class="pull mb-10"
    >
        <template #label>
            상단 Label 텍스트
        </template>
    </VSelect>
    <VSelect
        v-model:value="selects[5]"
        :options="options"
        leftLabel
        class="pull mb-10"
    >
        <template #label>
            좌측 Label 텍스트
        </template>
    </VSelect>
    <VSelect
        v-model:value="selects[6]"
        :options="options"
        class="pull mb-10"
    >
        <template #label>
            상단 Label 텍스트
        </template>
        <template #info>
            하단 Info 텍스트
        </template>
    </VSelect>
    <VSelect
        v-model:value="selects[7]"
        :options="options"
        :invalid="!selects[7]"
        leftLabel
        required
        invalidMessage="하단 Valid 텍스트"
        class="pull"
    >
        <template #label>
            좌측 Label 텍스트
        </template>
    </VSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Primitive, Option } from '@/mappings/types/common';

// state
/** 목록 */
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
/** 현재 값 목록 */
const selects = ref<Primitive[]>([
    '',
    'option1',
    '',
    '',
    '',
    'option1',
    '',
    '',
]);
</script>
