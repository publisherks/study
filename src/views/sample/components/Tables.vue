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
            <col width="200px" />
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
            <th>직책</th>
            <th>부서명</th>
            <th>팀명</th>
            <th>이메일</th>
            <th>연락처</th>
            <th>사용 여부</th>
            <th>관리</th>
        </template>
        <tr
            v-for="(value, index) in datas"
            :key="`datas.${value.email}`"
            :class="{
                select: checks.includes(index),
                unuse: !value.isUsed,
            }"
        >
            <td>
                <VCheck
                    :checked="checks.includes(index)"
                    @update:checked="onChangeCheck(index, $event)"
                />
            </td>
            <td>{{ users.length - index }}</td>
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
        v-model:page="page"
        :limit="limit"
        :total="users.length"
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
            <th>직책</th>
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
import { ref, computed } from 'vue';

import useSelectOption from '@/global/useSelectOption';

import { ButtonType } from '@/mappings/enum';
import users from '@/mappings/json/users.json';
import { uses } from '@/mappings/option';
import type { InputValue } from '@/mappings/types/common';

// global
const { getLabelByValue } = useSelectOption();

// state
/** 체크 목록 */
const checks = ref<number[]>([]);
/** 정보 */
const info = ref<typeof users[0]>(users[0]);
/** 입력 값 목록 */
const inputs = ref<InputValue[]>([users[0].name, users[0].partname]);
/** 페이지당 표시할 항목 수 */
const limit = ref<number>(4);
/** 현재 페이지 번호 */
const page = ref<number>(1);

// computed
/** 목록 */
const datas = computed(() => {
    const start = ((page.value - 1) * limit.value);
    const end = (start + limit.value);

    return users.slice(start, end);
});
/** 전체 체크 여부 */
const isAllCheck = computed(() => Boolean(users.length && users.length === checks.value.length));

// event
/**
 * 전체 체크 여부 변경 시
 * @param checked 전체 체크 여부
 */
const onChangeAllCheck = (checked: boolean) => {
    checks.value = checked ? users.map((value, index) => index) : [];
};

/**
 * 체크 여부 변경 시
 * @param value 값
 * @param checked 체크 여부
 */
const onChangeCheck = (value: number, checked: boolean) => {
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
const onClickModify = (value: typeof users[0]) => {
    info.value = value;
    inputs.value = [value.name, value.partname];
};
</script>
