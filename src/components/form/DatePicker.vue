<!-- Date Picker 컴포넌트 -->
<template>
    <Form
        :invalid="invalid"
        :leftLabel="isLeftLabel"
        :required="required"
        :invalidMessage="invalidMessage"
        class="picker-wrap"
        @click:label="onClickLabel"
    >
        <template
            v-if="hasLabel"
            #label
        >
            <slot name="label" />
        </template>
        <div :class="['picker-box', { range: isRange }]">
            <DatePicker
                ref="datePicker"
                v-model:modelValue="value"
                :range="isRange"
                :multiCalendars="isRange"
                :clearable="isClearable"
                :autoApply="isAutoApply"
                :placeholder="placeholder"
                :disabled="disabled"
                :required="required"
                :yearFirst="isYearFirst"
                :minDate="minDate"
                :maxDate="maxDate"
                :weekStart="weekStart"
                :format="getFormat"
                :locale="locale"
                :position="position"
                :transitions="isTransitions"
                :offset="4"
                :monthPicker="monthPicker"
                menuClassName="custom-picker"
                calendarClassName="custom-calendar"
            >
                <!-- Time Picker -->
                <template #time-picker="{ time, updateTime }: TimePickerSlots">
                    <template v-if="isEnableTimePicker">
                        <!-- Range Picker -->
                        <div
                            v-if="isRange"
                            class="flex-row flex-c"
                        >
                            <TimePicker
                                v-for="(picker, index) in 2"
                                :key="`timePicker${picker}`"
                                :hour="(time.hours as TimeRangePicker['hours'])[index]"
                                :minute="(time.minutes as TimeRangePicker['minutes'])[index]"
                                class="w-50"
                                @update:hour="onUpdateTime({
                                    hour: $event,
                                    time,
                                    index,
                                    updateTime,
                                })"
                                @update:minute="onUpdateTime({
                                    minute: $event,
                                    time,
                                    index,
                                    updateTime,
                                })"
                            />
                        </div>

                        <!-- Single Picker -->
                        <TimePicker
                            v-else
                            :hour="(time.hours as TimeObj['hours'])"
                            :minute="(time.minutes as TimeObj['minutes'])"
                            @update:hour="onUpdateTime({
                                hour: $event,
                                updateTime,
                            })"
                            @update:minute="onUpdateTime({
                                minute: $event,
                                updateTime,
                            })"
                        />
                    </template>
                </template>
                <template #input-icon>
                    <i
                        v-if="!disabled"
                        class="fa-solid fa-calendar-days"
                    />
                </template>
                <template #clear-icon="{ clear }">
                    <i
                        class="fa-solid fa-xmark"
                        @click="clear"
                    />
                </template>
                <template #calendar-icon>
                    <i class="fa-solid fa-calendar-days" />
                </template>
                <template #arrow-left>
                    <i class="fa-solid fa-caret-left" />
                </template>
                <template #arrow-right>
                    <i class="fa-solid fa-caret-right" />
                </template>
            </DatePicker>
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
import { defineAsyncComponent, ref } from 'vue';
import DatePicker from '@vuepic/vue-datepicker';
import type { ModelValue, TimeObj, VueDatePickerProps } from '@vuepic/vue-datepicker';
import { useArrayIncludes, useDateFormat } from '@vueuse/core';

import Form from '@/components/form/container/Default.vue';
import type { Props as FormProps } from '@/components/form/container/Default.vue';

import useSlots from '@/global/useSlots';

import isEmpty from '@/utils/isEmpty';

// type
type Props = Pick<VueDatePickerProps, 'range' | 'clearable' | 'autoApply' | 'placeholder' | 'disabled' | 'required' | 'yearFirst' | 'minDate' | 'maxDate' | 'weekStart' | 'enableTimePicker' | 'locale' | 'position' | 'transitions' | 'monthPicker'> & {
    /**
     * 형식
     * @see {@link https://day.js.org/docs/en/parse/string-format}
     */
    format?: string;
} & Pick<FormProps, 'invalid' | 'leftLabel' | 'invalidMessage'>;
type TimePickerSlots = {
    /** 원본 시간 */
    time: TimeObj | TimeRangePicker;

    /**
     * 시간 수정 함수
     * @param value 값
     * @param isHours 시 수정 여부
     * @param isSeconds 초 수정 여부
     */
    updateTime: (
        value: TimeObj[keyof TimeObj] | TimeRangePicker[keyof TimeRangePicker],
        isHours?: boolean,
        isSeconds?: boolean,
    ) => void;
};
type OnUpdateTime = {
    /** 시 */
    hour?: TimeObj['hours'];

    /** 분 */
    minute?: TimeObj['minutes'];

    /**
     * 원본 시간
     * - `range`(기간 선택 여부) 값이 `true`(Range Picker)인 경우 전달
     */
    time?: TimePickerSlots['time'];

    /**
     * 시간을 수정할 인덱스
     * - `range`(기간 선택 여부) 값이 `true`(Range Picker)인 경우 전달
     */
    index?: number;

    /**
     * 시간 수정 함수
     * @param value 값
     * @param isHours 시 수정 여부
     * @param isSeconds 초 수정 여부
     */
    updateTime: TimePickerSlots['updateTime'];
};
type TimeRangePicker = {
    /** 시 목록 [시작, 끝] */
    hours: number[];

    /** 분 목록 [시작, 끝] */
    minutes: number[];

    /** 초 목록 [시작, 끝] */
    seconds: number[];
};

// components
const TimePicker = defineAsyncComponent(() => import('@/components/form/TimePicker.vue'));

// model
/**
 * 현재 날짜
 * @see {@link https://vue3datepicker.com/props/general-configuration/#model-value}
 */
const value = defineModel<ModelValue>('value');

// props
const {
    range: isRange,
    clearable: isClearable = true,
    autoApply: isAutoApply = true,
    placeholder = '날짜를 선택해주세요.',
    disabled,
    required,
    yearFirst: isYearFirst = true,
    minDate,
    maxDate,
    weekStart = 0,
    enableTimePicker: isEnableTimePicker = false,
    locale = 'ko-KR',
    position = 'left',
    transitions: isTransitions = false,
    format = 'YYYY.MM.DD',
    invalid,
    leftLabel: isLeftLabel,
    invalidMessage,
    monthPicker,
} = defineProps<Props>();

// refs
const datePicker = ref<InstanceType<typeof DatePicker> | null>(null);

// global
const { hasSlots } = useSlots();

// computed
/** 정보 텍스트 존재 여부 */
const hasInfo = useArrayIncludes(hasSlots, 'info');
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');

// methods
/**
 * 형식 반환
 * @param date 날짜
 * @return 형식
 */
const getFormat = (date: Date | Date[]) => {
    // Range Picker
    if (Array.isArray(date)) {
        return date.map((value) => useDateFormat(value, format).value)
            .join(' ~ ');
    }

    // Month Picker
    if (monthPicker) {
        return useDateFormat(date, 'YYYY.MM').value;
    }

    // Single Picker
    return useDateFormat(date, format).value;
};

// event
/**
 * 라벨 클릭 시
 */
const onClickLabel = () => datePicker.value?.openMenu();

/**
 * 시간 수정 시
 * @param hour 시
 * @param minute 분
 * @param time 원본 시간 (`range`_(기간 선택 여부)_ 값이 `true`_(Range Picker)_인 경우 전달)
 * @param index 시간을 수정할 인덱스 (`range`_(기간 선택 여부)_ 값이 `true`_(Range Picker)_인 경우 전달)
 * @param updateTime 시간 수정 함수
 */
const onUpdateTime = ({ hour, minute, time, index, updateTime }: OnUpdateTime) => {
    const isUpdateHours = (typeof hour !== 'undefined');
    const isUpdateMinutes = (typeof minute !== 'undefined');

    // Range Picker인 경우
    if (isRange) {
        // 원본 시간 및 시간을 수정할 인덱스 값을 전달하지 않은 경우 시간 수정 불가
        if (isEmpty(time) || typeof index === 'undefined') {
            return;
        }

        const { hours, minutes } = time as TimeRangePicker;

        // 시 수정 시
        if (isUpdateHours) {
            updateTime(hours.with(index, hour), true);

            return;
        }

        // 분 수정 시
        if (isUpdateMinutes) {
            updateTime(minutes.with(index, minute), false);
        }

        return;
    }

    // Single Picker인 경우
    if (isUpdateHours) {
        // 시 수정 시
        updateTime(hour, true);

        return;
    }

    if (isUpdateMinutes) {
        // 분 수정 시
        updateTime(minute, false);
    }
};
</script>

<style src="@vuepic/vue-datepicker/dist/main.css" />
