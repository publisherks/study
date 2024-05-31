<!-- 담당자 지정 모달 -->
<template>
    <VModal>
        <template #top>
            담당자 지정
        </template>
        <p class="text mb-20">
            영업담당자를 검색 후 지정해 주세요.
        </p>
        <VSelect
            v-model:value="manager"
            :options="managerOption"
            search
            class="pull"
        />
        <template #bottom>
            <VBtn
                :kind="ButtonType.Cancel"
                class="mr-10"
                @click="emit('hide')"
            >
                취소
            </VBtn>
            <VBtn @click="onSubmit">
                확인
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
// type
export type Emits = {
    /** 모달 숨김 */
    hide: [];
};
</script>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAsyncState, onKeyStroke } from '@vueuse/core';

import useEvent from '@/global/useEvent';

import { requestManagerList } from '@/api/inquiry';

import { ButtonType } from '@/mappings/enum';

// emits
const emit = defineEmits<Emits>();

// global
const { onResponse } = useEvent();
const { execute, state: response } = useAsyncState(requestManagerList, {}, {
    immediate: false,
    onSuccess: onResponse,
});

// state
/** 검색 */
const manager = ref<any>();

// computed
/** 담당자 목록 */
const datas = computed(() => (response.value.data ?? []));
/** 담당자 목록 Option */
const managerOption = computed(() => datas.value.map(({ name, agencyName }) => ({
    label: name,
    exp: agencyName,
    value: name,
})));

// methods
/**
 * 담당자 목록 조회 요청
 */
const requestList = async () => await execute(0);

// event
/**
 * 등록
 */
const onSubmit = () => console.log('setting');

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));

// watch
watch(() => manager.value, requestList, { immediate: true });
</script>

<style lang="scss" scoped>
:deep(.modal-contents) {
    height: rem(230px);
}
</style>
