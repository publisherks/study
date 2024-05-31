<!-- Textarea 컴포넌트 -->
<template>
    <Form
        ref="form"
        :id="id"
        :disabled="disabled"
        :invalid="invalid"
        :leftLabel="isLeftLabel"
        :required="required"
        :invalidMessage="invalidMessage"
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
            :style="style"
        >
            <textarea
                :id="id"
                ref="textarea"
                v-model="value"
                :style="style"
                :maxlength="maxlength"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :autofocus="autofocus"
                :disabled="disabled"
                :required="required"
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
import { ref, computed } from 'vue';
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
type Props = Omit<InputProps, 'type' | 'leftUnit' | 'lowerCase' | 'upperCase' | 'readonly' | 'search'> & {
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
    minHeight = 46,
    maxHeight,
    maxlength,
    placeholder = '입력해주세요.',
    autocomplete,
    autofocus,
    disabled,
    invalid,
    leftLabel: isLeftLabel,
    required,
    invalidMessage,
} = defineProps<Props>();

// refs
const form = ref<InstanceType<typeof Form> | null>(null);

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
    const maxHeightPixel = valueFrom(height, valueFrom(maxHeight, (isNumeric(minHeight) && parentHeight > Number(minHeight)) ? parentHeight : 0));

    style.minHeight = px(valueFrom(height, minHeight));

    if (maxHeightPixel) {
        style.maxHeight = px(maxHeightPixel);
    }

    return style;
});
</script>
