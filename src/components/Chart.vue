<!-- 차트 -->
<template>
    <div
        class="chart-box"
        :style
    >
        <div
            v-show="typeof legend === 'boolean' && legend"
            ref="legendElement"
        />
        <canvas ref="chartElement" />
    </div>
</template>

<script lang="ts">
import type { ChartConfiguration } from 'chart.js/auto';

import type { Nullable, NullableHTMLElement, Numeric } from '@/mappings/types/common';

import type { Options as LegendOptions } from '@/plugins/chart/legend';

// type
export type Props = Pick<ChartConfiguration, 'type'> & Pick<ChartConfiguration['data'], 'datasets' | 'labels'> & Partial<Pick<ChartConfiguration, 'options'>> & {
    /** 너비 */
    width?: Numeric;

    /** 높이 */
    height?: Numeric;

    /** 범례 */
    legend?: NullableHTMLElement | boolean;

    /** 범례 옵션 */
    legendOptions?: LegendOptions;
};
</script>
<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import type { CSSProperties } from 'vue';
import { isDefined } from '@vueuse/core';
import Chart from 'chart.js/auto';

import legendPlugin from '@/plugins/chart/legend';

import px from '@/utils/css/px';

// variable
let chart: Nullable<Chart> = null;

// props
const { type, datasets, labels, options, width, height = 200, legend, legendOptions } = defineProps<Props>();

// refs
const chartElement = ref<NullableHTMLElement<HTMLCanvasElement>>(null);
const legendElement = ref<NullableHTMLElement<HTMLDivElement>>(null);

// computed
/** 스타일 */
const style = computed(() => {
    const style: CSSProperties = { height: px(height) };

    if (typeof width !== 'undefined') {
        style.width = px(width);
    }

    return style;
});

// methods
/**
 * 차트 초기 설정
 */
const initChart = () => {
    if (!isDefined(chartElement)) {
        return;
    }

    const config: ChartConfiguration = {
        data: {
            datasets,
            labels,
        },
        options,
        type,
    };

    let legendEl: NullableHTMLElement = null;

    if (legend) {
        switch (typeof legend) {
            case 'boolean':
                if (isDefined(legendElement)) {
                    legendEl = legendElement.value;
                }

                break;

            default:
                legendEl = legend;
        }
    }

    if (legendEl) {
        config.plugins = [legendPlugin(legendEl, legendOptions)];
    }

    chart = new Chart(chartElement.value, config);
};

/**
 * 차트 데이터 갱신
 * @param datasets 데이터
 */
const updateChartDatasets = (datasets: Props['datasets']) => {
    if (!chart) {
        return;
    }

    chart.data.datasets = datasets;

    chart.update();
};

/**
 * 차트 라벨 갱신
 * @param labels 라벨
 */
const updateChartLabels = (labels: Props['labels']) => {
    if (!chart) {
        return;
    }

    chart.data.labels = labels;

    chart.update();
};

// watch
watch(() => datasets, updateChartDatasets, { deep: true });
watch(() => labels, updateChartLabels, { deep: true });

// lifecycle
onMounted(async () => {
    await nextTick();
    initChart();
});
</script>
