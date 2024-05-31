import { createRouter, createWebHistory } from 'vue-router';

import { RouterName } from '@/mappings/enum';

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
// const Login = () => import('@/views/login/Login.vue');
// const ResetPassword = () => import('@/views/login/ResetPassword.vue');
const Login2 = () => import('@/views/login2/Login.vue');
const Join = () => import('@/views/login2/Join.vue');

// 메인
// const Main = () => import('@/views/Main.vue');

// 대시보드
// const WidgetDashboard = () => import('@/views/dashboard/Widget.vue');
// const CustomDashboard = () => import('@/views/dashboard/Custom.vue');

// 기준 정보
// const SetUser = () => import('@/views/user/Setting.vue');

// 프로필
const Profile = () => import('@/views/user/Profile.vue');

// 문의 현황
const Inquiry = () => import('@/views/inquiry/Container.vue');

// 영업 현황
const SalesStatus = () => import('@/views/salesStatus/Container.vue');
const SalesRegist = () => import('@/views/salesStatus/Regist.vue');
const SalesDetails = () => import('@/views/salesStatus/Details.vue');
const SalesModify = () => import('@/views/salesStatus/Modify.vue');

// 회원관리
const CustomerStatus = () => import('@/views/customerStatus/Container.vue');

// 회원관리
const UserList = () => import('@/views/user/List.vue');
// 대리점 관리
const AgencyList = () => import('@/views/user/agency/List.vue');

// 문의하기
const ContactUs = () => import('@/views/contactus/View.vue');

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
            component: MainLayout,
            meta: { isRequireLogin: true },
            children: [
                // 문의 현황
                {
                    path: 'inquiry',
                    name: RouterName.Inquiry,
                    component: Inquiry,
                },

                // 영업 현황
                {
                    path: 'salesStatus',
                    children: [
                        {
                            path: '',
                            name: RouterName.SalesStatus,
                            component: SalesStatus,
                        },
                        {
                            path: 'regist',
                            name: RouterName.SalesRegist,
                            component: SalesRegist,
                        },
                        {
                            path: ':idx',
                            name: RouterName.SalesDetails,
                            component: SalesDetails,
                        },
                        {
                            path: ':idx/modify',
                            name: RouterName.SalesModify,
                            component: SalesModify,
                        },
                    ],
                },

                // 고객 현황
                {
                    path: 'customerStatus',
                    name: RouterName.CustomerStatus,
                    component: CustomerStatus,
                },

                // 회원 관리
                {
                    path: 'users',
                    children: [
                        {
                            path: '',
                            name: RouterName.UserList,
                            component: UserList,
                        },
                        {
                            path: 'agency',
                            name: RouterName.AgencyList,
                            component: AgencyList,
                        },
                    ],
                },

                // 가이드
                {
                    path: 'guide',
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
                // {
                //     path: 'standard',
                //     children: [
                //         // 계정 관리
                //         {
                //             path: 'user',
                //             children: [
                //                 // 목록
                //                 {
                //                     path: '',
                //                     name: RouterName.UserList,
                //                     component: UserList,
                //                 },

                //                 // 설정
                //                 {
                //                     path: 'setting/:idx?',
                //                     name: RouterName.SetUser,
                //                     component: SetUser,
                //                 },
                //             ],
                //         },
                //     ],
                // },

                // 프로필
                {
                    path: 'mypage',
                    name: RouterName.Mypage,
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
        // {
        //     path: '/login',
        //     component: LoginLayout,
        //     children: [
        //         {
        //             path: '',
        //             name: RouterName.Login,
        //             component: Login,
        //         },

        //         // 비밀번호 재설정
        //         {
        //             path: 'reset-password',
        //             name: RouterName.ResetPassword,
        //             component: ResetPassword,
        //         },
        //     ],
        // },

        // 로그인 2
        {
            path: '/login',
            component: Login2Layout,
            children: [
                {
                    path: '',
                    name: RouterName.Login,
                    component: Login2,
                },
                {
                    path: 'join',
                    name: RouterName.Join,
                    component: Join,
                },
            ],
        },

        // 문의하기
        {
            path: '/contactus',
            name: RouterName.ContactUs,
            component: ContactUs,
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
