<!-- 로그인 -->
<template>
    <form
        class="login-form"
        @submit.prevent="onSubmit"
    >
        <VInput
            v-model:value="id"
            v-bind="idProps"
            placeholder="아이디를 입력해주세요."
            autofocus
            class="pull mb-15"
        />
        <VInput
            v-model:value="password"
            v-bind="passwordProps"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            class="pull mb-15"
        />
        <VBtn
            type="submit"
            :disabled="isLoading || isSubmitting"
        >
            로그인
        </VBtn>
        <p
            class="link-text mt-10 ml-auto"
            @click="onShowFindPasswordModal"
        >
            비밀번호 찾기
        </p>
    </form>
    <FindPasswordModal
        v-if="isShowFindPasswordModal"
        @hide="onHideFindPasswordModal"
        @submit="onSubmitFindPassword"
    />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestLogin } from '@/api/login';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { getMainRouterName } from '@/functions/get';

import { RouterName } from '@/mappings/enum';
import type { Emits } from '@/mappings/types/common';

import useLoginStore from '@/stores/login';

import FindPasswordModal from '@/views/login/modal/FindPassword.vue';
import type { Emits as FindPasswordModalEmits } from '@/views/login/modal/FindPassword.vue';

// router
const router = useRouter();

// global
const { onResponse } = useEvent();
const { execute: request, isLoading } = useAsyncState(requestLogin, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        success() {
            const data = response.data as NonNullable<typeof response.data>;

            // 로그인 계정 정보 설정
            loginStore.$patch(data);

            // 로그인 계정 권한의 메인 화면 표시
            router.push({ name: getMainRouterName() });
        },
    }),
});
const {
    isShow: isShowFindPasswordModal,
    onShow: onShowFindPasswordModal,
    onHide: onHideFindPasswordModal,
} = useModal();

// store
/** 로그인 */
const loginStore = useLoginStore();

// validate
const validationSchema = yup.object({
    id: yup.string()
        .required('아이디를 입력해주세요.'),
    password: yup.string()
        .required('비밀번호를 입력해주세요.'),
});
const { defineField, handleSubmit, isSubmitting, submitCount } = useForm({ validationSchema: toTypedSchema(validationSchema) });
const [id, idProps] = defineField('id', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [password, passwordProps] = defineField('password', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
/**
 * 로그인
 */
const onSubmit = handleSubmit((values) => request(0, values));

/**
 * 비밀번호 찾기
 */
const onSubmitFindPassword: Emits<FindPasswordModalEmits['submit']> = (id) => {
    // 비밀번호 재설정 화면 표시
    router.push({
        name: RouterName.ResetPassword2,
        query: { id },
    });
};
</script>
