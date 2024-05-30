<!-- Input 숫자 컴포넌트 -->
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
                type="text"
                :value="input"
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

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useArrayIncludes } from '@vueuse/core';

import Form from '@/components/form/input/Container.vue';
import type { Emits } from '@/components/form/input/Container.vue';
import type { Props as InputProps } from '@/components/form/input/Default.vue';

import { convertInputValue } from '@/functions/convert';

import useSlots from '@/global/useSlots';

import type { InputValue, NullableHTMLElement, Numeric } from '@/mappings/types/common';

import isEmpty from '@/utils/isEmpty';
import isNullish from '@/utils/isNullish';
import numberFrom from '@/utils/number/from';

// type
type Props = Omit<InputProps, 'type' | 'maxlength'> & {
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
const value = defineModel<InputValue>('value', {
    set(value) {
        // 현재 입력 값이 '-'가 아닌 경우 (음수 값 입력이 가능해야 되므로)
        if (!isEmpty(value) && value !== '-') {
            const string = String(value);
            const values = string.split('.');
            const lastValue = string.substr(-1);

            if (
                (lastValue === '.' && values.length > (maxDecimalPointDigit.value ? 2 : 1)) // 소수점 유효성 확인
                || (maxDecimalPointDigit.value < (values.at(1) ?? '').length) // 최대 소수점 자리 수 유효성 확인
                || (lastValue !== '.' && isNaN(Number(value))) // 숫자 유효성 확인
            ) {
                // 마지막 입력 값 삭제
                value = string.slice(0, -1);
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

        return value;
    },
});

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
/** 현재 입력 값 */
const input = computed(() => {
    let { value: input } = value;

    if (isFormat) {
        if (typeof input === 'string') {
            if (['', '-'].includes(input) || input.substr(-1) === '.') {
                return input;
            }

            input = Number(input);
        }

        return (isNullish(input) || isNaN(input)) ? '' : input.toLocaleString('ko', { maximumFractionDigits: maxDecimalPointDigit.value });
    }

    return input;
});
/** 최대 소수점 자리 수 */
const maxDecimalPointDigit = computed(() => numberFrom(maximumFractionDigits, defaultMaximumFractionDigits));

// event
/**
 * 값 입력 시
 * @param event 이벤트 정보
 */
const onInputValue = (event: Event) => {
    const target = event.target as HTMLInputElement;

    let { value: newValue } = target;

    const isNumber = (newValue.substr(-1) !== '.');

    // 입력 값이 숫자 형식인 경우 (마지막 입력 값이 '.'이 아닌 경우)
    if (isNumber) {
        // number 타입으로 변환을 위해 쉼표 삭제
        newValue = newValue.replaceAll(',', '');
    }

    value.value = convertInputValue(newValue, isNumber);
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
