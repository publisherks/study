<template>
    <div class="join-form">
        <VTitle>
            회원 가입
        </VTitle>
        <form
            @submit.prevent="onSubmit"
            class="form-box"
        >
            <p class="required-text mb-12">
                *은 필수입력 항목 입니다.
            </p>
            <VTable hori>
                <template #col>
                    <col width="30%" />
                    <col width="*" />
                </template>
                <tr>
                    <th class="required">
                        이메일
                    </th>
                    <td>
                        <VInput
                            v-model:value="email"
                            placeholder="이메일을 입력해주세요."
                            autofocus
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        비밀번호
                    </th>
                    <td>
                        <VInput
                            v-model:value="password"
                            placeholder="영문, 숫자 조합 6자 이상을 입력해주세요."
                            autofocus
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        비밀번호 확인
                    </th>
                    <td>
                        <VInput
                            v-model:value="password2"
                            placeholder="비밀번호를 한번 더 입력해주세요."
                            autofocus
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        소속
                    </th>
                    <td>
                        <VSelect
                            v-model:value="agencyName"
                            :options="[
                                {
                                    label: '울랄라랩',
                                    value: '울랄라랩',
                                },
                            ]"
                            placeholder="소속을 선택해주세요."
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        성명
                    </th>
                    <td>
                        <VInput
                            v-model:value="name"
                            placeholder="성명을 입력해주세요."
                            autofocus
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
                            placeholder="부서명을 입력해주세요."
                            autofocus
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        직함
                    </th>
                    <td>
                        <VInput
                            v-model:value="position"
                            placeholder="직함을 입력해주세요."
                            autofocus
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        회사 연락처
                    </th>
                    <td>
                        <VInput
                            v-model:value="companyTelNumber"
                            placeholder="회사 연락처를 입력해주세요."
                            autofocus
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        개인 연락처
                    </th>
                    <td>
                        <VInput
                            v-model:value="personalTelNumber"
                            placeholder="개인 연락처를 입력해주세요."
                            autofocus
                            class="pull"
                        />
                    </td>
                </tr>
            </VTable>
            <VCheck
                v-model:checked="isConsent"
                class="flex-r mt-13"
            >
                개인정보 수집 및 이용에 동의합니다.
            </VCheck>
        </form>
        <div class="flex-bet mt-12">
            <VBtn
                :kind="ButtonType.Cancel"
                @click="onCancelClick"
            >
                취소
            </VBtn>
            <VBtn @click="onSubmit">
                회원가입 신청
            </VBtn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { ButtonType, RouterName } from '@/mappings/enum';

// router
const router = useRouter();

// state
const isConsent = ref<boolean>(false);

// validate
const validationSchema = yup.object({
    email: yup.string()
        .required('이메일을 입력해주세요.')
        .email('이메일은 이메일 형식으로 \'@\'를 포함하여 입력해주세요.'),
    password: yup.string()
        .required('비밀번호를 입력해주세요.'),
    password2: yup.string()
        .required('비밀번호 확인을 입력해주세요.'),
    agencyName: yup.string()
        .required('소속을 선택해주세요.'),
    name: yup.string()
        .required('아이디를 입력해주세요.'),
    dept: yup.string(),
    position: yup.string()
        .required('이메일을 입력해주세요.'),
    companyTelNumber: yup.string(),
    personalTelNumber: yup.string(),
});
const { defineField, submitCount } = useForm({ validationSchema: toTypedSchema(validationSchema) });
const [email] = defineField('name', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [password] = defineField('password', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [password2] = defineField('password2', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [agencyName] = defineField('agencyName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [name] = defineField('name', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [dept] = defineField('dept', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [position] = defineField('position', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [companyTelNumber] = defineField('companyTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [personalTelNumber] = defineField('personalTelNumber', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
const onSubmit = () => console.log('submit');

const onCancelClick = () => router.push({ name: RouterName.Login });
</script>
