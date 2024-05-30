<!--
    Checkbox 컴포넌트

    1. model (* : 필수)
    1) v-model:checked (boolean) : 체크 여부 (default : false)

    2. props (* : 필수)
    1) id (string) : 아이디
    2) disabled (boolean) : 비활성화 여부 (default : false)
    3) invalid (boolean) : 유효성 여부 (default : false)

    3. slots
    1) default : 라벨
-->
<template>
    <VTitle sub>
        - Checkboxs
    </VTitle>

    <VCheck
        v-model:checked="checks[0]"
        class="mr-30"
    />
    <VCheck
        v-model:checked="checks[1]"
        class="mr-30"
    >
        텍스트
    </VCheck>
    <VCheck
        v-model:checked="checks[2]"
        disabled
        class="mr-30"
    >
        disabled
    </VCheck>
    <VCheck
        v-model:checked="checks[3]"
        :invalid="!checks[3]"
    >
        invalid
    </VCheck>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// state
/** 체크 목록 */
const checks = ref<boolean[]>([
    false,
    true,
    false,
    false,
]);
</script>
