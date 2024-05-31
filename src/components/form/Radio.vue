<!-- Radio 컴포넌트 -->
<template>
    <Form
        v-model:value="value"
        :id="id"
        type="radio"
        :checked="value === checkValue"
        :disabled="disabled"
        :invalid="invalid"
        class="radio-box"
    >
        <slot />
    </Form>
</template>

<script lang="ts">
import type { Props as FormProps } from '@/components/form/container/Check.vue';
import type { Primitive } from '@/mappings/types/common';

// type
export type Props = Omit<FormProps, 'type'> & {
    /** 체크할 값 */
    checkValue?: Primitive;
};
</script>
<script setup lang="ts">
import Form from '@/components/form/container/Check.vue';

// model
/** 값 */
const value = defineModel<Props['checkValue']>('value');

// props
const { id, checkValue, disabled, invalid } = defineProps<Props>();
</script>
