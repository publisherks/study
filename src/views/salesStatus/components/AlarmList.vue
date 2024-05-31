<template>
    <VInfiniteScroll
        class="alarm-list"
        maxHeight="618"
    >
        <div
            v-for="({ time, content }, index) in alarmList"
            :key="`alarm${index}`"
            class="alarm-box"
        >
            <p class="con">
                {{ content }}
            </p>
            <p class="time">
                {{ time }}
            </p>
        </div>
    </VInfiniteScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// state
/** 알람 목록 */
const alarmList = ref<any>([
    {
        time: '2023-10-10 15:52',
        content: '한화파워시스템 고객의 신규문의가 등록되었습니다. 확인해주세요.',
    },
    {
        time: '2023-10-10 15:52',
        content: '2023-09-15 12:32 에 등록된 오스티엘리베이터 고객의 문의 담당자로 배정되셨습니다. 확인해 주세요.',
    },
    {
        time: '2023-10-10 15:52',
        content: '000 님이 회원가입 승인을 신청하셨습니다. 가입 승인을 검토해 주세요.',
    },
    {
        time: '2023-10-10 15:52',
        content: '한화파워시스템 고객의 신규문의가 등록되었습니다. 확인해주세요.',
    },
    {
        time: '2023-10-10 15:52',
        content: '2023-09-15 12:32 에 등록된 오스티엘리베이터 고객의 문의 담당자로 배정되셨습니다. 확인해 주세요.',
    },
    {
        time: '2023-10-10 15:52',
        content: '000 님이 회원가입 승인을 신청하셨습니다. 가입 승인을 검토해 주세요.',
    },
]);
</script>
