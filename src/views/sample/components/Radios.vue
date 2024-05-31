<!--
    Radio 컴포넌트

    1. model (* : 필수)
    1) v-model:value (Primitive : '@/mappings/types/common') : 값

    2. props (* : 필수)
    1) id (string) : 아이디
    2) checkValue (Primitive : '@/mappings//types/common') : 체크할 값
    3) disabled (boolean) : 비활성화 여부 (default : false)
    4) invalid (boolean) : 유효성 여부 (default : false)

    3. slots
    1) default : 라벨
-->
<template>
    <VTitle sub>
        - Radios
    </VTitle>
    <VRadio
        value="radio1"
        :checkValue="value"
        class="mr-30"
        @update:value="onUpdate"
    />
    <VRadio
        value="radio2"
        :checkValue="value"
        class="mr-30"
        @update:value="onUpdate"
    >
        텍스트
    </VRadio>
    <VRadio
        value="radio3"
        :checkValue="value"
        disabled
        class="mr-30"
        @update:value="onUpdate"
    >
        disabled
    </VRadio>
    <VRadio
        value="radio4"
        :checkValue="value"
        :invalid="value !== 'radio4'"
        @update:value="onUpdate"
    >
        invalid
    </VRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Primitive } from '@/mappings/types/common';

// state
/** 값 */
const value = ref<Primitive>('radio2');

// event
/**
 * 값 수정
 * @param updateValue 값
 */
const onUpdate = (updateValue: Primitive) => {
    value.value = updateValue;
};
</script>
