import type { ChartConfiguration, Plugin } from 'chart.js';

import type { KeyValuePair } from '@/mappings/types/common';

import children from '@/utils/element/children';

// type
type Options = {
    /** 차트의 `datasets` 목록에서 표시하지 않을 `index` 목록 */
    hideIndexes?: number[];

    /** 스타일 */
    style?: {
        /** `<ul>` 요소 */
        ul?: KeyValuePair<string>;

        /** `<li>` 요소 */
        li?: KeyValuePair<string>;

        /** `<span>`(라인) 요소 */
        line?: KeyValuePair<string>;

        /** `<p>`(텍스트) 요소 */
        text?: KeyValuePair<string>;
    };
};

/**
 * Chart.js 범례 Plugin
 * @param element 범례 요소
 * @param options 옵션
 * @param options.hideIndexes 차트의 `datasets` 목록에서 표시하지 않을 `index` 목록
 * @param options.style 스타일
 * @param options.style.ul `<ul>` 요소
 * @param options.style.li `<ll>` 요소
 * @param options.style.line `<span>`(라인) 요소
 * @param options.style.text `<p>`(텍스트) 요소
 * @see {@link https://www.chartjs.org/docs/latest/samples/legend/html.html}
 */
const legend = (element: HTMLElement, { hideIndexes, style = {} }: Options = {}): Plugin => ({
    id: 'legend',
    afterUpdate(chart) {
        const ul = children('ul', element, {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: '0px',
            padding: '0px',
            ...style.ul,
        });

        // 기존 범례 삭제
        ul.replaceChildren();

        let { type } = chart.config as ChartConfiguration,
            labels = (chart.options.plugins?.legend?.labels?.generateLabels?.(chart) ?? []);

        const isPie = ['doughnut', 'pie'].includes(type);

        if (isPie) {
            labels = labels.map((value) => ({
                ...value,
                datasetIndex: value.index,
            }));
        }

        labels.sort(({ datasetIndex: a = 0 }, { datasetIndex: b = 0 }) => (a - b))
            .forEach(({ datasetIndex, fillStyle, hidden, index, strokeStyle, text }) => {
                if (!text || typeof datasetIndex === 'undefined' || hideIndexes?.includes(datasetIndex)) {
                    return;
                }

                const { type: chartType } = chart.data.datasets[datasetIndex];

                if (!isPie && chartType) {
                    type = chartType;
                }

                // 범례 목록 생성
                const li = document.createElement('li');

                Object.assign(li.style, {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    cursor: 'pointer',
                    ...style.li,
                });

                if (datasetIndex) {
                    li.style.marginLeft = (style.li?.marginLeft || style.li?.['margin-left'] || '10px');
                }

                // 범례 목록 클릭 시
                li.onclick = () => {
                    // 차트에서 해당 범례의 데이터 표시/숨김
                    switch (isPie) {
                        case true:
                            if (typeof index !== 'undefined') {
                                chart.toggleDataVisibility(index);
                            }

                            break;

                        default:
                            chart.setDatasetVisibility(datasetIndex, !chart.isDatasetVisible(datasetIndex));
                    }

                    chart.update();
                };

                // 라인 생성
                const line = document.createElement('span');

                Object.assign(line.style, {
                    display: 'inline-block',
                    background: (type === 'bar' || isPie) ? fillStyle : strokeStyle,
                    width: '14px',
                    height: '4px',
                    marginRight: '8px',
                    ...style.line,
                });

                // 텍스트 생성
                const textContainer = document.createElement('p');

                Object.assign(textContainer.style, {
                    color: '#717886',
                    fontSize: '11px',
                    textDecoration: hidden ? 'line-through' : '',
                    ...style.text,
                });

                textContainer.appendChild(document.createTextNode(text));

                li.appendChild(line);
                li.appendChild(textContainer);
                ul.appendChild(li);
            });
    },
});

export default legend;
export type { Options };
