import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-expect-error: `vite-plugin-eslint`에서 `types` 파일을 `export`하지 않아서 발생하는 오류 (https://github.com/gxmari007/vite-plugin-eslint/issues/74)
import eslint from 'vite-plugin-eslint';
import { sentryVitePlugin } from '@sentry/vite-plugin';

/**
 * Vite 설정
 * @see {@link https://ko.vitejs.dev}
 */
const config = defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const host = ((env.VITE_SERVER_HOST === 'true') || env.VITE_SERVER_HOST || '0.0.0.0');
    const isEnableSentry = (env.VITE_SENTRY_ENABLED === 'true');
    const defaultConfig = {
        plugins: [
            vue({ script: { propsDestructure: true } }),
            eslint({ fix: (env.VITE_ESLINT_AUTO_FIX === 'true') }),
            sentryVitePlugin({
                org: 'ulalalab',
                project: 'vue-standard', // FIXME: Sentry에서 설정한 프로젝트명으로 수정 필요
                authToken: env.VITE_SENTRY_AUTH_TOKEN,
                disable: !isEnableSentry,
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),

                // NOTE: scss import 시 경로 오류 임시 해결
                '@vuepic/vue-datepicker': fileURLToPath(new URL('./node_modules/@vuepic/vue-datepicker', import.meta.url)),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // 공통 scss 내용 추가
                    additionalData: '@import "@/assets/scss/base/base.scss";',
                },
            },
        },
        server: {
            host,
            port: env.VITE_SERVER_PORT ? Number(env.VITE_SERVER_PORT) : 3000,
        },
        build: { sourcemap: isEnableSentry },
        preview: {
            host,
            port: env.VITE_PREVIEW_PORT ? Number(env.VITE_PREVIEW_PORT) : 4173,
        },
    };
    const config = defaultConfig as UserConfig & typeof defaultConfig;

    if (env.VITE_API_PROXY && env.VITE_API_URL) {
        config.server.proxy = {
            [env.VITE_API_PROXY]: {
                target: env.VITE_API_URL,
                rewrite: (path) => path.replace(env.VITE_API_PROXY, ''),
            },
        };
        config.preview.proxy = {
            [env.VITE_API_PROXY]: {
                target: env.VITE_API_URL,
                rewrite: (path) => path.replace(env.VITE_API_PROXY, ''),
            },
        };
    }

    return config;
});

export default config;
