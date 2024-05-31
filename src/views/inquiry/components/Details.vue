<template>
    <VCell class="top">
        <div class="name-box">
            <p>{{ item.companyName }}</p>
        </div>
        <div class="util-box">
            <p>{{ date }}</p>
            <VBtn
                :kind="ButtonType.Sub"
                @click="onClickModal"
                class="ml-auto mr-14"
            >
                담당자 지정
            </VBtn>
            <VBtn
                v-if="item.inquiryManagerName"
                class="active"
            >
                담당 {{ item.inquiryManagerName }}
            </VBtn>
            <VBtn v-else>
                내가 담당하기
            </VBtn>
        </div>
    </VCell>
    <VCell>
        <div class="contents">
            <VGrid
                class="h-100"
                :cols="2"
                :colsWidth="['auto', 240]"
            >
                <VCell class="flex-col">
                    <VTitle
                        sub
                        class="mb-12"
                    >
                        문의자 정보
                        <template #button>
                            <VBtn :kind="ButtonType.Cancel">
                                문의 보류
                            </VBtn>
                        </template>
                    </VTitle>
                    <VTable
                        hori
                        class="mb-12"
                    >
                        <template #col>
                            <col width="16%" />
                            <col width="34%" />
                            <col width="16%" />
                            <col width="34%" />
                        </template>
                        <tr>
                            <th>담당자명</th>
                            <td>{{ item.inquirerName || 'ㅡ' }}</td>
                            <th>유입경로</th>
                            <td>{{ item.inquiryPath || 'ㅡ' }}</td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>{{ item.email || 'ㅡ' }}</td>
                            <th>연락처</th>
                            <td>{{ item.contactNumber || 'ㅡ' }}</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colspan="3">
                                {{ item.address || 'ㅡ' }}
                            </td>
                        </tr>
                        <tr>
                            <th>회사 홈페이지</th>
                            <td>{{ item.homepage || 'ㅡ' }}</td>
                            <th>주요 사업분야</th>
                            <td>{{ item.primaryBusiness || 'ㅡ' }}</td>
                        </tr>
                    </VTable>
                    <div
                        class="message-box"
                        v-html="inquierMsg"
                    />
                </VCell>
                <VCell class="flex-col">
                    <VTitle
                        sub
                        class="mb-12"
                    >
                        메모
                    </VTitle>
                    <VInfiniteScroll :maxHeight="memoMaxHeight">
                        <div
                            class="memo-box"
                            v-for="({ text, createdUserName, createdDateTime }, index) in item.inquiryMemoList"
                            :key="`memo${index}`"
                        >
                            <div class="memo-top">
                                <p>{{ createdUserName }}</p>
                                <i
                                    class="fa-sharp fa-regular fa-trash-xmark"
                                    @click="onDeleteClick"
                                />
                            </div>
                            <p class="date">
                                {{ createdDateTime }}
                            </p>
                            <p class="memo">
                                {{ text }}
                            </p>
                        </div>
                    </VInfiniteScroll>
                    <div class="memo-input">
                        <textarea
                            ref="textarea"
                            v-model="memo"
                            :style="{ maxHeight: '112px' }"
                        />
                        <button
                            type="button"
                            @click="onClickMemo"
                        >
                            <i class="fa-sharp fa-solid fa-arrow-up" />
                        </button>
                    </div>
                </VCell>
            </VGrid>
        </div>
    </VCell>
</template>

<script lang="ts">
import type { InquiryInfo } from '@/api/inquiry/interface';

// type
export type Props = {
    item?: InquiryInfo;
};

export type Emits = {
    onOpenModal: [];
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { useTextareaAutosize, useParentElement, useElementBounding } from '@vueuse/core';

import { ButtonType } from '@/mappings/enum';

import dayjs from 'dayjs';

// props
const { item } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// model
/** 현재 입력 값 */
const memo = defineModel<string>('memo');

// global
const { textarea } = useTextareaAutosize({ watch: memo });
const wrapper = useParentElement(textarea);
const { height: wrapperHeight } = useElementBounding(wrapper);

// computed
const date = computed(() => dayjs(item.regDtcreatedDate)
    .format('YYYY.MM.DD HH:MM'));
const inquierMsg = computed(() => item.inquiryMessage?.replace('\n', '<br />') || 'ㅡ');

const memoMaxHeight = computed(() => 611 - wrapperHeight.value);

// event
const onDeleteClick = () => console.log('삭제');

const onClickModal = () => emit('onOpenModal');

const onClickMemo = () => {
    console.log('메모 등록');
};
</script>
