<!-- 컴포넌트 가이드 화면 -->
<template>
    <VTitle>컴포넌트 가이드</VTitle>
    <div class="contents">
        <VTable hori>
            <template #col>
                <col width="10%" />
                <col width="*" />
            </template>
            <tr>
                <th>컴포넌트</th>
                <td>
                    <VSelect
                        v-model:value="currentComponent"
                        :options="components.map(({ value, label }) => ({
                            label: (label || value),
                            value,
                        }))"
                        class="pull"
                    />
                </td>
            </tr>
            <template v-if="currentComponent">
                <tr>
                    <td colspan="2">
                        <div
                            class="flex-c flex-t over-auto pt-30 pb-30"
                            :style="{
                                height,
                                maxHeight: (height || '300px'),
                            }"
                        >
                            <component
                                :is="component[currentComponent]"
                                v-bind="{
                                    ...currentOptions.attrs,
                                    ...currentOptions.props,
                                }"
                                v-on="options.events?.reduce((result, name) => ({
                                    ...result,
                                    [name]: (event?: unknown) => handleEvent(name, event),
                                }), {})"
                            >
                                <template
                                    v-for="(slot, key) in Object.fromEntries(Object.entries(currentOptions.slots).filter(([, slot]) => slot))"
                                    :key="`${currentComponent}.${key}`"
                                    #[key]
                                >
                                    {{ slot }}
                                </template>
                            </component>
                        </div>
                    </td>
                </tr>
                <template
                    v-for="(option, key) in Object.fromEntries(Object.entries(options).filter(([key]) => (key !== 'events')))"
                    :key="`options.${key}`"
                >
                    <tr v-if="!isEmpty(option)">
                        <th colspan="2">
                            {{ key }}
                        </th>
                    </tr>
                    <template v-if="key === 'slots'">
                        <tr
                            v-for="(slotName) in options[key]"
                            :key="`options.${key}-slots.${slotName}`"
                        >
                            <th>{{ slotName }}</th>
                            <td>
                                <VInput
                                    v-model:value="currentOptions.slots[slotName]"
                                    class="pull"
                                />
                            </td>
                        </tr>
                    </template>
                    <template v-else-if="key === 'attrs' || key === 'props'">
                        <tr
                            v-for="(optionValue, optionKey) in options[key]"
                            :key="`options.${key}-${optionKey}`"
                        >
                            <th>{{ optionKey }}</th>
                            <td>
                                <template v-if="optionValue?.type === 'checkbox'">
                                    <VCheck
                                        v-model:checked="currentOptions[key][optionKey]"
                                        v-bind="optionValue.props"
                                    >
                                        {{ optionKey }}
                                    </VCheck>
                                </template>
                                <template v-if="optionValue?.type === 'datePicker'">
                                    <VDatePicker
                                        v-model:value="currentOptions[key][optionKey]"
                                        v-bind="optionValue.props"
                                        class="pull"
                                    />
                                </template>
                                <template v-else-if="optionValue?.type === 'input'">
                                    <component
                                        :is="(optionValue.props as Record<string, any>).type === 'number' ? 'VInputNumber' : 'VInput'"
                                        v-model:value="currentOptions[key][optionKey]"
                                        v-bind="optionValue.props"
                                        class="pull"
                                    />
                                </template>
                                <template v-else-if="optionValue?.type === 'select'">
                                    <VSelect
                                        v-model:value="currentOptions[key][optionKey]"
                                        v-bind="optionValue.props"
                                        :options="(optionValue.props as Record<string, any>).options"
                                        class="pull"
                                    />
                                </template>
                                <template v-else-if="optionValue?.type === 'text'">
                                    {{ currentOptions[key][optionKey] }}
                                </template>
                                <template v-else-if="optionValue?.type === 'textarea'">
                                    <VTextarea
                                        v-model:value="currentOptions[key][optionKey]"
                                        v-bind="optionValue.props"
                                        class="pull"
                                    />
                                </template>
                            </td>
                        </tr>
                    </template>
                </template>
                <tr>
                    <th colspan="2">
                        event
                    </th>
                </tr>
                <tr>
                    <td colspan="2">
                        <div
                            class="over-auto"
                            :style="{
                                height: '200px',
                                maxHeight: '200px',
                            }"
                            v-html="nl2br(eventLog)"
                        />
                    </td>
                </tr>
            </template>
        </VTable>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, computed, watch } from 'vue';
import type { Component } from 'vue';
import { useAsyncState, reactiveComputed } from '@vueuse/core';
import dayjs from 'dayjs';

import { requestCodeList } from '@/api/code';

import { ButtonType, Code } from '@/mappings/enum';
import components from '@/mappings/json/components.json';

import isEmpty from '@/utils/isEmpty';
import isFile from '@/utils/isFile';
import isFileList from '@/utils/isFileList';
import pluck from '@/utils/array/pluck';
import nl2br from '@/utils/format/nl2br';
import randomInt from '@/utils/number/randomInt';

// components
const InfiniteScroll = defineAsyncComponent(() => import('@/views/sample/usage/InfiniteScroll.vue'));

// global
const { state: responsePartnames } = useAsyncState(() => requestCodeList({ parentCode: Code.Partname }), {});

// state
/** 현재 컴포넌트 */
const currentComponent = ref<string>('');
/** 현재 컴포넌트 옵션 */
const currentOptions = ref<Record<Exclude<keyof typeof options, 'events'>, Record<string, any>>>({
    attrs: {},
    props: {},
    slots: {},
});
/** 이벤트 로그 */
const eventLog = ref<string>('');

// computed
/** 컴포넌트 */
const component = computed<Record<typeof components[number]['value'], Component | typeof components[number]['value']>>(() => {
    const component: Record<typeof components[number]['value'], Component> = { InfiniteScroll };

    return pluck(components, 'value')
        .reduce((result, name) => ({
            ...result,
            [name]: (component[name] ?? name),
        }), {});
});
/** 컴포넌트 표시 영역 높이 */
const height = computed(() => {
    const height: Record<typeof currentComponent.value, number> = {
        VDatePicker: 600,
        VSelect: 250,
        InfiniteScroll: (currentOptions.value.props.maxHeight + 60),
        VTooltip: 150,
    };

    if (height[currentComponent.value]) {
        return `${height[currentComponent.value]}px`;
    }
});
/** 컴포넌트 옵션 */
const options = reactiveComputed(() => {
    const { attrs, props, events, slots } = (components.find(({ value }) => (value === currentComponent.value)) ?? {});

    return {
        attrs,
        props,
        events,
        slots,
    };
});
/** 부서명 목록 */
const partnames = computed(() => (responsePartnames.value.data?.results ?? []).map(({ code, name }) => ({
    label: name,
    value: code,
})));

// methods
/**
 * 이벤트 로그 추가
 * @param name 이벤트명
 * @param event 이벤트 정보
 */
const addEventLog = (name: string, event?: unknown) => {
    const currentTime = dayjs()
        .format('YYYY-MM-DD HH:mm:ss.SSS');

    let log = `[${currentTime}] ${name}`;

    if (!isEmpty(event)) {
        log += ` :: ${(isFile(event) || isFileList(event)) ? event : JSON.stringify(event)}`;
    }

    log += `\n${eventLog.value}`;

    eventLog.value = log;
};

/**
 * 이벤트 실행
 * @param name 이벤트명
 * @param event 이벤트 정보
 */
const handleEvent = (name: string, event?: unknown) => {
    if (name.startsWith('update:')) {
        currentOptions.value.props[name.replaceAll('update:', '')] = event;
    }

    addEventLog(name, event);
};

// watch
watch(currentComponent, async (currentComponent) => {
    currentOptions.value = {
        attrs: {},
        props: {},
        slots: {},
    };

    switch (currentComponent) {
        case 'VBtn':
            Object.assign(currentOptions.value.props, {
                type: 'button',
                kind: ButtonType.Main,
            });

            currentOptions.value.slots.default = '버튼';

            break;

        case 'VDatePicker':
            Object.assign(currentOptions.value.props, {
                clearable: true,
                autoApply: true,
                placeholder: '날짜를 선택해주세요.',
                yearFirst: true,
                weekStart: 0,
                locale: 'ko-KR',
                position: 'left',
                format: 'YYYY.MM.DD',
                valueFormat: 'yyyy-MM-dd',
            });

            break;

        case 'VInput':
            Object.assign(currentOptions.value.props, {
                type: 'text',
                placeholder: '입력해주세요.',
            });

            break;

        case 'VInputNumber':
            Object.assign(currentOptions.value.props, {
                maximumFractionDigits: 3,
                placeholder: '입력해주세요.',
                format: true,
            });

            break;

        case 'VRadioGroup':
            currentOptions.value.props.radios = partnames.value;

            break;

        case 'VSelect':
            Object.assign(currentOptions.value.props, {
                options: partnames.value,
                placeholder: '선택해주세요.',
            });

            break;

        case 'VTextarea':
            currentOptions.value.props.placeholder = '입력해주세요.';

            break;

        case 'VUploadFile':
            Object.assign(currentOptions.value.props, {
                placeholder: '파일을 선택해주세요.',
                buttonType: ButtonType.Sub1,
                invalidMessage: '유효한 파일이 아닙니다.',
            });

            currentOptions.value.slots.default = '찾기';

            break;

        case 'VBarChart':
        case 'VLineChart':
            Object.assign(currentOptions.value.props, {
                datasets: new Array((currentComponent === 'VBarChart') ? 2 : 10)
                    .fill(1)
                    .map((start, index) => {
                        const dataset = {
                            data: new Array<number>(10)
                                .fill(0)
                                .map(() => randomInt(0, 100)),
                        };
                        const color = `#${randomInt(0, 0xFFFFFF)
                            .toString(16)
                            .padStart(6, '0')}`;

                        switch (currentComponent) {
                            case 'VBarChart':
                                Object.assign(dataset, { backgroundColor: color });

                                break;

                            case 'VLineChart':
                                Object.assign(dataset, {
                                    label: `데이터${start + index}`,
                                    borderColor: color,
                                });

                                break;
                        }

                        return dataset;
                    }),
                labels: new Array<string>(10)
                    .fill('')
                    .map(
                        (value, index) => dayjs()
                            .subtract(index, 'second')
                            .format('HH:mm:ss'),
                    ),
                gridColor: '#dedfe4',
                tickColor: '#717886',
                height: 200,
                legend: true,
            });

            break;

        case 'InfiniteScroll':
            Object.assign(currentOptions.value.props, {
                distance: 30,
                maxHeight: 500,
            });

            break;

        case 'VPagination':
            Object.assign(currentOptions.value.props, {
                page: 1,
                limit: 10,
                total: 150,
                block: 10,
            });

            break;

        case 'VTab':
            Object.assign(currentOptions.value.props, {
                value: 1,
                tabs: new Array<number>(3)
                    .fill(1)
                    .map((start, index) => ({
                        label: `Tab ${start + index}`,
                        value: (start + index),
                    })),
            });

            break;
    }

    eventLog.value = '';
});
</script>
