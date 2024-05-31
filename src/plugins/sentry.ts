import type { App } from 'vue';
import type { Router } from 'vue-router';
import { BrowserTracing, init, Replay, vueRouterInstrumentation } from '@sentry/vue';

/**
 * Sentry 초기 설정
 * @param app Vue 인스턴스
 * @param router 라우터
 * @see {@link https://ulalalab.sentry.io/projects/vue-standard}
 */
const initSentry = (app: App<Element>, router: Router) => init({
    app,
    enabled: (import.meta.env.VITE_SENTRY_ENABLED === 'true'),
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing({ routingInstrumentation: vueRouterInstrumentation(router) }), new Replay()],

    // Performance Monitoring
    enableTracing: true,

    // Session Replay
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1,
});

export default initSentry;
