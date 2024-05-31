<template>
    <div id="container">
        <div class="container">
            <div class="contents">
                <form @submit.prevent="onSubmit">
                    <h2 class="title">
                        울랄라랩에게 문의하기
                    </h2>
                    <p class="sub-text">
                        문의를 남겨주시면, 내용을 검토한 후 담당자가 연락을 드리겠습니다.
                    </p>
                    <p class="required-text mb-6">
                        *은 필수입력 항목 입니다.
                    </p>
                    <VGrid
                        :cols="2"
                        rows
                        :rowsWidth="['auto', 124]"
                    >
                        <VCell>
                            <VTable hori>
                                <template #col>
                                    <col width="18%" />
                                    <col width="*" />
                                </template>
                                <tr>
                                    <th class="required">
                                        회사명
                                    </th>
                                    <td>
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
                                    <td>
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
                                    <td>
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
                                </tr>
                                <tr>
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
                                </tr>
                                <tr>
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
                                </tr>
                                <tr>
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
                                    <td>
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
                                :height="482"
                                :maxHeight="482"
                                placeholder="문의하실 내용을 입력해주세요."
                                class="pull"
                            >
                                <template #label>
                                    문의내용<span class="required-text">*</span>
                                </template>
                            </VTextarea>
                        </VCell>
                        <VCell
                            :col="[1, 3]"
                            class="agree-box flex-col"
                        >
                            <p>
                                본인은 아래의 내용을 확인하고, 울랄라랩 주식회사(이하 ‘울랄라랩’)가 다음과 같이 본인의 개인정보를 처리(수집 등)하는 것에 동의합니다. 울랄라랩(주)는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법, 전기통신사업법에 의거한 개인정보처리방침을 정하여 이용자의 권익보호에 최선을 다하고 있습니다.<br />
                                [수집항목] 회사명, 회사주소, 현장/공장정보, 담당자명, 직함, 전화번호, 이메일, 윔팩토리를 알게 된 경로, 관리목적 등 <br />
                                [수집목적] 스마트공장 지원사업 구축 관련 문의에 대한 일련의 정보 확인 및 담당자와의 이메일 또는 전화, SMS 상담의 목적, 현장 컨설팅을 위한 방문 목적의 위치 확인, 구축을 위한 단계 확인 등 <br />
                                [보유 및 이용기간] 위 정보는 스마트공장 지원사업 구축을 위한 상담 및 컨설팅의 목적에 사용되며, 상담 단계에서 컨설팅이 종료될 경우 종료 후 6개월 이내 삭제 위 사항에 대한 동의가 없는 경우 회사에서 제공하는 서비스의 상담 및 신청, 가입 및 제공, 정보 혜택이 불가능 할 수 있습니다.
                            </p>
                            <VCheck
                                v-model:checked="isAgree"
                                class="self-m"
                            >
                                개인정보 수집 및 이용에 동의합니다
                            </VCheck>
                        </VCell>
                    </VGrid>
                    <div class="flex-c mt-20">
                        <VBtn type="submit">
                            문의하기
                        </VBtn>
                    </div>
                </form>
            </div>
            <div class="ft-logo">
                <img
                    src="@/assets/images/ulalalab-logo.png"
                    alt="ulalaLAB"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

// variable
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

// state
/** 개인정보 수집 동의 */
const isAgree = ref<boolean>(false);

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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/contactus";
</style>
