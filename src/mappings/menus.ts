import { RouterName, UserAuthority } from '@/mappings/enum';

// type
type Menu = {
    /** 경로명 */
    name: string;

    /** 해당 메뉴와 연관되는(정보, 등록, 수정 등과 같은) 경로명 목록 */
    links?: string[];

    /** 권한 목록 */
    roles?: UserAuthority[];
};
type Menus = ({
    /** 아이콘 */
    icon: string;

    /** 하위 메뉴 목록 */
    childrens?: Menu[];
} & Menu)[];

/** 메뉴 목록 */
const menus: Menus = [
    // FIXME: 메뉴 정의에 맞춰서 수정 필요
    {
        icon: 'fas fa-chart-tree-map',
        name: RouterName.Dashboard,
        childrens: [
            {
                name: RouterName.WidgetDashboard,
                roles: [
                    UserAuthority.System,
                    UserAuthority.Master,
                    UserAuthority.Admin,
                ],
            },
            {
                name: RouterName.CustomDashboard,
                roles: [UserAuthority.System, UserAuthority.Master],
            },
        ],
    },
    {
        icon: 'fas fa-file-check',
        name: RouterName.Standard,
        childrens: [
            {
                name: RouterName.UserList,
                links: [RouterName.SetUser],
            },
        ],
    },
];

// 로컬 개발 환경인 경우
if (import.meta.env.DEV) {
    // 가이드 메뉴 표시
    menus.push({
        icon: 'fa-brands fa-css3-alt',
        name: RouterName.Guide,
        roles: [UserAuthority.System],
        childrens: [{ name: RouterName.StyleGuide }, { name: RouterName.ComponentGuide }],
    });
}

export default menus;
