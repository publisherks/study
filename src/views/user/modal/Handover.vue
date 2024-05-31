<!-- 담당자 인수인계 모달 -->
<template>
    <VModal>
        <template #top>
            담당자 인수인계
        </template>
        <p class="message-text align-c mb-20">
            해당 사용자가 담당중이었던 영업들을<br />누구에게 인수인계 할까요?
        </p>
        <div class="flex-bet mb-20">
            <div class="handover-box">
                <strong>
                    문의
                    <span>17건</span>
                </strong>
            </div>
            <div class="handover-box">
                <strong>
                    영업
                    <span>35건</span>
                </strong>
            </div>
        </div>
        <div class="flex mb-12">
            <VInput
                v-model:value.trim="search.name"
                leftUnit
                search
                class="pull"
            />
            <VBtn
                :kind="ButtonType.Cancel"
                class="ml-10"
                @click="onSearch()"
            >
                검색
            </VBtn>
        </div>
        <VInfiniteScroll maxHeight="280">
            <VTable>
                <template #col>
                    <col width="40px" />
                    <col width="*" />
                </template>
                <tr
                    v-for="({ name, team }, index) in data"
                    :key="name"
                >
                    <td>
                        <VCheck
                            :checked="checks.name === name"
                            @update:checked="onChangeCheck(index, $event)"
                            :id="name"
                        />
                    </td>
                    <td>
                        <label
                            :for="name"
                            class="flex-l"
                        >{{ name }}<span class="ml-14">{{ team }}</span></label>
                    </td>
                </tr>
            </VTable>
        </VInfiniteScroll>
        <template #bottom>
            <VBtn
                :kind="ButtonType.Cancel"
                class="mr-10"
                @click="emit('hide')"
            >
                취소
            </VBtn>
            <VBtn @click="onSubmit">
                인수인계
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
import { ref, reactive } from 'vue';
import { onKeyStroke } from '@vueuse/core';

import { ButtonType } from '@/mappings/enum';

// emits
const emit = defineEmits<Emits>();

// state
/** 검색 조건 */
const search: any = reactive({
    name: '',
});
/** 체크 목록 */
const checks = ref<any>({});
/** 임시 데이터 */
const data = ref<any>([
    {
        name: '김담당',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당2',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당3',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당4',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당5',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당6',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당7',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당8',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당9',
        team: 'ulalaLAB 영업팀',
    },
    {
        name: '김담당10',
        team: 'ulalaLAB 영업팀',
    },
]);

// event
/**
 * 체크 여부 변경 시
 * @param value 값
 * @param checked 체크 여부
 */
const onChangeCheck = (value: number, checked: boolean) => {
    if (checked) {
        checks.value = data.value[value];

        return;
    }

    checks.value = {};
};
/**
 * 설정
 */
const onSubmit = () => console.log('submit');

/**
 * 검색
 */
const onSearch = () => console.log('search');

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/modal/handover";
</style>
