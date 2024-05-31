<!-- 커스텀 대시보드 -->
<template>
    <VStage
        ref="stage"
        :config="{
            width,
            height,
        }"
        @mousedown="onMouseDown"
    >
        <VLayer>
            <VImage
                :config="{
                    image,
                    width,
                    height,
                    draggable: true,
                }"
            />
            <VLine
                :config="{
                    points: [
                        0,
                        0,
                        30,
                        0,
                        15,
                        30,
                    ],
                    closed: true,
                    fillLinearGradientStartPoint: {
                        x: -50,
                        y: -50,
                    },
                    fillLinearGradientEndPoint: {
                        x: 50,
                        y: 50,
                    },
                    fillLinearGradientColorStops: [
                        0,
                        'red',
                        1,
                        'yellow',
                    ],
                    stroke: 'black',
                    x: 180,
                    y: 225,
                    draggable: true,
                }"
            />
            <VTransformer ref="transformer" />
        </VLayer>
    </VStage>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { unrefElement } from '@vueuse/core';

import bgWidget from '@/assets/images/bg-widget.png';

// refs
const stage = ref();
const transformer = ref();

// state
/** 이미지 */
const image = ref<HTMLImageElement>();
/** 너비 */
const width = ref<number>(0);
/** 높이 */
const height = ref<number>(0);

// methods
/**
 * 이미지 초기 설정
 */
const initImage = () => {
    const img = new Image();

    Object.assign(img, {
        src: bgWidget,
        onload() {
            image.value = img;
        },
    });
};

/**
 * 크기 초기 설정
 */
const initSize = () => {
    const { offsetWidth = 0, offsetHeight = 0 } = (unrefElement(stage).parentNode ?? {});

    width.value = (offsetWidth - 60);
    height.value = (offsetHeight - 75);
};

// event
/**
 * 클릭 시
 * @param event 이벤트 정보
 */
const onMouseDown = (event: MouseEvent) => {
    const currentTarget = event.target as HTMLElement;
    const { className } = currentTarget;

    if (className === 'Rect') {
        return;
    }

    const nodes = [];
    const validNodes = ['Image', 'Line'];

    if (validNodes.includes(className)) {
        nodes.push(currentTarget);
    }

    transformer.value.getNode()
        .nodes(nodes);
};

// lifecycle
initImage();
onMounted(async () => {
    await nextTick();
    initSize();
});
</script>
