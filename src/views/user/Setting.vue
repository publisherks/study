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
                        직급
                    </th>
                    <td>
                        <VSelect
                            v-model:value="position"
                            v-bind="positionProps"
                            :options="positions"
                            placeholder="직급을 선택해주세요."
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
                            v-bind="isUsedProps"
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
                :disabled="isLoadingRegist || isLoadingModify || isSubmitting"
            >
                {{ type }}
            </VBtn>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { HistoryState } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { requestCodeList } from '@/api/code';
import { requestUserInfo, requestRegistUser, requestModifyUser } from '@/api/user';

import useEvent from '@/global/useEvent';

import { RouterName, ButtonType, Code } from '@/mappings/enum';
import { uses } from '@/mappings/option';

import useMessageStore from '@/stores/message';

// router
const route = useRoute();
const router = useRouter();
const historyState: HistoryState = history.state;

// variable
/** idx */
const idx = route.params.idx ? Number(route.params.idx) : 0;

// global
const { onResponse } = useEvent();
const { state: responsePartnames } = useAsyncState(() => requestCodeList({ parentCode: Code.Partname }), {}, { onSuccess: onResponse });
const { state: responsePositions } = useAsyncState(() => requestCodeList({ parentCode: Code.Position }), {}, { onSuccess: onResponse });
const { execute: requestTeams, state: responseTeams } = useAsyncState(requestCodeList, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const { execute: requestInfo } = useAsyncState(() => requestUserInfo(idx), {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        isShowBackOnError: true,
        success: () => setValues(response.data as NonNullable<typeof response.data>),
    }),
});
const { execute: requestRegist, isLoading: isLoadingRegist } = useAsyncState(requestRegistUser, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { success: showList }),
});
const { execute: requestModify, isLoading: isLoadingModify } = useAsyncState((data) => requestModifyUser(idx, data), {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { success: showList }),
});

// store
/** 메시지 */
const messageStore = useMessageStore();

// computed
/** 수정 여부 */
const isModify = computed(() => Boolean(idx));
/** 부서명 목록 */
const partnames = computed(() => (responsePartnames.value.data?.results ?? []).map(({ code, name }) => ({
    label: name,
    value: code,
})));
/** 직급 목록 */
const positions = computed(() => (responsePositions.value.data?.results ?? []).map(({ code, name }) => ({
    label: name,
    value: code,
})));
/** 팀명 목록 */
const teams = computed(() => (responseTeams.value.data?.results ?? []).map(({ code, name }) => ({
    label: name,
    value: code,
})));
/** 등록/수정 구분 */
const type = computed(() => isModify.value ? '수정' : '등록');

// validate
const validationSchema = yup.object({
    name: yup.string()
        .required('이름을 입력해주세요.'),
    position: yup.string()
        .required('직급을 입력해주세요.'),
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
const [isUsed, isUsedProps] = defineField('isUsed', { props: ({ errors }) => ({ invalid: Boolean(submitCount.value && errors.length) }) });

// methods
/**
 * 목록 화면 표시
 */
const showList = () => router.push({
    name: RouterName.UserList,
    state: historyState,
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
watch(isModify, (isModify) => {
    // 수정 시
    if (isModify) {
        // 정보 조회 요청
        requestInfo();
    }
}, { immediate: true });
watch(partname, (parentCode) => {
    // 팀명 목록 검색 요청
    requestTeams(0, { parentCode });
});
</script>
