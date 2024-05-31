<!-- Input 숫자 컴포넌트 -->
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
                type="text"
                :value="input"
                :min="min"
                :max="max"
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

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useArrayIncludes } from '@vueuse/core';

import Form from '@/components/form/input/Container.vue';
import type { Emits } from '@/components/form/input/Container.vue';
import type { Props as InputProps } from '@/components/form/input/Default.vue';

import { convertInputValue } from '@/functions/convert';

import useSlots from '@/global/useSlots';

import type { InputValue, Numeric } from '@/mappings/types/common';

import isEmpty from '@/utils/isEmpty';
import isNullish from '@/utils/isNullish';
import numberFrom from '@/utils/number/from';

// type
type Props = Omit<InputProps, 'type' | 'maxlength' | 'lowercase' | 'uppercase'> & {
    /** 최소 값 */
    min?: Numeric;

    /** 최대 값 */
    max?: Numeric;

    /** 최대 소수점 자리 수 */
    maximumFractionDigits?: Numeric;

    /** 값을 숫자 형식이 적용된 값으로 변환 여부 */
    format?: boolean;
};

// variable
const defaultMaximumFractionDigits = 3;

// model
/** 현재 입력 값 */
const value = defineModel<InputValue>('value');

// props
const {
    id,
    min,
    max,
    maximumFractionDigits = defaultMaximumFractionDigits,
    placeholder = '입력해주세요.',
    autocomplete,
    autofocus,
    disabled,
    format: isFormat = true,
    invalid,
    leftLabel: isLeftLabel,
    leftUnit: isLeftUnit,
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
/** 현재 입력 값 */
const input = computed(() => {
    const input = convertValue(value.value);

    return isFormat ? convertValueToLocaleString(input) : input;
});
/** 최대 소수점 자리 수 */
const maxDecimalPointDigit = computed(() => numberFrom(maximumFractionDigits, defaultMaximumFractionDigits));

// methods
/**
 * 값 변환
 * @param value 변환 전 값
 * @return 변환 후 값
 */
const convertValue = (value: InputValue) => {
    if (!isEmpty(value)) {
        const string = String(value);

        // 현재 입력 값이 '-'가 아닌 경우 (음수 값 입력이 가능해야 되므로)
        if (value !== '-') {
            const values = string.split('.');

            if (
                (string.substr(-1) === '.' && values.length > (maxDecimalPointDigit.value ? 2 : 1)) // 소수점 유효성 확인
                || (maxDecimalPointDigit.value < (values[1] ?? '').length) // 최대 소수점 자리 수 유효성 확인
                || isNaN(Number(value)) // 숫자 유효성 확인
            ) {
                // 마지막 입력 값 삭제
                value = string.substring(0, string.length - 1);
            }

            const number = Number(value);

            // 현재 입력 값이 최소 값보다 작은 경우
            if (!isEmpty(min) && number < Number(min)) {
                // 입력 값을 최소 값으로 설정
                return min;
            }

            // 현재 입력 값이 최대 값보다 큰 경우
            if (!isEmpty(max) && number > Number(max)) {
                // 입력 값을 최대 값으로 설정
                return max;
            }
        }
    }

    return value;
};

/**
 * 값을 숫자 형식이 적용된 값으로 변환
 * @param value 값
 * @return 숫자 형식이 적용된 값
 */
const convertValueToLocaleString = (value: InputValue) => {
    if (typeof value === 'string') {
        if (['', '-'].includes(value) || value.substr(-1) === '.') {
            return value;
        }

        value = Number(value);
    }

    return (isNullish(value) || isNaN(value)) ? '' : value.toLocaleString('ko', { maximumFractionDigits: maxDecimalPointDigit.value });
};

// event
/**
 * 값 입력 시
 * @param event 이벤트 정보
 */
const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    let { value: newValue } = target;

    const isConvertNumber = (newValue.substr(-1) !== '.');

    // `number` 타입 변환 시
    if (isConvertNumber) {
        // 쉼표 삭제
        newValue = newValue.replaceAll(',', '');
    }

    value.value = convertInputValue(convertValue(newValue), isConvertNumber);
    target.value = String(input.value);
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
