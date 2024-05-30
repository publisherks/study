<!-- 바 차트 -->
<template>
    <VChart
        type="bar"
        :datasets
        :labels
        :options="{
            layout: { padding: 0 },
            plugins: {
                legend: { display: false },
                title: { display: false },
                tooltip: { enabled: false },
            },
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        backdropPadding: 0,
                        color: tickColor,
                        padding: 0,
                    },
                    beginAtZero: true,
                    grid: {
                        color: gridColor,
                        drawTicks: false,
                    },
                },
                y: {
                    ticks: { display: false },
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    grid: {
                        color: gridColor,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                },
            },
        }"
        :width
        :height
        :legend
        :legendOptions
    />
</template>

<script setup lang="ts">
import type { GridLineOptions, TickOptions } from 'chart.js';

import type { Props as ChartProps } from '@/components/Chart.vue';

import type { Nullable } from '@/mappings/types/common';

// type
type Props = {
    /** 데이터 목록 */
    datasets: ({
        data: Nullable<number>[];
        backgroundColor: string[];
    })[];

    /** 그리드 색 */
    gridColor?: GridLineOptions['color'];

    /** 라벨 색 */
    tickColor?: TickOptions['color'];
} & Omit<ChartProps, 'type' | 'datasets' | 'options'>;

// props
const { datasets, labels, gridColor = '#dedfe4', tickColor = '#717886', width, height, legend, legendOptions } = defineProps<Props>();
</script>
