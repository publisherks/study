<!-- Form 컴포넌트 -->
<template>
    <div
        :class="{
            disabled,
            invalid: !isValid,
            [labelLoc]: hasLabel,
        }"
    >
        <label
            v-if="hasLabel"
            :for="id"
            class="label"
            @click="emit('click:label')"
        >
            <slot name="label" />
            <i v-if="required">
                *
            </i>
        </label>
        <slot />
        <span
            v-if="hasInfo && !invalidMessage"
            class="info-text"
        >
            <slot name="info" />
        </span>
        <span
            v-if="!disabled && invalidMessage"
            class="valid-text"
        >
            {{ invalidMessage }}
        </span>
    </div>
</template>

<script lang="ts">
// type
export type Props = {
    /** 아이디 */
    id?: string;

    /** 비활성화 여부 */
    disabled?: boolean;

    /** 유효성 여부 */
    invalid?: boolean;

    /** 좌측 라벨 여부 */
    leftLabel?: boolean;

    /** 필수 여부 */
    required?: boolean;

    /** 유효하지 않는 경우 메시지 */
    invalidMessage?: string;
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { useArrayIncludes } from '@vueuse/core';

import useSlots from '@/global/useSlots';

import { LabelLoc } from '@/mappings/enum';

// type
type Emits = {
    /** 라벨 클릭 시 */
    'click:label': [];
};

// props
const { id, disabled, invalid, leftLabel: isLeftLabel, required, invalidMessage } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// global
const { hasSlots } = useSlots();

// computed
/** 정보 텍스트 존재 여부 */
const hasInfo = useArrayIncludes(hasSlots, 'info');
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');
/** 유효성 여부 */
const isValid = computed(() => (!invalid && !invalidMessage));
/** 라벨 위치 */
const labelLoc = computed(() => LabelLoc[isLeftLabel ? 'Left' : 'Top']);
</script>
