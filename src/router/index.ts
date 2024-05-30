import { createRouter, createWebHistory } from 'vue-router';

import { RouterName, UserAuthority } from '@/mappings/enum';

import { beforeEach as beforeEachCancelAxios } from '@/router/hook/cancelAxios';
import { beforeEach as beforeEachLoading, afterEach as afterEachLoading } from '@/router/hook/loading';
import { afterEach as afterEachTitle } from '@/router/hook/title';
import { beforeEach as beforeEachValidLogin } from '@/router/hook/validLogin';

// 레이아웃
const LoginLayout = () => import('@/layouts/Login.vue');
const Login2Layout = () => import('@/layouts/Login2.vue');
const MainLayout = () => import('@/layouts/Main.vue');

// 가이드
const ComponentGuide = () => import('@/views/sample/guide/Component.vue');
const StyleGuide = () => import('@/views/sample/guide/Style.vue');

// 로그인
const Login = () => import('@/views/login/Login.vue');
const ResetPassword = () => import('@/views/login/ResetPassword.vue');
const Login2 = () => import('@/views/login2/Login.vue');
const ResetPassword2 = () => import('@/views/login2/ResetPassword.vue');

// 대시보드
const WidgetDashboard = () => import('@/views/dashboard/Widget.vue');
const CustomDashboard = () => import('@/views/dashboard/Custom.vue');

// 기준 정보
const UserList = () => import('@/views/user/List.vue');
const SetUser = () => import('@/views/user/Setting.vue');

// 프로필
const Profile = () => import('@/views/user/Profile.vue');

// 존재하지 않는 경로 안내
const NotFound = () => import('@/views/NotFound.vue');

/**
 * Router
 * @see {@link https://router.vuejs.kr}
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    // 경로 목록
    routes: [
        // 메인
        {
            path: '/',
            name: RouterName.Main,
            component: MainLayout,
            meta: { isRequireLogin: true },
            children: [
                // 대시보드
                {
                    path: 'dashboard',
                    children: [
                        // 위젯
                        {
                            path: 'widget',
                            name: RouterName.WidgetDashboard,
                            component: WidgetDashboard,
                            meta: {
                                roles: [
                                    UserAuthority.System,
                                    UserAuthority.Master,
                                    UserAuthority.Admin,
                                ],
                            },
                        },

                        // 커스텀
                        {
                            path: 'custom',
                            name: RouterName.CustomDashboard,
                            component: CustomDashboard,
                            meta: { roles: [UserAuthority.System, UserAuthority.Master] },
                        },
                    ],
                },

                // 가이드
                {
                    path: 'guide',
                    meta: { roles: [UserAuthority.System] },
                    children: [
                        // 스타일
                        {
                            path: 'style',
                            name: RouterName.StyleGuide,
                            component: StyleGuide,
                        },

                        // 컴포넌트
                        {
                            path: 'component',
                            name: RouterName.ComponentGuide,
                            component: ComponentGuide,
                        },
                    ],
                },

                // 기준 정보
                {
                    path: 'standard',
                    children: [
                        // 계정 관리
                        {
                            path: 'user',
                            children: [
                                // 목록
                                {
                                    path: '',
                                    name: RouterName.UserList,
                                    component: UserList,
                                },

                                // 설정
                                {
                                    path: 'setting/:idx(\\d+)?',
                                    name: RouterName.SetUser,
                                    component: SetUser,
                                },
                            ],
                        },
                    ],
                },

                // 프로필
                {
                    path: 'profile',
                    name: RouterName.Profile,
                    component: Profile,
                },

                // 존재하지 않는 경로
                {
                    path: ':path*',
                    redirect: { name: RouterName.NotFound },
                },
            ],
        },

        // 로그인
        {
            path: '/login',
            component: LoginLayout,
            meta: { isRequireLogin: false },
            children: [
                {
                    path: '',
                    name: RouterName.Login,
                    component: Login,
                },

                // 비밀번호 재설정
                {
                    path: 'reset-password',
                    name: RouterName.ResetPassword,
                    component: ResetPassword,
                },
            ],
        },

        // 로그인 2
        {
            path: '/login2',
            component: Login2Layout,
            meta: { isRequireLogin: false },
            children: [
                {
                    path: '',
                    name: RouterName.Login2,
                    component: Login2,
                },

                // 비밀번호 재설정
                {
                    path: 'reset-password',
                    name: RouterName.ResetPassword2,
                    component: ResetPassword2,
                },
            ],
        },

        // 존재하지 않는 경로 안내
        {
            path: '/not-found',
            component: LoginLayout,
            meta: { isRequireLogin: true },
            children: [
                {
                    path: '',
                    name: RouterName.NotFound,
                    component: NotFound,
                },
            ],
        },
    ],

    // 현재 경로에 대한 <RouterLink> 컴포넌트에 적용할 클래스
    linkActiveClass: 'on',
});

// hook
router.beforeEach(beforeEachCancelAxios);
router.beforeEach(beforeEachLoading);
router.afterEach(afterEachLoading);
router.afterEach(afterEachTitle);
router.beforeEach(beforeEachValidLogin);

export default router;
