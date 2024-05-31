<!-- Input 컴포넌트 -->
<template>
    <Form
        :id="id"
        :disabled="disabled"
        :invalid="invalid"
        :leftLabel="isLeftLabel"
        :required="required"
        :invalidMessage="invalidMessage"
        class="input-wrap"
    >
        <template
            v-if="hasLabel"
            #label
        >
            <slot name="label" />
        </template>
        <div
            :class="[
                'input-box',
                { 'al-left': isLeftUnit },
                hasUnit && 'unit',
            ]"
        >
            <slot :style="style" />

            <!-- 현재 입력 값 초기화 -->
            <i
                v-show="!disabled && !readonly && !isSearch && !hasUnit && !isEmpty(value)"
                class="del"
                @click="onRemove"
            />

            <!-- 검색 -->
            <i
                v-show="isSearch && !hasUnit"
                class="sch"
                @click="emit('search', value)"
            />

            <!-- 단위 -->
            <span
                v-if="hasUnit"
                ref="unitElement"
                class="unit"
            >
                <slot name="unit" />
            </span>
        </div>
        <template
            v-if="hasInfo"
            #info
        >
            <slot name="info" />
        </template>
    </Form>
</template>

<script lang="ts">
import type { Props as FormProps } from '@/components/form/container/Default.vue';
import type { InputValue } from '@/mappings/types/common';

// type
export type Props = FormProps & {
    /** 좌측 단위 여부 */
    leftUnit?: boolean;

    /** 읽기 전용 여부 */
    readonly?: boolean;

    /** 검색 필드 여부 */
    search?: boolean;
};
export type Emits = {
    /** 검색 */
    search: [value: InputValue];
};
</script>
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useElementBounding, useArrayIncludes } from '@vueuse/core';

import Form from '@/components/form/container/Default.vue';

import useSlots from '@/global/useSlots';

import isEmpty from '@/utils/isEmpty';
import rem from '@/utils/css/rem';

// model
/** 현재 입력 값 */
const value = defineModel<InputValue>('value');

// props
const {
    id,
    disabled,
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
const unitElement = ref<HTMLSpanElement | null>(null);

// global
const { width: unitWidth } = useElementBounding(unitElement);
const { hasSlots } = useSlots();

// computed
/** 정보 텍스트 존재 여부 */
const hasInfo = useArrayIncludes(hasSlots, 'info');
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');
/** 단위 존재 여부 */
const hasUnit = useArrayIncludes(hasSlots, 'unit');
/** 스타일 */
const style = computed(() => {
    const style: CSSProperties = {};

    if (unitWidth.value > 28) {
        style[`padding${isLeftUnit ? 'Left' : 'Right'}`] = rem(unitWidth.value);
    }

    return style;
});

// event
/**
 * 현재 입력 값 초기화 시
 */
const onRemove = () => {
    value.value = undefined;
};
</script>
