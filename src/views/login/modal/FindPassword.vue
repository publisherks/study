<!-- 비밀번호 찾기 모달 -->
<template>
    <VModal>
        <template #top>
            비밀번호 찾기 정보 입력
        </template>
        <form @submit.prevent="onSubmit">
            <VInput
                v-model:value="id"
                v-bind="idProps"
                placeholder="아이디를 입력해주세요."
                autofocus
                class="pull mb-20"
            >
                <template #label>
                    등록한 아이디(이메일)을 입력해주세요.
                </template>
                <template #info>
                    아이디는 이메일 형식으로 '@'를 포함하여 입력해주세요.
                </template>
            </VInput>
            <VInput
                v-model:value="name"
                v-bind="nameProps"
                placeholder="이름을 입력해주세요."
                class="pull mb-20"
            >
                <template #label>
                    등록한 이름을 입력해주세요.
                </template>
            </VInput>
            <div class="flex-c mt-40">
                <VBtn
                    :kind="ButtonType.Sub1"
                    class="mr-10"
                    @click="emit('hide')"
                >
                    취소
                </VBtn>
                <VBtn
                    type="submit"
                    :disabled="isSubmitting"
                >
                    비밀번호 찾기
                </VBtn>
            </div>
        </form>
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
    name: yup.string()
        .required('이름을 입력해주세요.'),
});
const { defineField, handleSubmit, isSubmitting, submitCount } = useForm({ validationSchema: toTypedSchema(validationSchema) });
const [id, idProps] = defineField('id', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [name, nameProps] = defineField('name', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

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
