<!-- 계정 설정 -->
<template>
    <VTitle class="mb-12">
        계정 정보
    </VTitle>
    <form @submit.prevent="onSubmit">
        <div class="contents">
            <VTable
                hori
                class="mb-30"
            >
                <template #col>
                    <col width="10%" />
                    <col width="40%" />
                    <col width="10%" />
                    <col width="40%" />
                </template>
                <tr>
                    <th class="required">
                        이름
                    </th>
                    <td>
                        <VInput
                            v-model:value="name"
                            v-bind="nameProps"
                            autofocus
                            class="pull"
                        />
                    </td>
                    <th class="required">
                        직책
                    </th>
                    <td>
                        <VSelect
                            v-model:value="position"
                            v-bind="positionProps"
                            :options="positions"
                            placeholder="직책을 선택해주세요."
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        부서명
                    </th>
                    <td>
                        <VSelect
                            v-model:value="partname"
                            v-bind="partnameProps"
                            :options="partnames"
                            placeholder="부서명을 선택해주세요."
                            class="pull"
                        />
                    </td>
                    <th>팀명</th>
                    <td>
                        <VSelect
                            v-model:value="team"
                            v-bind="teamProps"
                            :options="teams"
                            placeholder="팀명을 선택해주세요."
                            :disabled="!partname"
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="required">
                        이메일
                    </th>
                    <td colspan="3">
                        <VInput
                            v-model:value="email"
                            v-bind="emailProps"
                            class="pull"
                        />
                    </td>
                </tr>
                <tr>
                    <th>연락처</th>
                    <td>
                        <VInput
                            v-model:value="tel"
                            v-bind="telProps"
                            type="tel"
                            class="pull"
                        />
                    </td>
                    <th class="required">
                        사용 여부
                    </th>
                    <td>
                        <VRadioGroup
                            v-model:value="isUsed"
                            :radios="uses"
                        />
                    </td>
                </tr>
            </VTable>
        </div>
        <div className="btn-wrap flex-c mt-40">
            <VBtn
                :kind="ButtonType.Sub1"
                class="mr-10"
                @click="onClickCancel"
            >
                취소
            </VBtn>
            <VBtn
                type="submit"
                :disabled="isSubmitting || isLoadingRegist || isLoadingModify"
            >
                {{ type }}
            </VBtn>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestUserInfo, requestRegistUser, requestModifyUser } from '@/api/user';

import useEvent from '@/global/useEvent';

import { RouterName, ButtonType } from '@/mappings/enum';
import partnames from '@/mappings/json/partnames.json';
import positions from '@/mappings/json/positions.json';
import dataLakeTeams from '@/mappings/json/team/dataLakes.json';
import platformDevelopTeams from '@/mappings/json/team/platformDevelops.json';
import { uses } from '@/mappings/option';
import type { Option } from '@/mappings/types/common';

import useMessageStore from '@/stores/message';

// router
const route = useRoute();
const router = useRouter();
const { state } = history;

// global
const { onResponse } = useEvent();
const { execute: requestInfo } = useAsyncState(async () => await requestUserInfo(Number(route.params.idx)), {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        isShowBackOnError: true,
        success() {
            const { data } = response;

            if (data) {
                setValues(data);
            }
        },
    }),
});
const { execute: requestRegist, isLoading: isLoadingRegist } = useAsyncState(requestRegistUser, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { success: showList }),
});
const { execute: requestModify, isLoading: isLoadingModify } = useAsyncState(async (data) => await requestModifyUser(Number(route.params.idx), data), {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { success: showList }),
});

// store
/** 메시지 */
const messageStore = useMessageStore();

// computed
/** 수정 여부 */
const isModify = computed(() => Boolean(route.params.idx));
/** 팀명 목록 */
const teams = computed(() => {
    let teams: Option<string>[] = [];

    switch (partname.value) {
        case '데이터레이크사업부':
            teams = dataLakeTeams;

            break;

        case '플랫폼개발사업부':
            teams = platformDevelopTeams;

            break;
    }

    return teams.sort(({ label: a }, { label: b }) => (a > b) ? 1 : (a < b) ? -1 : 0);
});
/** 등록/수정 구분 */
const type = computed(() => isModify.value ? '수정' : '등록');

// validate
const validationSchema = yup.object({
    name: yup.string()
        .required('이름을 입력해주세요.'),
    position: yup.string()
        .required('직책을 입력해주세요.'),
    partname: yup.string()
        .required('부서명을 입력해주세요.'),
    team: yup.string(),
    email: yup.string()
        .required('이메일을 입력해주세요.')
        .email('이메일은 이메일 형식으로 \'@\'를 포함하여 입력해주세요.'),
    tel: yup.string(),
    isUsed: yup.boolean()
        .required(),
});
const { defineField, handleSubmit, isSubmitting, setValues, submitCount } = useForm({
    initialValues: { isUsed: true },
    validationSchema: toTypedSchema(validationSchema),
});
const [name, nameProps] = defineField('name', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [position, positionProps] = defineField('position', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [partname, partnameProps] = defineField('partname', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [team, teamProps] = defineField('team', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [email, emailProps] = defineField('email', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [tel, telProps] = defineField('tel', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [isUsed] = defineField('isUsed');

// methods
/**
 * 목록 화면 표시
 */
const showList = () => router.push({
    name: RouterName.UserList,
    state,
});

// event
/**
 * 취소 클릭 시
 */
const onClickCancel = () => showList();

/**
 * 설정
 */
const onSubmit = handleSubmit((values) => messageStore.$patch({
    isShow: true,
    title: type.value,
    message: isModify.value ? '변경하신 정보로 수정하시겠습니까?' : '입력하신 정보로 계정을 등록하시겠습니까?',
    isConfirm: true,
    buttonText: { ok: type.value },
    callback: {
        ok() {
            // 수정
            if (isModify.value) {
                requestModify(0, values);

                return;
            }

            // 등록
            requestRegist(0, values);
        },
    },
}));

// watch
watch(() => route.params.idx, (value) => {
    // 수정 시
    if (value) {
        // 정보 조회 요청
        requestInfo();
    }
}, { immediate: true });
</script>
