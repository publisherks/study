<!-- 비밀번호 재설정 -->
<template>
    <form
        class="login-form"
        @submit.prevent="onSubmit"
    >
        <VInput
            :value="id"
            disabled
            class="pull mb-15"
        />
        <VInput
            v-model:value="password"
            v-bind="passwordProps"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            autofocus
            class="pull mb-15"
        />
        <VInput
            v-model:value="passwordConfirm"
            v-bind="passwordConfirmProps"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            class="pull mb-15"
        />
        <VBtn
            type="submit"
            :disabled="isLoadingModifyPassword || isSubmitting"
        >
            비밀번호 재설정
        </VBtn>
    </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestModifyUserPassword } from '@/api/user';

import useEvent from '@/global/useEvent';

import { RouterName } from '@/mappings/enum';

import useMessageStore from '@/stores/message';

// router
const route = useRoute();
const router = useRouter();

// global
const { onResponse } = useEvent();
const { execute: requestModifyPassword, isLoading: isLoadingModifyPassword } = useAsyncState(requestModifyUserPassword, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        success() {
            // 로그인 화면 표시
            router.push({ name: RouterName.Login2 });
        },
    }),
});

// store
/** 메시지 */
const messageStore = useMessageStore();

// computed
/** 아이디 */
const id = computed(() => Array.isArray(route.query.id) ? route.query.id[0] : route.query.id);

// validate
const validationSchema = yup.object({
    password: yup.string()
        .required('비밀번호를 입력해주세요.'),
    passwordConfirm: yup.string()
        .required('비밀번호를 다시 한 번 입력해주세요.')
        .oneOf([yup.ref('password')], '비밀번호와 동일하게 입력해주세요.'),
});
const { defineField, handleSubmit, isSubmitting, submitCount } = useForm({ validationSchema: toTypedSchema(validationSchema) });
const [password, passwordProps] = defineField('password', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [passwordConfirm, passwordConfirmProps] = defineField('passwordConfirm', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// methods
/**
 * 초기 실행
 */
const init = () => {
    if (id.value) {
        return;
    }

    // 아이디가 없는 경우 메시지 표시
    messageStore.$patch({
        isShow: true,
        message: '잘못된 접근입니다.',
    });

    // 로그인 화면 표시
    router.replace({ name: RouterName.Login2 });
};

// event
/**
 * 설정
 */
const onSubmit = handleSubmit(({ password }) => requestModifyPassword(0, {
    id: id.value!,
    password,
}));

// lifecycle
init();
</script>
