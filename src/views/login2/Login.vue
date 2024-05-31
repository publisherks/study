<!-- 로그인 -->
<template>
    <form
        class="login-form"
        @submit.prevent="onSubmit"
    >
        <h1
            id="logo"
            class="mb-40"
        >
            <!-- FIXME: 로고 수정 필요 -->
            <img
                src="@/assets/images/login-logo.png"
                :alt="title"
            />
        </h1>
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
        <VCheck
            v-model:checked="isSaveUserId"
            class="ml-auto mb-20"
        >
            아이디 저장
        </VCheck>
        <VBtn
            type="submit"
            :disabled="isSubmitting"
            lg
            class="w-100"
        >
            로그인
        </VBtn>
        <div class="flex-bet w-100 mt-10">
            <p
                class="link-text"
                @click="onJoinClick"
            >
                회원 가입
            </p>
            <p
                class="link-text"
                @click="onShowFindPasswordModal"
            >
                비밀번호 찾기
            </p>
        </div>
    </form>
    <p class="copyright">
        Copyright © <strong>ulalaLAB</strong> All Right Reserved.
    </p>
    <FindPasswordModal
        v-if="isShowFindPasswordModal"
        @hide="onHideFindPasswordModal"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import Cookies from 'js-cookie';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestLogin } from '@/api/login';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { RouterName, StorageKey } from '@/mappings/enum';

import useLoginStore from '@/stores/login';

import FindPasswordModal from '@/views/login2/modal/FindPassword.vue';

// variable
/** 타이틀 */
const title = import.meta.env.VITE_TITLE;
/** 저장된 아이디 */
const saveUserId = Cookies.get(StorageKey.SaveUserId);

// router
const router = useRouter();

// global
const { onResponse } = useEvent();
const { execute } = useAsyncState(requestLogin, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        success() {
            const { data } = response;

            // 로그인 계정 정보가 있는 경우
            if (data) {
                // 로그인 계정 정보 설정
                loginStore.$patch(data);
            }

            if (isSaveUserId.value) {
                // 아이디 저장 시
                Cookies.set(StorageKey.SaveUserId, id.value!, { expires: 30 });
            } else {
                // 아이디를 저장하지 않는 경우
                Cookies.remove(StorageKey.SaveUserId);
            }

            // 메인 화면 표시
            router.push({ name: RouterName.Inquiry });
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

// state
/** 아이디 저장 여부 */
const isSaveUserId = ref<boolean>(Boolean(saveUserId));

// validate
const validationSchema = yup.object({
    id: yup.string()
        .required('아이디를 입력해주세요.'),
    password: yup.string()
        .required('비밀번호를 입력해주세요.'),
});
const { defineField, handleSubmit, isSubmitting, submitCount } = useForm({
    initialValues: { id: (saveUserId ?? '') },
    validationSchema: toTypedSchema(validationSchema),
});
const [id, idProps] = defineField('id', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [password, passwordProps] = defineField('password', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
/**
 * 로그인
 */
const onSubmit = handleSubmit(async (values) => await execute(0, values));

/**
 * 회원가입
 */
const onJoinClick = () => router.push({
    name: RouterName.Join,
});
</script>
