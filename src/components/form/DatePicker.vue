<!-- Date Picker 컴포넌트 -->
<template>
    <Form
        :invalid
        :leftLabel
        :required
        :invalidMessage
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
                :range
                :multiCalendars="isRange"
                :monthPicker
                :modelType="valueFormat"
                :clearable
                :autoApply
                :placeholder
                :disabled
                :required
                :yearFirst
                :minDate
                :maxDate
                :weekStart
                :format="getFormat"
                :locale
                :position
                :transitions
                :offset="4"
                menuClassName="custom-picker"
                calendarClassName="custom-calendar"
            >
                <!-- Time Picker -->
                <template #time-picker="{ time, updateTime }">
                    <template v-if="isEnableTimePicker">
                        <!-- Range Picker -->
                        <div
                            v-if="isRange"
                            class="flex-row flex-c"
                        >
                            <TimePicker
                                v-for="(number, index) in 2"
                                :key="`timePicker${number}`"
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

import type { NullableInstanceType, UnionObjectValue } from '@/mappings/types/common';

import isEmpty from '@/utils/isEmpty';

// type
type Props = {
    /**
     * 기간 선택 여부
     * @see {@link https://vue3datepicker.com/props/modes/#range}
     */
    range?: boolean;

    /**
     * 월 선택 여부
     * @see {@link https://vue3datepicker.com/props/modes/#month-picker}
     */
    monthPicker?: VueDatePickerProps['monthPicker'];

    /**
     * 초기화 아이콘 표시 여부
     * @see {@link https://vue3datepicker.com/props/general-configuration/#clearable}
     */
    clearable?: VueDatePickerProps['clearable'];

    /**
     * 날짜 자동 적용 여부
     * @see {@link https://vue3datepicker.com/props/general-configuration/#auto-apply}
     */
    autoApply?: VueDatePickerProps['autoApply'];

    /**
     * 힌트
     * @see {@link https://vue3datepicker.com/props/general-configuration/#placeholder}
     */
    placeholder?: VueDatePickerProps['placeholder'];

    /**
     * 비활성화 여부
     * @see {@link https://vue3datepicker.com/props/general-configuration/#disabled}
     */
    disabled?: VueDatePickerProps['disabled'];

    /**
     * 필수 여부
     * @see {@link https://vue3datepicker.com/props/general-configuration/#required}
     */
    required?: VueDatePickerProps['required'];

    /**
     * 달력 상단에 년 우선 표시 여부
     * @see {@link https://vue3datepicker.com/props/general-configuration/#year-first}
     */
    yearFirst?: VueDatePickerProps['yearFirst'];

    /**
     * 선택 가능한 시작 날짜
     * @see {@link https://vue3datepicker.com/props/calendar-configuration/#min-date}
     */
    minDate?: VueDatePickerProps['minDate'];

    /**
     * 선택 가능한 끝 날짜
     * @see {@link https://vue3datepicker.com/props/calendar-configuration/#max-date}
     */
    maxDate?: VueDatePickerProps['maxDate'];

    /**
     * 시작 요일
     * - 일요일 : `0`
     * - 월요일 : `1`
     * - 화요일 : `2`
     * - 수요일 : `3`
     * - 목요일 : `4`
     * - 금요일 : `5`
     * - 토요일 : `6`
     * @see {@link https://vue3datepicker.com/props/calendar-configuration/#week-start}
     */
    weekStart?: VueDatePickerProps['weekStart'];

    /**
     * 시간 선택 활성화 여부
     * @see {@link https://vue3datepicker.com/props/time-picker-configuration/#enable-time-picker}
     */
    enableTimePicker?: VueDatePickerProps['enableTimePicker'];

    /**
     * 언어
     * @see {@link https://vue3datepicker.com/props/localization/#locale}
     */
    locale?: VueDatePickerProps['locale'];

    /**
     * 달력 위치
     * @see {@link https://vue3datepicker.com/props/positioning/#position}
     */
    position?: VueDatePickerProps['position'];

    /**
     * 애니메이션 여부
     * @see {@link https://vue3datepicker.com/props/look-and-feel/#transitions}
     */
    transitions?: VueDatePickerProps['transitions'];

    /**
     * 형식
     * @see {@link https://day.js.org/docs/en/parse/string-format}
     */
    format?: string;

    /**
     * `value`(현재 날짜) 형식
     * @see {@link https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table}
     */
    valueFormat?: string;
} & Pick<FormProps, 'invalid' | 'leftLabel' | 'invalidMessage'>;
type OnUpdateTime = {
    /** 시 */
    hour?: TimeObj['hours'];

    /** 분 */
    minute?: TimeObj['minutes'];

    /**
     * 원본 시간
     * - `range`(기간 선택 여부) 값이 `true`(Range Picker)인 경우 전달
     */
    time?: UnionObjectValue<TimeObj, TimeRangePicker[keyof TimeRangePicker]>;

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
    updateTime: (
        value: TimeObj[keyof TimeObj] | TimeRangePicker[keyof TimeRangePicker],
        isHours?: boolean,
        isSeconds?: boolean,
    ) => void;
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
    monthPicker,
    clearable = true,
    autoApply = true,
    placeholder = '날짜를 선택해주세요.',
    disabled,
    required,
    yearFirst = true,
    minDate,
    maxDate,
    weekStart = 0,
    enableTimePicker: isEnableTimePicker = false,
    locale = 'ko-KR',
    position = 'left',
    transitions = false,
    format = 'YYYY.MM.DD',
    valueFormat = 'yyyy-MM-dd',
    invalid,
    leftLabel,
    invalidMessage,
} = defineProps<Props>();

// refs
const datePicker = ref<NullableInstanceType<typeof DatePicker>>(null);

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
        return date.map((date) => useDateFormat(date, format).value)
            .join(' ~ ');
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
 * @param time 원본 시간 (`range`_(기간 선택 여부)_ 값이 `true`_(Range Picker)_ 인 경우 전달)
 * @param index 시간을 수정할 인덱스 (`range`_(기간 선택 여부)_ 값이 `true`_(Range Picker)_ 인 경우 전달)
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
