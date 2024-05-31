<!-- 회원정보 수정 모달 -->
<template>
    <VModal>
        <template #top>
            회원정보 수정
        </template>
        <div class="flex-r mb-7">
            <VBtn
                :kind="ButtonType.Delete"
                sm
                @click="onClickDelete"
            >
                회원 삭제
            </VBtn>
        </div>
        <VTable hori>
            <template #col>
                <col width="12%" />
                <col width="38%" />
                <col width="12%" />
                <col width="38%" />
            </template>
            <tr>
                <th>성명</th>
                <td>
                    <VInput
                        v-model:value="name"
                        v-bind="nameProps"
                        class="pull"
                    />
                </td>
                <th>성명</th>
                <td>
                    <VInput
                        v-model:value="position"
                        v-bind="positionProps"
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th>소속</th>
                <td>
                    <VInput
                        v-model:value="dept"
                        v-bind="deptProps"
                        class="pull"
                    />
                </td>
                <th>부서</th>
                <td>
                    <VInput
                        v-model:value="agencyName"
                        v-bind="agencyProps"
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th>이메일</th>
                <td>
                    <VInput
                        v-model:value="email"
                        v-bind="emailProps"
                        class="pull"
                    />
                </td>
                <th>개인 연락처</th>
                <td>
                    <VInput
                        v-model:value="personalTelNumber"
                        v-bind="personalTelProps"
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th>회사 연락처</th>
                <td>
                    <VInput
                        v-model:value="companyTelNumber"
                        v-bind="companyTelProps"
                        class="pull"
                    />
                </td>
                <th>권한</th>
                <td>
                    <VSelect
                        v-model:value="authoritiesProps"
                        v-bind="addAuthorities"
                        :options="authority"
                        class="pull"
                    />
                </td>
            </tr>
        </VTable>
        <template #bottom>
            <VBtn
                :kind="ButtonType.Cancel"
                class="mr-10"
                @click="emit('hide')"
            >
                취소
            </VBtn>
            <VBtn @click="onSubmit">
                저장
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
// type
export type Props = {
    idx: number;
};

export type Emits = {
    /** 모달 숨김 */
    hide: [];

    submit: [];
};
</script>
<script setup lang="ts">
import { useAsyncState, onKeyStroke } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestUserInfo } from '@/api/user';

import useEvent from '@/global/useEvent';

import { ButtonType } from '@/mappings/enum';

// props
const { idx } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// variable
/** 권한 */
const authority = [
    {
        label: 'Master',
        value: 'ROLE_MASTER',
    },
    {
        label: 'Admin',
        value: 'ROLE_ADMIN',
    },
    {
        label: 'Manager',
        value: 'ROLE_MANAGER',
    },
    {
        label: 'Partner_Admin',
        value: 'ROLE_PARTNER_ADMIN',
    },
    {
        label: 'Partner_Manager',
        value: 'ROLE_PARTNER_MANAGER',
    },
];

// global
const { onResponse } = useEvent();
const { execute: requestInfo } = useAsyncState(async () => await requestUserInfo(Number(idx)), {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        isShowBackOnError: true,
        success() {
            const { data } = response;

            if (data) {
                let authorityText = {};
                authority.forEach(({ value, label }) => {
                    if (data.addAuthorities?.indexOf(value) !== -1) {
                        authorityText = {
                            value,
                            label,
                        };
                    }
                });
                const datas = {
                    ...data,
                    addAuthorities: authorityText,
                };

                setValues(datas);
            }
        },
    }),
});

// validate
const validationSchema = yup.object({
    name: yup.string(),
    position: yup.string(),
    dept: yup.string(),
    agencyName: yup.string(),
    email: yup.string(),
    personalTelNumber: yup.string(),
    companyTelNumber: yup.string(),
    addAuthorities: yup.string(),
});
const { defineField, setValues, submitCount } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});
const [name, nameProps] = defineField('name', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [position, positionProps] = defineField('position', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [dept, deptProps] = defineField('dept', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [agencyName, agencyProps] = defineField('agencyName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [email, emailProps] = defineField('email', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [personalTelNumber, personalTelProps] = defineField('personalTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [companyTelNumber, companyTelProps] = defineField('companyTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [addAuthorities, authoritiesProps] = defineField('addAuthorities', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
/**
 * 설정
 */
const onSubmit = console.log('submit');

/**
 * 삭제
 */
const onClickDelete = () => {
    emit('submit');
    emit('hide');
};

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));

requestInfo();
</script>

<style lang="scss" scoped>
:deep(.modal-container) {
    width: rem(900px);
}
</style>
