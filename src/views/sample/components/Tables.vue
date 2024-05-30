<!--
    Table 컴포넌트

    1. props (* : 필수)
    1) fixed (boolean) : <thead>(수평인 경우 첫번째 <th>) 고정 여부 (default : false)
    2) hori (boolean) : 수평 여부 (default : false)

    2. slots
    1) <template #col> : <colgroup> 하위 내용
    2) <template #head> : <thead> 하위 내용 (<tr> 자동 추가)
    3) default : <tbody> 하위 내용

    3. class
    1) <th>
    - required : 필수 여부

    2) <tr> (하위가 <td>인 <tr>)
    - select : 선택
    - unuse : 미사용

    3) <td>
    - al-r : 우측 정렬
-->
<template>
    <VTable class="mb-30">
        <!--
            col width 정의
            체크박스 = 40px
            번호 = 60px
            사용 여부 = 80px
            등록일(날짜) = 120px

            관리
            버튼 1개 = 90px
            버튼 2개 = 180px
        -->
        <template #col>
            <col width="40px" />
            <col width="60px" />
            <col width="7%" />
            <col width="10%" />
            <col width="*" />
            <col width="12%" />
            <col width="14%" />
            <col width="12%" />
            <col width="80px" />
            <col width="180px" />
        </template>
        <template #head>
            <th>
                <VCheck
                    :checked="isAllCheck"
                    @update:checked="onChangeAllCheck"
                />
            </th>
            <th>No.</th>
            <th>이름</th>
            <th>직급</th>
            <th>부서명</th>
            <th>팀명</th>
            <th>이메일</th>
            <th>연락처</th>
            <th>사용 여부</th>
            <th>관리</th>
        </template>
        <tr v-show="!totalUsers">
            <td colspan="8">
                {{ isLoadingUsers ? '데이터를 불러오는 중입니다.' : (responseUsers.message || '검색 결과가 없습니다.') }}
            </td>
        </tr>
        <tr
            v-for="(value) in users"
            :key="`users${value.idx}`"
            :class="{
                select: checks.includes(value.idx),
                unuse: !value.isUsed,
            }"
        >
            <td>
                <VCheck
                    :checked="checks.includes(value.idx)"
                    @update:checked="onChangeCheck(value.idx, $event)"
                />
            </td>
            <td>{{ value.idx }}</td>
            <td>{{ value.name || 'ㅡ' }}</td>
            <td>{{ value.position || 'ㅡ' }}</td>
            <td>{{ value.partname || 'ㅡ' }}</td>
            <td>{{ value.team || 'ㅡ' }}</td>
            <td>{{ value.email || 'ㅡ' }}</td>
            <td>{{ value.tel || 'ㅡ' }}</td>
            <td>{{ getLabelByValue(uses, value.isUsed) }}</td>
            <td>
                <VBtn
                    :kind="ButtonType.Sub1"
                    table
                    class="mr-10"
                    @click="onClickModify(value)"
                >
                    수정
                </VBtn>
                <VBtn
                    :kind="ButtonType.Delete"
                    table
                >
                    삭제
                </VBtn>
            </td>
        </tr>
    </VTable>
    <VPagination
        v-model:page="searchUsers.page"
        :limit="searchUsers.size"
        :total="totalUsers"
        class="mb-30"
    />

    <VTable
        hori
        class="mb-30"
    >
        <template #col>
            <col width="10%" />
            <col width="23.3%" />
            <col width="10%" />
            <col width="23.3%" />
            <col width="10%" />
            <col width="23.4%" />
        </template>
        <tr>
            <th class="required">
                이름
            </th>
            <td>
                <div class="flex">
                    <VInput
                        v-model:value="inputs[0]"
                        class="pull"
                    />
                    <VBtn
                        :kind="ButtonType.Sub1"
                        class="ml-10"
                    >
                        중복확인
                    </VBtn>
                </div>
            </td>
            <th>직급</th>
            <td>
                <p>{{ info?.position || 'ㅡ' }}</p>
            </td>
            <th>부서명</th>
            <td>
                <div class="flex">
                    <VInput
                        v-model:value="inputs[1]"
                        class="pull"
                    />
                </div>
            </td>
        </tr>
        <tr>
            <th>팀명</th>
            <td>
                <p>{{ info?.team || 'ㅡ' }}</p>
            </td>
            <th>이메일</th>
            <td>
                <p>{{ info?.email || 'ㅡ' }}</p>
            </td>
            <th>연락처</th>
            <td>
                <p>{{ info?.tel || 'ㅡ' }}</p>
            </td>
        </tr>
    </VTable>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useAsyncState } from '@vueuse/core';

import { requestUserList } from '@/api/user';
import type { RequestUserList } from '@/api/user/interface';

import useEvent from '@/global/useEvent';
import useSelectOption from '@/global/useSelectOption';

import { ButtonType } from '@/mappings/enum';
import { uses } from '@/mappings/option';
import type { InputValue, SearchList } from '@/mappings/types/common';

// global
const { onResponse } = useEvent();
const { execute: requestUsers, isLoading: isLoadingUsers, state: responseUsers } = useAsyncState(requestUserList, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { isShowMessage: false }),
});
const { getLabelByValue } = useSelectOption();

// state
/** 체크 목록 */
const checks = ref<number[]>([]);
/** 정보 */
const info = ref<typeof users.value[number]>();
/** 입력 값 목록 */
const inputs = ref<InputValue[]>([]);
/** 계정 목록 검색 조건 */
const searchUsers: SearchList<RequestUserList> = reactive({
    /** 현재 페이지 번호 */
    page: 1,

    /** 페이지당 표시할 항목 수 */
    size: 10,
});

// computed
/** 전체 체크 여부 */
const isAllCheck = computed(() => Boolean(users.value.length && users.value.length === checks.value.length));
/** 계정 목록 총 항목 수 */
const totalUsers = computed(() => (responseUsers.value.data?.totalCount ?? 0));
/** 계정 목록 */
const users = computed(() => (responseUsers.value.data?.results ?? []));

// methods
/**
 * 목록 검색 요청
 */
const requestList = () => requestUsers(0, {
    ...searchUsers,
    page: (searchUsers.page - 1),
});

// event
/**
 * 전체 체크 여부 변경 시
 * @param checked 전체 체크 여부
 */
const onChangeAllCheck = (checked: boolean) => {
    checks.value = checked ? users.value.map(({ idx }) => idx) : [];
};

/**
 * 체크 여부 변경 시
 * @param value 값
 * @param checked 체크 여부
 */
const onChangeCheck = (value: typeof users.value[number]['idx'], checked: boolean) => {
    if (checked) {
        checks.value.push(value);

        return;
    }

    checks.value = checks.value.filter((checked) => (value !== checked));
};

/**
 * 수정 클릭 시
 * @param value 값
 */
const onClickModify = (value: typeof users.value[number]) => {
    info.value = value;
    inputs.value = [value.name, value.partname];
};

// watch
watch(() => searchUsers.page, requestList, { immediate: true });
watch(users, () => {
    // 계정 목록 변경 시 체크 목록 초기화
    checks.value = [];
}, { deep: true });
</script>
