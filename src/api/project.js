const Projects = [
    {
        id: 301,
        label: "管理员",
        children: [
            {
                id: 302,
                label: "管理员管理"
            },
            {
                id: 303,
                label: "权限管理"
            },
            {
                id: 304,
                label: "审核"
            }
        ]
    },
    {
        id: 401,
        label: "族谱管理",
        children: [
            {
                id: 402,
                label: "支系管理"
            },
            {
                id: 403,
                label: "房系管理"
            },
            {
                id: 404,
                label: "族谱档案管理"
            }
        ]
    }
    // {
    //     id: 201,
    //     label: "产品管理",
    //     children: [
    //         {
    //             id: 202,
    //             label: "客服"
    //         },
    //         {
    //             id: 203,
    //             label: "用户反馈"
    //         },
    //         {
    //             id: 204,
    //             label: "工程模板"
    //         },
    //         {
    //             id: 205,
    //             label: "热力图"
    //         },
    //         {
    //             id: 206,
    //             label: "模型"
    //         },
    //         {
    //             id: 207,
    //             label: "版本管理"
    //         }
    //     ]
    // }
]

const BranchOption = [
    {
        value: "启用",
        label: "启用"
    },
    {
        value: "禁用",
        label: "禁用"
    },
    {
        value: "全部",
        label: "全部"
    }
]

export { Projects, BranchOption }
