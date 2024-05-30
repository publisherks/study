<!-- 지도 위젯 -->
<template>
    <div
        ref="mapElement"
        class="map"
    />
    <div
        v-show="isInitPopup"
        ref="popupElement"
    >
        팝업 테스트
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { isDefined } from '@vueuse/core';
import L from 'leaflet';

import type { NullableHTMLElement } from '@/mappings/types/common';

// refs
const mapElement = ref<NullableHTMLElement<HTMLDivElement>>(null);
const popupElement = ref<NullableHTMLElement<HTMLDivElement>>(null);

// state
/** 팝업 초기 설정 여부 */
const isInitPopup = ref<boolean>(false);

// methods
/**
 * 초기 설정
 */
const init = () => {
    if (!isDefined(mapElement) || !isDefined(popupElement)) {
        return;
    }

    const map = L.map(mapElement.value, {
        center: [0, 10],
        zoom: 3,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
        minZoom: 3,
    })
        .addTo(map);
    L.marker([37.3722, 126.9494])
        .addTo(map)
        .bindPopup(popupElement.value)
        .on('click', () => {
            isInitPopup.value = true;
        });
};

// lifecycle
onMounted(async () => {
    await nextTick();
    init();
});
</script>

<style lang="scss" scoped>
.map { height: 100% }
</style>
