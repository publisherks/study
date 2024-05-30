import type { App } from 'vue';
import type { Router } from 'vue-router';
import { browserTracingIntegration, init, replayCanvasIntegration, replayIntegration, vueIntegration } from '@sentry/vue';

const { VITE_SENTRY_DSN: dsn, VITE_SENTRY_ENABLED: enabled } = import.meta.env;

/**
 * Sentry 초기 설정
 * @param app Vue 인스턴스
 * @param router 라우터
 * @see {@link https://ulalalab.sentry.io/projects/vue-standard}
 */
const initSentry = (app: App, router: Router) => init({
    enabled: (enabled === 'true'),
    dsn,
    integrations: [
        browserTracingIntegration({ router }),
        replayCanvasIntegration(),
        replayIntegration({
            maskAllText: false,
            maskAllInputs: false,
            blockAllMedia: false,
        }),
        vueIntegration({
            app,
            trackComponents: true,
            hooks: [
                'activate',
                'create',
                'mount',
                'update',
                'unmount',
            ],
        }),
    ],

    // Performance Monitoring
    enableTracing: true,

    // Session Replay
    replaysOnErrorSampleRate: 1,
});

export default initSentry;
