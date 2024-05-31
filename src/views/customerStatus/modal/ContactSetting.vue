<!-- 연락처 추가/수정 모달 -->
<template>
    <VModal>
        <template #top>
            연락처 {{ isModify ? '수정' : '추가' }}
        </template>
        <p class="flex-r required-text mb-7">
            *은 필수입력 항목 입니다.
        </p>
        <VTable hori>
            <template #col>
                <col width="10%" />
                <col width="40%" />
                <col width="10%" />
                <col width="40%" />
            </template>
            <tr>
                <th class="required">
                    성명
                </th>
                <td>
                    <VInput
                        v-model:value="contactName"
                        v-bind="contactNameProps"
                        placeholder="성명"
                        class="pull"
                    />
                </td>
                <th>직함</th>
                <td>
                    <VInput
                        v-model:value="position"
                        v-bind="positionProps"
                        placeholder="직함"
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    부서
                </th>
                <td>
                    <VInput
                        v-model:value="dept"
                        v-bind="deptProps"
                        placeholder="부서"
                        class="pull"
                    />
                </td>
                <th>개인 연락처</th>
                <td>
                    <VInput
                        v-model:value="personalTelNumber"
                        v-bind="personalTelNumberProps"
                        placeholder="개인 연락처"
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    회사 연락처
                </th>
                <td>
                    <VInput
                        v-model:value="companyTelNumber"
                        v-bind="companyTelNumberProps"
                        placeholder="회사 연락처"
                        class="pull"
                    />
                </td>
                <th>이메일</th>
                <td>
                    <VInput
                        v-model:value="email"
                        v-bind="emailProps"
                        placeholder="이메일"
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
                {{ isModify ? '수정' : '등록' }}
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
import type { ContactInfo } from '@/api/client/interface';

// type
export type Props = {
    data?: ContactInfo;
};

export type Emits = {
    /** 모달 숨김 */
    hide: [];
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { ButtonType } from '@/mappings/enum';

// props
const { data } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// computed
/** 수정 여부 */
const isModify = computed(() => Boolean(data));
console.log(isModify.value);

// validate
const validationSchema = yup.object({
    contactName: yup.string()
        .required(),
    position: yup.string(),
    dept: yup.string(),
    personalTelNumber: yup.string(),
    companyTelNumber: yup.string(),
    email: yup.string(),
});
const { defineField, submitCount } = useForm({
    initialValues: {
        contactName: data?.contactName || '',
        position: data?.position || '',
        dept: data?.dept || '',
        personalTelNumber: data?.personalTelNumber || '',
        companyTelNumber: data?.companyTelNumber || '',
        email: data?.email || '',
    },
    validationSchema: toTypedSchema(validationSchema),
});
const [contactName, contactNameProps] = defineField('contactName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [position, positionProps] = defineField('position', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [dept, deptProps] = defineField('dept', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [personalTelNumber, personalTelNumberProps] = defineField('personalTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [companyTelNumber, companyTelNumberProps] = defineField('companyTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [email, emailProps] = defineField('email', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
const onSubmit = () => {
    console.log('submit');
};

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
:deep(.modal-container) {
    width: rem(900px);
}
</style>
