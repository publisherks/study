<!-- Checkbox/Radio 컴포넌트  -->
<template>
    <div
        :class="{
            disabled,
            invalid,
        }"
    >
        <label>
            <input
                :id
                :type
                :value
                :checked
                :disabled
                @change="onChangeCheck"
            />
            <i :class="{ 'mr-0': !hasLabel }" />
            <span v-if="hasLabel">
                <slot />
            </span>
        </label>
    </div>
</template>

<script lang="ts">
import type { Props as FormProps } from '@/components/form/container/Default.vue';

// type
export type Props = Pick<FormProps, 'id' | 'disabled' | 'invalid'> & {
    /** 유형 */
    type: 'checkbox' | 'radio';
};
</script>
<script setup lang="ts">
import { useArrayIncludes } from '@vueuse/core';

import { convertPrimitive } from '@/functions/convert';

import useSlots from '@/global/useSlots';

import type { Primitive } from '@/mappings/types/common';

// model
/** 값 */
const value = defineModel<Primitive>('value');
/** 체크 여부 */
const checked = defineModel<boolean>('checked');

// props
const { id, type, disabled, invalid } = defineProps<Props>();

// global
const { hasSlots } = useSlots();

// computed
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'default');

// event
/**
 * 체크 여부 변경 시
 * @param event 이벤트 정보
 */
const onChangeCheck = (event: Event) => {
    const input = event.target as HTMLInputElement;

    switch (type) {
        case 'checkbox':
            checked.value = input.checked;

            break;

        case 'radio':
            value.value = convertPrimitive(input.value);

            break;
    }
};
</script>
