<!-- Radio Group 컴포넌트 -->
<template>
    <VRadio
        v-for="(radio, index) in radios"
        :key="`radios.${radio.value}`"
        :id="radio.id"
        :value="radio.value"
        :checkValue="value"
        :disabled="disabled || radio.disabled"
        :invalid="invalid || radio.invalid"
        :class="{ 'ml-30': index }"
        @update:value="onUpdateValue"
    >
        {{ radio.label }}
    </VRadio>
</template>

<script setup lang="ts">
import type { Props as RadioProps } from '@/components/form/Radio.vue';

import type { Option } from '@/mappings/types/common';

// type
type Props = {
    /** 목록 */
    radios: (Partial<Option<RadioProps['checkValue']>> & Omit<RadioProps, 'checkValue'>)[];
} & Omit<RadioProps, 'id' | 'checkValue'>;

// model
/** 값 */
const value = defineModel<RadioProps['checkValue']>('value');

// props
const { radios, disabled, invalid } = defineProps<Props>();

// event
/**
 * 값 수정 시
 * @param updateValue 값
 */
const onUpdateValue = (updateValue: typeof value.value) => {
    value.value = updateValue;
};
</script>
