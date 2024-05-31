import { RouterName } from '@/mappings/enum';

// type
type Menu = {
    /** 경로명 */
    name: string;

    /** 해당 메뉴와 연관되는(정보, 등록, 수정 등과 같은) 경로명 목록 */
    links?: string[];
};
type Menus = ({
    /** 아이콘 */
    icon: string;

    /** 하위 메뉴 목록 */
    childrens?: Menu[];
} & Menu)[];

/** 메뉴 목록 */
const menus: Menus = [
    // {
    //     icon: 'fas fa-chart-tree-map',
    //     name: RouterName.Dashboard,
    //     childrens: [{ name: RouterName.WidgetDashboard }, { name: RouterName.CustomDashboard }],
    // },
    // {
    //     icon: 'fas fa-file-check',
    //     name: RouterName.Standard,
    //     childrens: [
    //         {
    //             name: RouterName.UserList,
    //             links: [RouterName.SetUser],
    //         },
    //     ],
    // },
    {
        icon: 'fa-sharp fa-regular fa-messages-question',
        name: RouterName.Inquiry,
    },
    {
        icon: 'fa-sharp fa-regular fa-credit-card',
        name: RouterName.SalesStatus,
    },
    {
        icon: 'fa-sharp fa-regular fa-user-check',
        name: RouterName.CustomerStatus,
    },
    {
        icon: 'fa-sharp fa-regular fa-user-group',
        name: RouterName.UserList,
    },
    {
        icon: 'fa-brands fa-css3-alt',
        name: RouterName.Guide,
        childrens: [{ name: RouterName.StyleGuide }, { name: RouterName.ComponentGuide }],
    },
];

export default menus;
