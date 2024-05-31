<!-- 신규 문의 등록 모달 -->
<template>
    <VModal>
        <template #top>
            신규 문의 등록
        </template>
        <p class="required-text mb-7">
            *은 필수입력 항목 입니다.
        </p>
        <VGrid :cols="2">
            <VCell>
                <VTable hori>
                    <template #col>
                        <col width="13%" />
                        <col width="37%" />
                        <col width="13%" />
                        <col width="37%" />
                    </template>
                    <tr>
                        <th class="required">
                            회사명
                        </th>
                        <td colspan="3">
                            <VInput
                                v-model:value="companyName"
                                v-bind="companyNameProps"
                                placeholder="회사명을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th
                            rowspan="2"
                            class="required"
                        >
                            회사 주소
                        </th>
                        <td colspan="3">
                            <VGrid
                                :cols="3"
                                :colGap="[10]"
                            >
                                <VSelect
                                    v-model:value="country"
                                    v-bind="countryProps"
                                    :options="countryOption"
                                    placeholder="국가 선택"
                                    class="pull"
                                />
                                <VSelect
                                    v-model:value="region"
                                    v-bind="regionProps"
                                    :options="regionOption"
                                    placeholder="도/시 선택"
                                    class="pull"
                                />
                                <VSelect
                                    v-model:value="city"
                                    v-bind="cityProps"
                                    :options="cityOption"
                                    placeholder="시/군/구 선택"
                                    class="pull"
                                />
                            </VGrid>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <VInput
                                v-model:value="detailAddress"
                                v-bind="detailAddressProps"
                                placeholder="상세 주소를 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            주요 사업 분야
                        </th>
                        <td>
                            <VInput
                                v-model:value="primaryBusiness"
                                v-bind="primaryBusinessProps"
                                placeholder="주요 사업 분야를 입력하세요."
                                class="pull"
                            />
                        </td>
                        <th>
                            회사 홈페이지
                        </th>
                        <td>
                            <VInput
                                v-model:value="homepage"
                                v-bind="homepageProps"
                                placeholder="예) www.ulalaLAB.com"
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            문의자 명
                        </th>
                        <td>
                            <VInput
                                v-model:value="inquirerName"
                                v-bind="inquirerNameProps"
                                placeholder="문의자 명을 입력하세요."
                                class="pull"
                            />
                        </td>
                        <th>
                            직함
                        </th>
                        <td>
                            <VInput
                                v-model:value="position"
                                v-bind="positionProps"
                                placeholder="직함을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            연락처
                        </th>
                        <td>
                            <VInput
                                v-model:value="contactNumber"
                                v-bind="contactNumberProps"
                                placeholder="연락 받으실 전화번호를 입력해주세요."
                                class="pull"
                            />
                        </td>
                        <th>
                            이메일
                        </th>
                        <td>
                            <VInput
                                v-model:value="email"
                                v-bind="emailProps"
                                placeholder="연락 받으실 이메일 주소를 입력해주세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            유입 경로
                        </th>
                        <td colspan="3">
                            <VSelect
                                v-model:value="inquiryPath"
                                v-bind="inquiryPathProps"
                                :options="inquiryPathOption"
                                placeholder="울랄라랩을 어디서 소개받으셨나요?"
                                class="pull"
                            />
                        </td>
                    </tr>
                </VTable>
            </VCell>
            <VCell>
                <VTextarea
                    v-model:value="inquiryMessage"
                    v-bind="inquiryMessageProps"
                    :height="332"
                    :maxHeight="332"
                    placeholder="문의하실 내용을 입력해주세요."
                    class="pull"
                >
                    <template #label>
                        문의내용<span class="required-text">*</span>
                    </template>
                </VTextarea>
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
            <VBtn @click="onSubmit">
                등록
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
// type
export type Emits = {
    /** 모달 숨김 */
    hide: [];
};
</script>
<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { ButtonType } from '@/mappings/enum';

// emits
const emit = defineEmits<Emits>();

const inquiryPathOption = [
    {
        label: '신문 기사 및 언론 보도',
        value: '신문 기사 및 언론 보도',
    },
    {
        label: '잡지, 브로슈어',
        value: '잡지, 브로슈어',
    },
    {
        label: '전시회',
        value: '전시회',
    },
    {
        label: '지인 소개',
        value: '지인 소개',
    },
    {
        label: '웹사이트 검색',
        value: '웹사이트 검색',
    },
    {
        label: 'SNS (카카오톡, 페이스북, 블로그)',
        value: 'SNS (카카오톡, 페이스북, 블로그)',
    },
];

const countryOption = [
    {
        label: '대한민국',
        value: '대한민국',
    },
    {
        label: '일본',
        value: '일본',
    },
    {
        label: '중국',
        value: '중국',
    },
    {
        label: '미국',
        value: '미국',
    },
];

const regionOption = [
    {
        label: '서울특별시',
        value: '서울특별시',
    },
    {
        label: '부산광역시',
        value: '부산광역시',
    },
    {
        label: '대구광역시',
        value: '대구광역시',
    },
    {
        label: '인천광역시',
        value: '인천광역시',
    },
];

const cityOption = [
    {
        label: '종로구',
        value: '종로구',
    },
    {
        label: '중구',
        value: '중구',
    },
    {
        label: '용산구',
        value: '용산구',
    },
    {
        label: '성동구',
        value: '성동구',
    },
];

// validate
const validationSchema = yup.object({
    companyName: yup.string()
        .required('회사명을 입력하세요.'),
    country: yup.string()
        .required('국가를 선택하세요.'),
    region: yup.string()
        .required('도/시를 선택하세요.'),
    city: yup.string()
        .required('시/군/구를 선택하세요.'),
    detailAddress: yup.string()
        .required('상세 주소를 입력하세요.'),
    primaryBusiness: yup.string(),
    homepage: yup.string(),
    inquirerName: yup.string()
        .required('문의자 명을 입력하세요.'),
    position: yup.string(),
    contactNumber: yup.string()
        .required('연락 받으실 전화번호를 입력해주세요.'),
    email: yup.string(),
    inquiryPath: yup.string(),
    inquiryMessage: yup.string()
        .required('문의하실 내용을 입력해주세요.'),
});
const { defineField, handleSubmit, submitCount } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});
const [companyName, companyNameProps] = defineField('companyName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [country, countryProps] = defineField('country', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [region, regionProps] = defineField('region', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [city, cityProps] = defineField('city', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [detailAddress, detailAddressProps] = defineField('detailAddress', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [primaryBusiness, primaryBusinessProps] = defineField('primaryBusiness', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [homepage, homepageProps] = defineField('homepage', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [inquirerName, inquirerNameProps] = defineField('inquirerName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [position, positionProps] = defineField('position', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contactNumber, contactNumberProps] = defineField('contactNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [email, emailProps] = defineField('email', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [inquiryPath, inquiryPathProps] = defineField('inquiryPath', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [inquiryMessage, inquiryMessageProps] = defineField('inquiryMessage', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
/**
 * 등록
 */
const onSubmit = handleSubmit((value) => {
    console.log(value);
});

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
:deep(.modal-container) {
    width: rem(1600px);
}
</style>
