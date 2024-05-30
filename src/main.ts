import { createApp } from 'vue';
import konva from 'vue-konva';
import { createPinia } from 'pinia';

import App from '@/App.vue';

import { dayjs, globalComponent, sentry } from '@/plugins';

import router from '@/router';

const app = createApp(App);
const store = createPinia();

app.config.performance = true;

// FIXME: 사용하지 않는 플러그인은 삭제해도 됨 (예를 들면 konva를 사용하지 않는 경우 21번째 줄을 삭제하면 됨)
app.use(store)
    .use(router)
    .use(globalComponent)
    .use(dayjs)
    .use(konva, { prefix: 'V' })
    .use(sentry, router)
    .mount('#app');
