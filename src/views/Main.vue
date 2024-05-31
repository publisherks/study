<!-- 메인 -->
<template>
    <h1 class="font30">
        Hello
        <span
            ref="spanElement"
            class="font45"
            @click="onClick"
        >
            FE
        </span>
        World
    </h1>
</template>

<!-- NOTE: script setup 샘플 -->
<script setup lang="ts">
/* eslint-disable */
/* 1. import */
import { ref, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import useSlots from '@/global/useSlots';

import useLoadingStore from '@/stores/loading';
import useMessageStore from '@/stores/message';

/* 2. type */
/** props */
type Props = { value?: string };
/** emits */
type Emits = { 'update:value': [value: Props['value']] };
/** state */
type ObjectState = {
    aaa: string;
    bbb: number;
    ccc: boolean;
};

/* 3. variable */
const abc = 'abc';

/* 4. router */
const route = useRoute();
const router = useRouter();

/* 5. props */
const { value = 'Hello FE World' } = defineProps<Props>();

/* 6. emits */
const emit = defineEmits<Emits>();

/* 7. refs */
const spanElement = ref<HTMLSpanElement>();

/* 8. global */
const { hasSlots } = useSlots();

/* 9. store */
const { isShow } = storeToRefs(useLoadingStore());
/** 메시지 */
const messageStore = useMessageStore();

/* 10. state */
/** ref 상태 */
const state = ref<string>(abc);
/** reactive(객체) 상태 */
const objectState: ObjectState = reactive({
    aaa: abc,
    bbb: 0,
    ccc: true,
});

/* 11. computed */
const computedExample = computed(() => `${state.value} : ${objectState.aaa}-${objectState.bbb}-${objectState.ccc}`);

/* 12. methods */
/**
 * ref 상태 설정
 * @param value 값
 */
const setState = (value: string) => {
    state.value = value;
};

/**
 * reactive(객체) 상태 설정
 * @param value 값
 */
const setAAA = (value: ObjectState['aaa']) => {
    objectState.aaa = value;
};

/* 13. event */
/**
 * 클릭 시
 * @param e 이벤트 정보
 */
const onClick = (e: MouseEvent) => console.log(e);

/* 14. watch */
// https://ko.vuejs.org/api/reactivity-core.html#watch
watch(() => route.fullPath, (value) => console.log(value));

/* 15. expose */
// NOTE: 상위 컴포넌트에서 하위 컴포넌트에 ref 속성을 지정하면 해당 ref 값에서 defineExpose로 전달한 값을 가져올 수 있음
// https://ko.vuejs.org/api/sfc-script-setup.html#defineexpose
defineExpose({ spanElement });

/* 16. lifecycle */
// https://ko.vuejs.org/api/composition-api-lifecycle.html
console.log('created');
onBeforeMount(() => console.log('onBeforeMount'));
onMounted(async () => {
    console.log('onMounted');

    // https://ko.vuejs.org/api/general.html#nexttick
    await nextTick();

    console.log('nextTick');
});
onBeforeUpdate(() => console.log('onBeforeUpdate'));
onUpdated(() => console.log('onUpdated'));
onBeforeUnmount(() => console.log('onBeforeUnmount'));
onUnmounted(() => console.log('onUnmounted'));
</script>

<style lang="scss" scoped>
h1 { color: var(--white) }
</style>
