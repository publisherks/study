<!-- 관련 연락처 선택 모달 -->
<template>
    <VModal>
        <template #top>
            관련 연락처 선택
        </template>
        <p class="text mb-20">
            관련 연락처를 선택해주세요.
        </p>
        <VInfiniteScroll
            :maxHeight="460"
            class="contact-list mb-20"
        >
            <VTable>
                <tr
                    v-for="(item, index) in datas"
                    :key="`clientContact${index}`"
                >
                    <td>
                        <label :for="`clientContact${index}`">
                            <VCheck
                                :checked="!isEmpty(checks.filter((checked) => (item.contactName === checked.contactName)))"
                                @update:checked="onChangeCheck(item, $event)"
                                :id="`clientContact${index}`"
                            />
                            <strong>{{ item.contactName }}</strong>
                            <span>{{ item.position }}</span>
                            <span class="ml-auto">{{ item.dept }}</span>
                        </label>
                    </td>
                </tr>
            </VTable>
        </VInfiniteScroll>
        <p class="message-text align-l mb-12">
            선택된 연락처
        </p>
        <div class="contact-selectbox">
            <p
                v-for="(item, index) in checks"
                :key="`selectContact${index}`"
            >
                {{ item.contactName }}<span v-if="index < checks.length - 1">,</span>
            </p>
        </div>
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
export type Props = {
    idx: number | undefined;
};

export type Emits = {
    /** 모달 숨김 */
    hide: [];

    submit: [ClientContact[]];
};
</script>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAsyncState, onKeyStroke } from '@vueuse/core';

import useEvent from '@/global/useEvent';

import { requestClientInfo } from '@/api/client';
import type { ClientContact } from '@/api/client/interface';

import { ButtonType } from '@/mappings/enum';

import isEmpty from '@/utils/isEmpty';

// props
const { idx } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// global
const { onResponse } = useEvent();
const { execute, state: response } = useAsyncState(requestClientInfo, {}, {
    immediate: false,
    onSuccess: onResponse,
});

// state
/** 체크 목록 */
const checks = ref<ClientContact[]>([]);

// computed
/** 고객 목록 */
const datas = computed(() => (response.value.data?.clientContact));

// methods
/**
 * 고객 목록 조회 요청
 */
const requestList = async () => await execute(0, idx);

// event
const onSubmit = () => {
    emit('submit', checks.value);
    emit('hide');
};

const onChangeCheck = (item: ClientContact, checked: boolean) => {
    if (checked) {
        checks.value.push(item);

        return;
    }

    checks.value = checks.value.filter((checked) => (item.contactName !== checked.contactName));
};

requestList();

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/modal/clientContactSetting";
</style>
