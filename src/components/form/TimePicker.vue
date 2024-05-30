<!-- Time Picker (Date Picker 내부) 컴포넌트 -->
<template>
    <div class="time-picker">
        <VSelect
            v-model:value="hour"
            :options="hours"
            search
        />
        <VSelect
            v-model:value="minute"
            :options="minutes"
            search
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TimeObj } from '@vuepic/vue-datepicker';

import useSelectOption from '@/global/useSelectOption';

import type { Option } from '@/mappings/types/common';

// model
/** 시 */
const hour = defineModel<TimeObj['hours']>('hour');
/** 분 */
const minute = defineModel<TimeObj['minutes']>('minute');

// global
const { getNumberOptions } = useSelectOption();

// state
/** 시 목록 */
const hours = ref<Option<NonNullable<typeof hour.value>>[]>(getNumberOptions(0, 23));
/** 분 목록 */
const minutes = ref<Option<NonNullable<typeof minute.value>>[]>(getNumberOptions(0, 59));
</script>
