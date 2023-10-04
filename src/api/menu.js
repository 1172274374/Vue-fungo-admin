const Menu = [
    // { header: "管理员板块", permissionCode: 100 },
    // {
    //   title: "Dashboard",
    //   group: "apps",
    //   icon: "dashboard",
    //   name: "Dashboard"
    // },
    // {
    //   title: "Chat",
    //   group: "apps",
    //   icon: "chat_bubble",
    //   target: "_blank",
    //   name: "Chat"
    // },
    // {
    //   title: "Inbox",
    //   group: "apps",
    //   name: "Mail",
    //   target: "_blank",
    //   icon: "email"
    // },
    // {
    //   title: 'Media',
    //   group: 'apps',
    //   name: 'Media',
    //   icon: 'perm_media',
    // },
    // {
    //   title: "用户管理",
    //   group: "widgets",
    //   component: "widgets",
    //   icon: "widgets",
    //   items: [
    //     { name: "用户列表", title: "用户列表", component: "SocialWidget" },
    //     {
    //       name: "statistic",
    //       title: "审核",
    //       badge: "new",
    //       component: "StatisticWidget"
    //     },
    //     { name: "消息推送", title: "消息推送", component: "ChartWidget" },
    //     { name: "会员管理", title: "会员管理", component: "ListWidget" },
    //   ],
    // },
    // {
    //   title: "用户管理",
    //   permissionCode: 401,
    //   group: "widgets1",
    //   component: "widgets1",
    //   icon: "account_box",
    //   items: [
    //     // { name: "用户权限", title: "用户权限", component: "Permissions" },
    //     { name: "用户列表", title: "用户列表", component: "User", permissionCode: 402 },
    //   ],
    // },
    // {
    //   title: "订单管理",
    //   group: "widgets3",
    //   component: "widgets3",
    //   icon: "shopping_basket",
    //   items: [
    //     { name: "订单列表", title: "订单列表", component: "Order" },
    //     // { name: "角色管理", title: "角色管理", component: "Role" },
    //   ],
    // },

    { header: "产品板块", permissionCode: 200 },
    {
        title: "产品管理",
        permissionCode: 201,
        group: "widgets2",
        component: "widgets2",
        icon: "apps",
        items: [
            // { name: "客服", title: "客服", component: "kefu", permissionCode: 202 },
            { name: "用户反馈", title: "用户反馈", component: "feedback", permissionCode: 203 },
            { name: "商铺", title: "添加商铺", component: "template", permissionCode: 204 },
            { name: "图片", title: "热力图", component: "pictures", permissionCode: 205 },
            // { name: "模型", title: "模型", component: "engineering", permissionCode: 206 },
            // { name: "版本管理", title: "版本管理", component: "Product", permissionCode: 207 },
        ],
    },

    { header: "管理员", permissionCode: 300 },
    {
        title: "管理员列表",
        permissionCode: 301,
        group: "widgets4",
        component: "widgets4",
        icon: "apps",
        items: [
            { name: "管理员列表", title: "管理员列表", component: "manager", permissionCode: 302 },
            { name: "权限管理", title: "权限管理", component: "permission", permissionCode: 303 },
            { name: "审核", title: "审核", component: "audit", permissionCode: 304 },
        ],
    },
    // {
    //   title: "权限管理",
    //   group: "layout",
    //   component: "CMS",
    //   icon: "view_compact",
    //   items: [
    //     { name: "Table", title: "Basic Table", component: "ListTable" },
    //     { name: "用户权限", title: "用户权限", component: "Permissions" }
    //   ]
    // }
    {
        title: "Forms & Controls",
        group: "forms",
        component: "forms",
        icon: "edit",
        items: [{ name: "basic", title: "General", component: "components/basic-forms" }],
    },
    // { divider: true },
    // { header: 'Extras' },
    // {
    //   title: 'Pages',
    //   group: 'extra',
    //   icon: 'list',
    //   items: [
    //     { name: 'Login', title: 'Login', component: 'Login' },
    //     { name: '404', title: '404', component: 'NotFound' },
    //     { name: '403', title: '403', component: 'AccessDenied' },
    //     { name: '500', title: '500', component: 'ServerError' },
    //   ]
    // },
]
// reorder menu
Menu.forEach((item) => {
    if (item.items) {
        item.items.sort((x, y) => {
            let textA = x.title.toUpperCase()
            let textB = y.title.toUpperCase()
            return textA < textB ? -1 : textA > textB ? 1 : 0
        })
    }
})

// let permissionArray = [300, 301, 302, 303]

// const MenuFilter = Menu.filter((item) => {
//   if (item.items) {
//     item.items = item.items.filter((item3) => {
//       if (permissionArray.includes(item3.permissionCode)) {
//         return item3
//       }
//     })
//   }

//   if (permissionArray.includes(item.permissionCode)) {
//     return item
//   }
// })

export default Menu
