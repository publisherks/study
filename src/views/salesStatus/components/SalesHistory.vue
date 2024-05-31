<template>
    <div class="history-wrap">
        <HistoryBox
            :datas="inquierData"
            class="inquiry"
        />
        <template
            v-for="item in datas"
            :key="`sales${item.seq}`"
        >
            <HistoryBox
                :datas="item"
                @delete="onHistoryDelete($event)"
            />
            <template v-if="!isEmpty(item.data)">
                <HistoryBox
                    v-for="(child, index) in item.data"
                    :key="`sales${child.seq}`"
                    :datas="child"
                    type="sub"
                    :lastchild="index === item.data.length - 1"
                    @delete="onHistoryDelete($event)"
                />
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import type { SalesDetail } from '@/api/sales/interface';

// type
export type Props = {
    data?: [SalesDetail['salesStatusHistoryDtoList']];
};
</script>
<script setup lang="ts">
/* eslint-disable */
import { computed } from 'vue';

import isEmpty from '@/utils/isEmpty';

import useMessageStore from '@/stores/message';

import HistoryBox from '@/views/salesStatus/components/HistoryBox.vue';


// props
const { data } = defineProps<Props>();

// store
const messageStore = useMessageStore();

// variable
const inquierData = {
    salesStatus: 'INQUIRY',
    createDate: '2017-03-20 09:16:54',
    msg: `안녕하세요 저는 울랄라랩 웍스의 센터장 김고객이라고 합니다.\r\n메일로 우선 인사드리는 점 양해 드립니다.\r\n서울시에서 준비하는 사업에 당사가 AI인공지능 플랫폼 개발자 양성 과정에\r\n선정이 되어 진행을 준비하고 있고, 만들고 있습니다.\r\n\r\n이번 개발자 양성과정은 전국 굴지의 택배시스템을 개발하신\r\n창업개발자님과 청년사관학교 딥러닝과정을 주관하신 강사님,\r\n이와 같이 문의드립니다.`,
}

// computed
const datas = computed(() => {
    const childseqs = data?.filter(({ statusSeqGroup }) => statusSeqGroup).flatMap(({ statusSeqGroup }) => statusSeqGroup);
    
    return data?.map((item, _, arr) => {
        const data = arr.filter(({ seq }) => item.statusSeqGroup?.includes(seq));
        return {
            ...item,
            data,
        };
    }).filter(({ seq }) => !childseqs?.includes(seq));
});

// event
const onInquiryClick = () => {
    console.log('해당 문의로 이동');
}

const onHistoryDelete = (seq: SalesDetail['seq'] ) => messageStore.$patch({
    isShow: true,
    isConfirm: true,
    message: '해당 메모를 삭제하시겠습니까?',
    callback: {
        ok() {
            alert(`${seq} 삭제`);
        },
    },
});
</script>