<!-- Input 기본 컴포넌트 -->
<template>
    <Form
        v-model:value="value"
        :id
        :disabled
        :invalid
        :leftLabel
        :leftUnit
        :readonly
        :required
        :search
        :invalidMessage
        @search="emit('search', $event)"
    >
        <template
            v-if="hasLabel"
            #label
        >
            <slot name="label" />
        </template>
        <template #default="slotProps">
            <input
                :id
                ref="inputElement"
                :class="{ 'align-r': (hasUnit && !isLeftUnit) }"
                :style="slotProps?.style"
                :type
                :value
                :maxlength
                :placeholder
                :autocomplete
                :autofocus
                :disabled
                :readonly
                :required
                :tabindex="(disabled || readonly) ? -1 : 0"
                @input="onInputValue"
                @keyup.enter="onSearch"
            />
        </template>
        <template
            v-if="hasUnit"
            #unit
        >
            <slot name="unit" />
        </template>
        <template
            v-if="hasInfo"
            #info
        >
            <slot name="info" />
        </template>
    </Form>
</template>

<script lang="ts">
import type { Props as FormProps, Emits } from '@/components/form/input/Container.vue';

import type { InputValue, NullableHTMLElement, Numeric } from '@/mappings/types/common';

// type
export type Props = FormProps & {
    /** 유형 */
    type?: string;

    /** 최대 입력 수 */
    maxlength?: Numeric;

    /** 힌트 */
    placeholder?: string;

    /** 자동 완성 */
    autocomplete?: string;

    /** 자동 포커스 여부 */
    autofocus?: boolean;
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { useArrayIncludes } from '@vueuse/core';

import Form from '@/components/form/input/Container.vue';

import { convertInputValue } from '@/functions/convert';

import useSlots from '@/global/useSlots';

// model
/** 현재 입력 값 */
const [value, { lowerCase: isLowerCase, upperCase: isUpperCase, onlyNumber: isOnlyNumber }] = defineModel<InputValue, 'lowerCase' | 'upperCase' | 'onlyNumber'>('value', {
    set(value) {
        if (typeof value === 'string') {
            // 소문자 변환
            if (isLowerCase) {
                return value.toLowerCase();
            }

            // 대문자 변환
            if (isUpperCase) {
                return value.toUpperCase();
            }
        }

        return value;
    },
});

// props
const {
    id,
    type = 'text',
    maxlength,
    placeholder = '입력해주세요.',
    autocomplete,
    autofocus,
    disabled,
    invalid,
    leftLabel,
    leftUnit: isLeftUnit,
    readonly,
    required,
    search: isSearch,
    invalidMessage,
} = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// refs
const inputElement = ref<NullableHTMLElement<HTMLInputElement>>(null);

// global
const { hasSlots } = useSlots();

// computed
/** 정보 텍스트 존재 여부 */
const hasInfo = useArrayIncludes(hasSlots, 'info');
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');
/** 단위 존재 여부 */
const hasUnit = useArrayIncludes(hasSlots, 'unit');

// event
/**
 * 값 입력 시
 * @param event 이벤트 정보
 */
const onInputValue = (event: Event) => {
    const input = event.target as HTMLInputElement;

    // 숫자만 허용
    if (isOnlyNumber) {
        input.value = input.value.replace(/\D/g, '');
    }

    value.value = convertInputValue(input.value);
};

/**
 * 검색
 */
const onSearch = () => {
    if (isSearch && !isLeftUnit) {
        emit('search', value.value);
    }
};

// expose
defineExpose({ inputElement });
</script>
