import type { App } from 'vue';

import VLazyRouterView from '@/components/LazyRouterView.vue';
import VLoading from '@/components/Loading.vue';
import VSuspense from '@/components/Suspense.vue';
import VTitle from '@/components/Title.vue';
import VTab from '@/components/Tab.vue';
import VScroll from '@/components/scroll/Default.vue';
import VInfiniteScroll from '@/components/scroll/Infinite.vue';
import VTable from '@/components/Table.vue';
import VPagination from '@/components/Pagination.vue';
import VTooltip from '@/components/Tooltip.vue';

// flex layout
import VFlex from '@/components/flex/Container.vue';
import VRow from '@/components/flex/Row.vue';
import VCol from '@/components/flex/Col.vue';

// grid layout
import VGrid from '@/components/grid/Container.vue';
import VCell from '@/components/grid/Cell.vue';

// chart
import VChart from '@/components/Chart.vue';
import VBarChart from '@/components/chart/Bar.vue';
import VLineChart from '@/components/chart/Line.vue';

// form
import VBtn from '@/components/form/Button.vue';
import VCheck from '@/components/form/Checkbox.vue';
import VDatePicker from '@/components/form/DatePicker.vue';
import VInput from '@/components/form/input/Default.vue';
import VInputNumber from '@/components/form/input/Number.vue';
import VRadio from '@/components/form/Radio.vue';
import VRadioGroup from '@/components/form/RadioGroup.vue';
import VSelect from '@/components/form/Select.vue';
import VTextarea from '@/components/form/Textarea.vue';
import VUploadFile from '@/components/form/UploadFile.vue';

// modal
import VModal from '@/components/Modal.vue';

/** 전역 컴포넌트 */
const globalComponent = {
    // NOTE: 전역 컴포넌트는 여기에 추가하면 됨
    VLazyRouterView,
    VLoading,
    VSuspense,
    VTitle,
    VTab,
    VScroll,
    VInfiniteScroll,
    VTable,
    VPagination,
    VTooltip,
    VFlex,
    VRow,
    VCol,
    VGrid,
    VCell,
    VChart,
    VBarChart,
    VLineChart,
    VBtn,
    VCheck,
    VDatePicker,
    VInput,
    VInputNumber,
    VRadio,
    VRadioGroup,
    VSelect,
    VTextarea,
    VUploadFile,
    VModal,
};

/**
 * 전역 컴포넌트 초기 설정
 * @param app Vue 인스턴스
 */
const init = (app: App<Element>) => Object.entries(globalComponent)
    .forEach(([name, component]) => app.component(name, component));

type GlobalComponent = typeof globalComponent;

export default init;
export type { GlobalComponent };
