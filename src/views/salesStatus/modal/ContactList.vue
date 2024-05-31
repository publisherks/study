<!-- 연락처 목록 모달 -->
<template>
    <VModal>
        <template #top>
            연락처 목록
        </template>
        <VTitle
            sub
            class="mb-12"
        >
            {{ clientName }}
        </VTitle>
        <VInfiniteScroll :maxHeight="480">
            <div
                class="contact-box"
                v-for="(item, index) in datas"
                :key="`${clientName}_contact${index}`"
            >
                <div class="contact-top">
                    <strong>{{ item?.contactName }}</strong>
                    <span>{{ item?.dept }}</span>
                </div>
                <ul>
                    <li
                        v-for="sales in item?.clientContactSalesSimpleDtoList"
                        :key="sales.salesName"
                    >
                        <p
                            class="link-text"
                            @click="onSalesClick(sales.salesSeq)"
                        >
                            {{ sales.salesName }}
                        </p>
                    </li>
                </ul>
                <div class="contact-info">
                    <p>연락처<strong>{{ item?.personalTelNumber }}</strong></p>
                    <p>이메일<strong>{{ item?.email }}</strong></p>
                </div>
            </div>
        </VInfiniteScroll>
        <template #bottom>
            <VBtn @click="emit('hide')">
                확인
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
import type { ContactInfo } from '@/api/client/interface';

// type
export type Props = {
    clientName: string;
    datas?: ContactInfo;
};

export type Emits = {
    /** 모달 숨김 */
    hide: [];
};
</script>
<script setup lang="ts">
// props
const { datas } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// event
const onSalesClick = (index: ContactInfo['clientContactSalesSimpleDtoList']['salesSeq']) => {
    console.log(index);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/contactBox";
</style>
