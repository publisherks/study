<!-- 금액 정보 모달 -->
<template>
    <VModal>
        <template #top>
            금액 정보 수정
        </template>
        <VGrid :cols="3">
            <VCell>
                <VTitle
                    sub
                    sm
                    :class="titleCls('QUOTATION')"
                >
                    견적 금액 정보{{ state === 'QUOTATION' ? '를 입력해주세요.' : '' }}
                    <template
                        v-if="state === 'QUOTATION'"
                        #etc
                    >
                        <p class="required-text ml-auto pt-12">
                            *은 필수입력 항목 입니다.
                        </p>
                    </template>
                </VTitle>
                <VTable
                    hori
                    class="mb-10"
                >
                    <template #col>
                        <col width="20%" />
                        <col width="*" />
                    </template>
                    <tr>
                        <th :class="{ required: state === 'QUOTATION' }">
                            견적 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="estimatedAmount"
                                v-bind="estimatedAmountProps"
                                placeholder="견적 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'QUOTATION' }">
                            최종 견적일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="finalEstimateDate"
                                v-bind="finalEstimateDateProps"
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'QUOTATION' }">
                            반영 예정 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="reflectionPlannedAmount"
                                v-bind="reflectionPlannedAmountProps"
                                placeholder="반영 예정 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'QUOTATION' }">
                            반영 예정월
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="reflectionPlannedDate"
                                v-bind="reflectionPlannedDateProps"
                                monthPicker
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'QUOTATION' }">
                            계약 가능성
                        </th>
                        <td>
                            <VInput
                                v-model:value="contractPossibility"
                                v-bind="contractPossibilityProps"
                                placeholder="계약 가능성을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'QUOTATION' }">
                            계약 목표일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="contractTargetDate"
                                v-bind="contractTargetDateProps"
                                class="pull"
                            />
                        </td>
                    </tr>
                </VTable>
            </VCell>
            <VCell>
                <VTitle
                    sub
                    sm
                    :class="titleCls('CONTRACT')"
                >
                    계약 금액 정보{{ state === 'CONTRACT' ? '를 입력해주세요.' : '' }}
                    <template
                        v-if="state === 'CONTRACT'"
                        #etc
                    >
                        <p class="required-text ml-auto pt-12">
                            *은 필수입력 항목 입니다.
                        </p>
                    </template>
                </VTitle>
                <VTable
                    hori
                    class="mb-10"
                >
                    <template #col>
                        <col width="20%" />
                        <col width="*" />
                    </template>
                    <tr>
                        <th :class="{ required: state === 'CONTRACT' }">
                            계약 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="contractAmount"
                                v-bind="contractAmountProps"
                                placeholder="계약 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'CONTRACT' }">
                            계약 시작일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="contractStartDate"
                                v-bind="contractStartDateProps"
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'CONTRACT' }">
                            계약 종료일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="contractEndDate"
                                v-bind="contractEndDateProps"
                                class="pull"
                            />
                        </td>
                    </tr>
                </VTable>
                <template v-if="state === 'CONTRACT'">
                    <VTitle
                        sub
                        sm
                        class="mb-12"
                    >
                        사업자등록번호
                    </VTitle>
                    <div class="flex mb-12">
                        <p class="label-text">
                            사업자등록증 첨부
                        </p>
                        <VCheck
                            v-model:checked="isBizLicense"
                            class="ml-auto"
                        >
                            이미 첨부했어요.
                        </VCheck>
                    </div>
                    <VUploadFile
                        class="pull mb-20"
                        @upload="onUpload($event)"
                        :accept="fileAccept.toString()"
                    >
                        파일 찾기
                    </VUploadFile>
                    <VInput
                        v-model:value="bizNo"
                        v-bind="bizNoProps"
                        placeholder="사업자등록번호를 입력하세요."
                        class="pull"
                    >
                        <template #label>
                            사업자등록번호 입력
                        </template>
                    </VInput>
                </template>
            </VCell>
            <VCell>
                <VTitle
                    sub
                    sm
                    :class="titleCls('COMPLETION')"
                >
                    매출 금액 정보{{ state === 'COMPLETION' ? '를 입력해주세요.' : '' }}
                    <template
                        v-if="state === 'COMPLETION'"
                        #etc
                    >
                        <p class="required-text ml-auto pt-12">
                            *은 필수입력 항목 입니다.
                        </p>
                    </template>
                </VTitle>
                <VTable hori>
                    <template #col>
                        <col width="20%" />
                        <col width="*" />
                    </template>
                    <tr>
                        <th :class="{ required: state === 'COMPLETION' }">
                            반영 완료 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="reflectionCompletedAmount"
                                v-bind="reflectionCompletedAmountProps"
                                placeholder="반영 완료 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'COMPLETION' }">
                            반영 예정 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="plannedReflectionAmount"
                                v-bind="plannedReflectionAmountProps"
                                placeholder="반영 예정 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th :class="{ required: state === 'COMPLETION' }">
                            반영 예정월
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="plannedReflectionDate"
                                v-bind="plannedReflectionDateProps"
                                monthPicker
                                class="pull"
                            />
                        </td>
                    </tr>
                </VTable>
            </VCell>
        </VGrid>
        <template #bottom>
            <VBtn
                :kind="ButtonType.Cancel"
                class="mr-10"
                @click="emit('hide')"
            >
                취소
            </VBtn>
            <VBtn @click="emit('hide')">
                저장
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
// type
export type Props = {
    state: string;
};

export type Emits = {
    /** 모달 숨김 */
    hide: [];
};
</script>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { ButtonType } from '@/mappings/enum';

import type { UploadFile } from '@/mappings/types/common';

// props
const { state } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// variable
const fileAccept = [
    'image/*',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    '.pdf',
    '.csv',
    '.doc',
    '.docx',
    '.hwp',
    '.hwpx',
    '.ppt',
    '.pptx',
    'video/mp4',
    '.mov',
    '.zip',
    '.rar',
    '.7zip',
];

// state
const isBizLicense = ref<boolean>(false);
const bzLicense = ref<UploadFile>();

// validate
const validationSchema = computed(() => {
    const valid = {
        estimatedAmount: yup.string(),
        finalEstimateDate: yup.date(),
        reflectionPlannedAmount: yup.string(),
        reflectionPlannedDate: yup.date(),
        contractPossibility: yup.string(),
        contractTargetDate: yup.date(),
        contractAmount: yup.string(),
        contractStartDate: yup.date(),
        contractEndDate: yup.date(),
        bizNo: yup.string(),
        reflectionCompletedAmount: yup.string(),
        plannedReflectionAmount: yup.string(),
        plannedReflectionDate: yup.date(),
    };

    if (state === 'QUOTATION') {
        valid.estimatedAmount = valid.estimatedAmount.required();
        valid.finalEstimateDate = valid.finalEstimateDate.required();
        valid.reflectionPlannedAmount = valid.reflectionPlannedAmount.required();
        valid.reflectionPlannedDate = valid.reflectionPlannedDate.required();
        valid.contractPossibility = valid.contractPossibility.required();
        valid.contractTargetDate = valid.contractTargetDate.required();
    } else if (state === 'CONTRACT') {
        valid.contractAmount = valid.contractAmount.required();
        valid.contractStartDate = valid.contractStartDate.required();
        valid.contractEndDate = valid.contractEndDate.required();
    } else if (state === 'COMPLETION') {
        valid.contractAmount = valid.contractAmount.required();
        valid.contractStartDate = valid.contractStartDate.required();
        valid.contractEndDate = valid.contractEndDate.required();
    }

    return yup.object(valid);
});
const { defineField, submitCount } = useForm({
    validationSchema: toTypedSchema(validationSchema.value),
});
const [estimatedAmount, estimatedAmountProps] = defineField('estimatedAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [finalEstimateDate, finalEstimateDateProps] = defineField('finalEstimateDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [reflectionPlannedAmount, reflectionPlannedAmountProps] = defineField('reflectionPlannedAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [reflectionPlannedDate, reflectionPlannedDateProps] = defineField('reflectionPlannedDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractPossibility, contractPossibilityProps] = defineField('contractPossibility', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractTargetDate, contractTargetDateProps] = defineField('contractTargetDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractAmount, contractAmountProps] = defineField('contractAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractStartDate, contractStartDateProps] = defineField('contractStartDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractEndDate, contractEndDateProps] = defineField('contractEndDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [reflectionCompletedAmount, reflectionCompletedAmountProps] = defineField('reflectionCompletedAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [plannedReflectionAmount, plannedReflectionAmountProps] = defineField('plannedReflectionAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [plannedReflectionDate, plannedReflectionDateProps] = defineField('plannedReflectionDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [bizNo, bizNoProps] = defineField('bizNo', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// methods
const titleCls = (key: string) => state === key && 'required-color';

// event
const onUpload = (file: UploadFile) => {
    bzLicense.value = file;
};

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/modal/amountSetting";
</style>
