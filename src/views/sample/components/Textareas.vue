<!--
    Textarea 컴포넌트

    1. model (* : 필수)
    1) v-model:value (Numeric: '@/mappings/types/common') : 현재 입력 값

    2. props (* : 필수)
    1) id (string) : 아이디
    2) height (Numeric: '@/mappings/types/common') : 높이
    3) minHeight (Numeric: '@/mappings/types/common') : 최소 높이
    4) maxHeight (Numeric: '@/mappings/types/common') : 최대 높이
    5) maxlength (Numeric: '@/mappings/types/common') : 최대 입력 수
    6) placeholder (string) : 힌트 (default : '입력해주세요.')
    7) autocomplete (string) : 자동 완성
    8) autofocus (boolean) : 자동 포커스 여부 (default : false)
    9) disabled (boolean) : 비활성화 여부 (default : false)
    10) invalid (boolean) : 유효성 여부 (default : false)
    11) leftLabel (boolean) : 좌측 라벨 여부 (default : false)
    12) required (boolean) : 필수 여부 (default : false)
    13) invalidMessage (string) : 유효하지 않는 경우 메시지

    3. slots
    1) <template #label> : 라벨
    2) <template #info> : 정보 텍스트
-->
<template>
    <VTitle sub>
        - Textareas
    </VTitle>
    <VTextarea
        v-model:value="inputs[0]"
        class="mb-10"
    />
    <VTextarea
        v-model:value="inputs[1]"
        disabled
        class="mb-10"
    />
    <VTextarea
        v-model:value="inputs[2]"
        placeholder="invalid"
        :invalid="!inputs[2]"
        class="mb-30"
    />

    <VTitle sub>
        - Textarea Labels & Info Text & Valid Text
    </VTitle>
    <VTextarea
        v-model:value="inputs[3]"
        class="pull mb-10"
    >
        <template #label>
            상단 Label 텍스트
        </template>
    </VTextarea>
    <VTextarea
        v-model:value="inputs[4]"
        disabled
        leftLabel
        class="pull mb-10"
    >
        <template #label>
            좌측 Label 텍스트
        </template>
    </VTextarea>
    <VTextarea
        v-model:value="inputs[5]"
        required
        class="pull mb-10"
    >
        <template #label>
            상단 Label 텍스트
        </template>
        <template #info>
            하단 Info 텍스트
        </template>
    </VTextarea>
    <VTextarea
        v-model:value="inputs[6]"
        :invalid="!inputs[6]"
        leftLabel
        required
        invalidMessage="하단 Valid 텍스트"
        class="pull mb-10"
    >
        <template #label>
            좌측 Label 텍스트
        </template>
    </VTextarea>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// state
/** 현재 입력 값 목록 */
const inputs = ref<string[]>([
    '',
    'disabled',
    '',
    '',
    'disabled',
    '',
    '',
]);
</script>
