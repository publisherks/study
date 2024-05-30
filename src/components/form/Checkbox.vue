<!-- Checkbox 컴포넌트 -->
<template>
    <Form
        v-model:checked="checked"
        :id
        type="checkbox"
        :disabled
        :invalid
        class="check-box"
    >
        <slot />
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/form/container/Check.vue';
import type { Props as FormProps } from '@/components/form/container/Check.vue';

// type
type Props = Omit<FormProps, 'type'>;

// model
/** 체크 여부 */
const checked = defineModel<boolean>('checked');

// props
const { id, disabled, invalid } = defineProps<Props>();
</script>
