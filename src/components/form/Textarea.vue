<!-- Textarea 컴포넌트 -->
<template>
    <Form
        :id
        :disabled
        :invalid
        :leftLabel
        :required
        :invalidMessage
        class="area-wrap"
    >
        <template
            v-if="hasLabel"
            #label
        >
            <slot name="label" />
        </template>
        <div
            class="text-area"
            :style
        >
            <textarea
                :id
                ref="textarea"
                v-model="value"
                :style
                :maxlength
                :placeholder
                :autocomplete
                :autofocus
                :disabled
                :required
            />
        </div>
        <template
            v-if="hasInfo"
            #info
        >
            <slot name="info" />
        </template>
    </Form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useElementBounding, useParentElement, useTextareaAutosize, useArrayIncludes } from '@vueuse/core';

import Form from '@/components/form/container/Default.vue';
import type { Props as InputProps } from '@/components/form/input/Default.vue';

import useSlots from '@/global/useSlots';

import type { Numeric } from '@/mappings/types/common';

import isNumeric from '@/utils/isNumeric';
import valueFrom from '@/utils/valueFrom';
import px from '@/utils/css/px';

// type
type Props = Omit<InputProps, 'type' | 'leftUnit' | 'readonly' | 'search'> & {
    /** 높이 */
    height?: Numeric;

    /** 최소 높이 */
    minHeight?: Numeric;

    /** 최대 높이 */
    maxHeight?: Numeric;
};

// model
/** 현재 입력 값 */
const value = defineModel<Numeric>('value');

// props
const {
    id,
    height,
    minHeight = 42,
    maxHeight,
    maxlength,
    placeholder = '입력해주세요.',
    autocomplete,
    autofocus,
    disabled,
    invalid,
    leftLabel,
    required,
    invalidMessage,
} = defineProps<Props>();

// global
const { textarea } = useTextareaAutosize({ watch: value });
const wrapper = useParentElement(textarea);
const { height: wrapperHeight } = useElementBounding(wrapper);
const { hasSlots } = useSlots();

// computed
/** 정보 텍스트 존재 여부 */
const hasInfo = useArrayIncludes(hasSlots, 'info');
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');
/** 스타일 */
const style = computed(() => {
    const style: CSSProperties = {};
    const { value: parentHeight } = wrapperHeight;
    const maxHeightPixel = valueFrom(
        height,
        valueFrom(maxHeight, (isNumeric(minHeight) && parentHeight > Number(minHeight)) ? parentHeight : 0),
    );

    style.minHeight = px(valueFrom(height, minHeight));

    if (maxHeightPixel) {
        style.maxHeight = px(maxHeightPixel);
    }

    return style;
});
</script>
