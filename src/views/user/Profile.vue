<!-- 프로필 -->
<template>
    <VTitle>
        {{ route.name }}
        <template #button>
            <VBtn
                :kind="ButtonType.Sub"
                @click="onShowResetPasswordModal"
            >
                비밀번호 변경
            </VBtn>
            <VBtn
                :disabled="isSubmitting || isLoadingModify"
                @click="onSubmit"
                class="ml-14"
            >
                저장
            </VBtn>
        </template>
    </VTitle>
    <form @submit.prevent="onSubmit">
        <div class="contents">
            <VTable hori>
                <template #col>
                    <col width="10%" />
                    <col width="23.3%" />
                    <col width="10%" />
                    <col width="6.52%" />
                    <col width="10%" />
                    <col width="6.52%" />
                    <col width="10%" />
                    <col width="23.3%" />
                </template>
                <tr>
                    <th>사용자 권한</th>
                    <td>Manager</td>
                    <th>이메일</th>
                    <td colspan="3">
                        {{ email }}
                    </td>
                    <th>소속</th>
                    <td>{{ agencyName }}</td>
                </tr>
                <tr>
                    <th>
                        성명
                    </th>
                    <td colspan="3">
                        <VInput
                            v-model:value="name"
                            v-bind="nameProps"
                            autofocus
                            class="pull"
                        />
                    </td>
                    <th>
                        직함
                    </th>
                    <td colspan="3">
                        <VInput
                            v-model:value="position"
                            v-bind="positionProps"
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th>
                        부서명
                    </th>
                    <td>
                        <VInput
                            v-model:value="dept"
                            v-bind="deptProps"
                            class="pull"
                        />
                    </td>
                    <th>연락처(회사)</th>
                    <td colspan="3">
                        <VInput
                            v-model:value="personalTelNumber"
                            v-bind="personalTelProps"
                            type="tel"
                            class="pull"
                        />
                    </td>
                    <th>연락처(개인)</th>
                    <td>
                        <VInput
                            v-model:value="companyTelNumber"
                            v-bind="companyTelProps"
                            type="tel"
                            class="pull"
                        />
                    </td>
                </tr>
            </VTable>
        </div>
    </form>
    <ResetPasswordModal
        v-if="isShowResetPasswordModal"
        @hide="onHideResetPasswordModal"
        :id="email"
    />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestProfileInfo, requestModifyProfile } from '@/api/user/profile';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { ButtonType } from '@/mappings/enum';

import ResetPasswordModal from '@/views/user/modal/ResetPassword.vue';

import useMessageStore from '@/stores/message';

// router
const route = useRoute();

// global
const { onResponse } = useEvent();
const { execute: requestInfo } = useAsyncState(requestProfileInfo, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        success() {
            const { data } = response;

            if (data) {
                setValues(data);
            }
        },
    }),
});
const { execute: requestModify, isLoading: isLoadingModify } = useAsyncState(requestModifyProfile, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const {
    isShow: isShowResetPasswordModal,
    onShow: onShowResetPasswordModal,
    onHide: onHideResetPasswordModal,
} = useModal();

// store
/** 메시지 */
const messageStore = useMessageStore();

// validate
const validationSchema = yup.object({
    name: yup.string()
        .required('이름을 입력해주세요.'),
    agencyName: yup.string(),
    position: yup.string()
        .required('직책을 입력해주세요.'),
    dept: yup.string()
        .required('부서명을 입력해주세요.'),
    email: yup.string()
        .required('이메일을 입력해주세요.')
        .email('이메일은 이메일 형식으로 \'@\'를 포함하여 입력해주세요.'),
    personalTelNumber: yup.string(),
    companyTelNumber: yup.string(),
});
const { defineField, handleSubmit, isSubmitting, setValues, submitCount } = useForm({ validationSchema: toTypedSchema(validationSchema) });
const [name, nameProps] = defineField('name', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [agencyName] = defineField('agencyName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [position, positionProps] = defineField('position', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [dept, deptProps] = defineField('dept', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [email] = defineField('email', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [personalTelNumber, personalTelProps] = defineField('personalTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [companyTelNumber, companyTelProps] = defineField('companyTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
/**
 * 설정
 */
const onSubmit = handleSubmit((values) => messageStore.$patch({
    isShow: true,
    title: '수정',
    message: '변경하신 정보로 수정하시겠습니까?',
    isConfirm: true,
    buttonText: { ok: '수정' },
    callback: { ok: () => requestModify(0, values) },
}));

requestInfo();
</script>
