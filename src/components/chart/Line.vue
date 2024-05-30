<!-- 라인 차트 -->
<template>
    <VChart
        type="line"
        :datasets="datasets.map((value) => ({
            ...value,
            borderWidth: 1,
            pointHoverRadius: 0,
            pointRadius: 0,
        }))"
        :labels
        :options="{
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
            },
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: tickColor,
                        padding: 8,
                    },
                    grid: {
                        color: gridColor,
                        drawTicks: false,
                        lineWidth: ({ tick: { value } }) => value ? 0 : 1,
                    },
                    border: { display: false },
                },
                y: {
                    ticks: {
                        color: tickColor,
                        padding: 8,
                    },
                    beginAtZero: true,
                    grid: {
                        color: gridColor,
                        drawTicks: false,
                        lineWidth: ({ tick: { value } }) => value ? 0 : 1,
                    },
                    border: { display: false },
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
    datasets: (Pick<ChartProps['datasets'][number], 'label'> & {
        data: Nullable<number>[];
        borderColor: string;
    })[];

    /** 그리드 색 */
    gridColor?: GridLineOptions['color'];

    /** 라벨 색 */
    tickColor?: TickOptions['color'];
} & Omit<ChartProps, 'type' | 'datasets' | 'options'>;

// props
const { datasets, labels, gridColor = '#dedfe4', tickColor = '#717886', width, height, legend, legendOptions } = defineProps<Props>();
</script>
