<!-- 비밀번호 찾기 모달 -->
<template>
    <VModal>
        <template #top>
            비밀번호 찾기
        </template>
        <p class="text mb-20">
            가입하신 이메일로 임시 비밀번호가 발송됩니다.
        </p>
        <form @submit.prevent="onSubmit">
            <VInput
                v-model:value="id"
                v-bind="idProps"
                placeholder="이메일을 입력해주세요."
                autofocus
                class="pull mb-20"
            >
                <template #label>
                    이메일
                </template>
                <template #info>
                    아이디는 이메일 형식으로 '@'를 포함하여 입력해주세요.
                </template>
            </VInput>
            <VSelect
                v-model:value="agencyName"
                v-bind="agencyProps"
                :options="[
                    {
                        label: '울랄라랩',
                        value: '울랄라랩',
                    },
                ]"
                placeholder="소속을 선택해주세요."
                class="pull"
            >
                <template #label>
                    소속
                </template>
            </VSelect>
        </form>
        <template #bottom>
            <VBtn
                :kind="ButtonType.Cancel"
                class="mr-10"
                @click="emit('hide')"
            >
                취소
            </VBtn>
            <VBtn
                :disabled="isSubmitting"
                @click="onSubmit"
            >
                임시 비밀번호 전송
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
import type { RequestModifyUserPassword } from '@/api/user/interface';

// type
export type Emits = {
    /** 모달 숨김 */
    hide: [];

    /** 비밀번호 찾기 */
    submit: [id: RequestModifyUserPassword['id']];
};
</script>
<script setup lang="ts">
import { useAsyncState, onKeyStroke } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestFindUserPassword } from '@/api/user';

import useEvent from '@/global/useEvent';

import { ButtonType } from '@/mappings/enum';

// emits
const emit = defineEmits<Emits>();

// global
const { onResponse } = useEvent();
const { execute } = useAsyncState(requestFindUserPassword, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        success() {
            emit('hide');
            emit('submit', id.value!);
        },
    }),
});

// validate
const validationSchema = yup.object({
    id: yup.string()
        .required('아이디를 입력해주세요.')
        .email('아이디는 이메일 형식으로 \'@\'를 포함하여 입력해주세요.'),
    agencyName: yup.string()
        .required('소속을 선택해주세요.'),
});
const { defineField, handleSubmit, isSubmitting, submitCount } = useForm({ validationSchema: toTypedSchema(validationSchema) });
const [id, idProps] = defineField('id', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [agencyName, agencyProps] = defineField('agencyName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
/**
 * 비밀번호 찾기
 */
const onSubmit = handleSubmit(async (values) => await execute(0, values));

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
.modal-container {
    width: rem(440px);

    .btn-wrap {
        .btn {
            width: rem(125px);
        }
    }
}
</style>
