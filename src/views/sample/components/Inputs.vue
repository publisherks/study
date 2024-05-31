<!--
    Input 컴포넌트

    <VInput>
    1. model (* : 필수)
    1) v-model:value (InputValue : '@/mappings/types/common') : 현재 입력 값

    2. props (* : 필수)
    1) id (string) : 아이디
    2) type (string) : 유형 (default : 'text')
    3) maxlength (Numeric: '@/mappings/types/common') : 최대 입력 수
    4) placeholder (string) : 힌트 (default : '입력해주세요.')
    5) autocomplete (string) : 자동 완성
    6) autofocus (boolean) : 자동 포커스 여부 (default : false)
    7) disabled (boolean) : 비활성화 여부 (default : false)
    8) invalid (boolean) : 유효성 여부 (default : false)
    9) leftLabel (boolean) : 좌측 라벨 여부 (default : false)
    10) leftUnit (boolean) : 좌측 단위 여부 (default : false)
    11) lowerCase (boolean) : 소문자 변환 여부 (default : false)
    12) upperCase (boolean) : 대문자 변환 여부 (default : false)
    13) readonly (boolean) : 읽기 전용 여부 (default : false)
    14) required (boolean) : 필수 여부 (default : false)
    15) search (boolean) : 검색 필드 여부 (default : false)
    16) invalidMessage (string) : 유효하지 않는 경우 메시지

    3. emits
    1) emit('search', InputValue : '@/mappings/types/common') : 검색

    4. slots
    1) <template #label> : 라벨
    2) <template #unit> : 단위
    3) <template #info> : 정보 텍스트

    <VInputNumber>
    1. model (* : 필수)
    1) v-model:value (InputValue : '@/mappings/types/common') : 현재 입력 값

    2. props (* : 필수)
    1) id (string) : 아이디
    2) min (Numeric: '@/mappings/types/common') : 최소 값
    3) max (Numeric: '@/mappings/types/common') : 최대 값
    4) maximumFractionDigits (Numeric: '@/mappings/types/common') : 최대 소수점 자리 수 (default : 3)
    5) placeholder (string) : 힌트 (default : '입력해주세요.')
    6) autocomplete (string) : 자동 완성
    7) autofocus (boolean) : 자동 포커스 여부 (default : false)
    8) disabled (boolean) : 비활성화 여부 (default : false)
    9) format (boolean) : 값을 숫자 형식이 적용된 값으로 변환 여부 (default : true)
    10) invalid (boolean) : 유효성 여부 (default : false)
    11) leftLabel (boolean) : 좌측 라벨 여부 (default : false)
    12) leftUnit (boolean) : 좌측 단위 여부 (default : false)
    13) readonly (boolean) : 읽기 전용 여부 (default : false)
    14) required (boolean) : 필수 여부 (default : false)
    15) search (boolean) : 검색 필드 여부 (default : false)
    16) invalidMessage (string) : 유효하지 않는 경우 메시지

    3. emits
    1) emit('search', InputValue : '@/mappings/types/common') : 검색

    4. slots
    1) <template #label> : 라벨
    2) <template #unit> : 단위
    3) <template #info> : 정보 텍스트
-->
<template>
    <VTitle sub>
        - Default Inputs
    </VTitle>
    <VInput
        v-model:value="inputs[0]"
        class="xs mb-10"
    />
    <VInput
        v-model:value="inputs[1]"
        disabled
        class="sm mb-10"
    />
    <VInput
        v-model:value="inputs[2]"
        placeholder="invalid"
        :invalid="!inputs[2]"
        class="mb-10"
    />
    <VInput
        v-model:value="inputs[3]"
        readonly
        class="lg mb-30"
    />

    <VTitle sub>
        - Input Labels & Info Text & Valid Text
    </VTitle>
    <VInput
        v-model:value="inputs[4]"
        required
        class="xl mb-10"
    >
        <template #label>
            Label 텍스트
        </template>
    </VInput>
    <VInput
        v-model:value="inputs[5]"
        leftLabel
        class="xl mb-10"
    >
        <template #label>
            Label 텍스트
        </template>
    </VInput>
    <VInput
        v-model:value="inputs[6]"
        class="pull mb-10"
    >
        <template #info>
            하단 Info 텍스트
        </template>
    </VInput>
    <VInput
        v-model:value="inputs[7]"
        :invalid="!inputs[7]"
        :invalidMessage="inputs[7] ? '' : '하단 Valid 텍스트'"
        class="pull"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { InputValue } from '@/mappings/types/common';

// state
/** 현재 입력 값 목록 */
const inputs = ref<InputValue[]>([
    '',
    'disabled',
    '',
    'readonly',
    '',
    '',
    '',
    '',
]);
</script>
