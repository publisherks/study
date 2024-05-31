<!-- Input 기본 컴포넌트 -->
<template>
    <Form
        v-model:value="value"
        :id="id"
        :disabled="disabled"
        :invalid="invalid"
        :leftLabel="isLeftLabel"
        :leftUnit="isLeftUnit"
        :readonly="readonly"
        :required="required"
        :search="isSearch"
        :invalidMessage="invalidMessage"
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
                :id="id"
                ref="inputElement"
                :class="{ 'align-r': (hasUnit && !isLeftUnit) }"
                :style="slotProps?.style"
                :type="type"
                :value="convertValue(value)"
                :maxlength="maxlength"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :autofocus="autofocus"
                :disabled="disabled"
                :readonly="readonly"
                :required="required"
                :tabindex="(disabled || readonly) ? -1 : 0"
                @input="onInput"
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
import type { InputValue, Numeric } from '@/mappings/types/common';

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

    /** 소문자 변환 여부 */
    lowerCase?: boolean;

    /** 대문자 변환 여부 */
    upperCase?: boolean;
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { useArrayIncludes } from '@vueuse/core';

import Form from '@/components/form/input/Container.vue';

import { convertInputValue } from '@/functions/convert';

import useSlots from '@/global/useSlots';

import isEmpty from '@/utils/isEmpty';

// model
/** 현재 입력 값 */
const value = defineModel<InputValue>('value');

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
    leftLabel: isLeftLabel,
    leftUnit: isLeftUnit,
    lowerCase: isLowerCase,
    upperCase: isUpperCase,
    readonly,
    required,
    search: isSearch,
    invalidMessage,
} = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// refs
const inputElement = ref<HTMLInputElement | null>(null);

// global
const { hasSlots } = useSlots();

// computed
/** 정보 텍스트 존재 여부 */
const hasInfo = useArrayIncludes(hasSlots, 'info');
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');
/** 단위 존재 여부 */
const hasUnit = useArrayIncludes(hasSlots, 'unit');

// methods
/**
 * 값 변환
 * @param value 변환 전 값
 * @return 변환 후 값
 */
const convertValue = (value: InputValue) => {
    if (!isEmpty(value)) {
        const string = String(value);

        // 소문자 변환
        if (isLowerCase) {
            return string.toLowerCase();
        }

        // 대문자 변환
        if (isUpperCase) {
            return string.toUpperCase();
        }
    }

    return value;
};

// event
/**
 * 값 입력 시
 * @param event 이벤트 정보
 */
const onInput = (event: Event) => {
    value.value = convertInputValue(convertValue((event.target as HTMLInputElement).value));
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
