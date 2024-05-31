<!-- 위젯 대시보드 -->
<template>
    <div class="grid-stack">
        <div
            v-for="({ x, y, w, h, type }) in widgets"
            :key="`widgets.${x}-${y}`"
            class="grid-stack-item"
            :gs-x="x"
            :gs-y="y"
            :gs-w="w"
            :gs-h="h"
        >
            <div class="grid-stack-item-content">
                <component :is="getWidget(type)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue';
import type { Component } from 'vue';
import { GridStack } from 'gridstack';
import type { GridStackWidget } from 'gridstack';

import type { KeyValuePair } from '@/mappings/types/common';

// type
type Widget = GridStackWidget & { type: string };

// components
const WidgetMap = defineAsyncComponent(() => import('@/components/widget/Map.vue'));
const WidgetSample = defineAsyncComponent(() => import('@/components/widget/Sample.vue'));

// state
/** 위젯 목록 */
const widgets = ref<Widget[]>([
    {
        type: 'map',
        x: 0,
        y: 0,
        w: 12,
        h: 4,
    },
    {
        type: 'sample',
        x: 0,
        y: 4,
        w: 3,
        h: 2,
    },
    {
        type: 'sample',
        x: 3,
        y: 4,
        w: 3,
        h: 2,
    },
    {
        type: 'sample',
        x: 6,
        y: 4,
        w: 3,
        h: 2,
    },
    {
        type: 'sample',
        x: 9,
        y: 4,
        w: 3,
        h: 2,
    },
]);

// methods
/**
 * 위젯 컴포넌트 반환
 * @param type 구분
 */
const getWidget = (type: string) => {
    const widget: KeyValuePair<Component> = {
        map: WidgetMap,
        sample: WidgetSample,
    };

    return widget[type];
};

/**
 * 초기 설정
 */
const init = () => GridStack.init({
    disableDrag: true,
    disableResize: true,
    float: true,
});

// lifecycle
onMounted(init);
</script>

<style src="gridstack/dist/gridstack.min.css"></style>
<style src="leaflet/dist/leaflet.css"></style>
<style lang="scss" scoped>
@import "@/assets/scss/components/widget.scss";
</style>
