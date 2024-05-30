<!-- Select 컴포넌트 -->
<template>
    <Form
        :disabled
        :invalid
        :leftLabel
        :required
        :invalidMessage
        class="select-wrap"
    >
        <template
            v-if="hasLabel"
            #label
        >
            <slot name="label" />
        </template>
        <div
            ref="selectElement"
            :class="['select-box', { open: isShow }]"
        >
            <input
                ref="inputElement"
                type="text"
                :value="label"
                :class="{ 'cursor-not': disabled }"
                :placeholder
                :readonly="(!isInput && !isSearch) || !isShow"
                @click="onClickLabel"
                @input="onInputText"
            />
            <i
                v-if="!disabled"
                class="icon"
                @click="onClickLabel"
            />
            <Teleport
                v-if="isMoveToBody"
                to="body"
            >
                <Option
                    :show="isShow"
                    :options="datas"
                    moveToBody
                    :inputElement
                    :class="{ open: isShow }"
                    @scroll:bottom="emit('scroll:bottom')"
                    @select="onSelectValue"
                />
            </Teleport>
            <Option
                v-else
                :show="isShow"
                :options="datas"
                :inputElement
                @scroll:bottom="emit('scroll:bottom')"
                @select="onSelectValue"
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
import { ref, computed, watch } from 'vue';
import { onClickOutside, useArrayIncludes, useToggle } from '@vueuse/core';

import Form from '@/components/form/container/Default.vue';
import type { Props as InputProps } from '@/components/form/input/Default.vue';
import Option from '@/components/form/SelectOption.vue';
import type { Props as OptionProps } from '@/components/form/SelectOption.vue';

import useSlots from '@/global/useSlots';

import type { Primitive, NullableHTMLElement } from '@/mappings/types/common';

// type
type Props = Pick<OptionProps, 'options' | 'moveToBody'> & Pick<InputProps, 'placeholder' | 'disabled' | 'invalid' | 'leftLabel' | 'required' | 'invalidMessage'> & {
    /** `options`(목록) 검색 여부 */
    search?: boolean;
};
type Emits = {
    /** 최하단으로 스크롤 시 */
    'scroll:bottom': [];
};

// model
/** 현재 값 */
const [value, { input: isInput }] = defineModel<Primitive, 'input'>('value');

// props
const {
    options,
    placeholder = '선택해주세요.',
    disabled,
    invalid,
    leftLabel,
    moveToBody: isMoveToBody,
    required,
    search: isSearch,
    invalidMessage,
} = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// refs
const inputElement = ref<Exclude<OptionProps['inputElement'], undefined>>(null);
const selectElement = ref<NullableHTMLElement<HTMLDivElement>>(null);

// global
const [isShow, setIsShow] = useToggle();
const { hasSlots } = useSlots();

// state
/** 입력 값 */
const inputText = ref<string>('');

// computed
/** 목록 */
const datas = computed(
    () => (isSearch && inputText.value)
        ? options.filter(
            ({ label }) => label.toLowerCase()
                .includes(inputText.value.toLowerCase()),
        )
        : options,
);
/** 정보 텍스트 존재 여부 */
const hasInfo = useArrayIncludes(hasSlots, 'info');
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');
/** 현재 라벨(입력 값) */
const label = computed(() => {
    // options(목록) 검색 사용 시 Select Option 컴포넌트가 표시된 경우
    if (isSearch && isShow.value) {
        // 입력 값 표시
        return inputText.value;
    }

    // 현재 값의 라벨 찾기
    const { label } = (options.find((option) => (typeof option.value !== 'undefined' && value.value === option.value)) ?? {});

    // 현재 값의 라벨을 찾은 경우
    if (label) {
        // 현재 값의 라벨 표시
        return label;
    }

    // 입력 값도 현재 값으로 설정 시
    if (isInput) {
        // 현재 값 표시
        return value.value;
    }
});

// event
/**
 * 라벨(입력 값) 클릭 시
 */
const onClickLabel = () => {
    if (!disabled) {
        setIsShow();
    }
};

/**
 * 값 입력 시
 * @param event 이벤트 정보
 */
const onInputText = (event: Event) => {
    inputText.value = (event.target as HTMLInputElement).value.trim();
};

/**
 * 값 선택 시
 * @param newValue 선택한 값
 */
const onSelectValue = (newValue: typeof value.value) => {
    setIsShow(false);

    value.value = newValue;
};

/**
 * 외부 클릭 시
 */
onClickOutside(selectElement, () => setIsShow(false));

// watch
watch(isShow, (isShow) => {
    if (!isInput && !isSearch) {
        return;
    }

    // 입력 값도 현재 값으로 설정 시 또는 options(목록) 검색 사용 시 Select Option 컴포넌트가 표시된 경우
    if (isShow) {
        // 입력 값도 현재 값으로 설정 시 현재 값이 있는 경우
        if (isInput && value.value && typeof value.value !== 'boolean') {
            // 입력 값을 현재 값으로 설정
            inputText.value = String(value.value);
        }

        // 라벨(입력 값) 요소에 포커스 설정
        inputElement.value?.focus();

        return;
    }

    // Select Option 컴포넌트가 표시되지 않은 경우 options(목록) 검색 사용 시
    if (!isInput) {
        // 입력 값 초기화
        inputText.value = '';
    }
}, { flush: 'post' });
watch(inputText, (inputText) => {
    // 입력 값도 현재 값으로 설정 시
    if (isInput) {
        // 현재 값을 입력 값으로 설정
        value.value = inputText;
    }
});
</script>
