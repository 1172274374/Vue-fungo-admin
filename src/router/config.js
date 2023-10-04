import { AuthLayout, DefaultLayout, ChatLayout } from "@/components/layouts"

export const publicRoute = [
    { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
    {
        path: "/auth",
        component: AuthLayout,
        meta: { title: "Login" },
        redirect: "/auth/login",
        hidden: true,
        children: [
            {
                path: "login",
                name: "login",
                meta: { title: "Login" },
                component: () => import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue")
            }
        ]
    },

    {
        path: "/404",
        name: "404",
        meta: { title: "Not Found" },
        component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
    },

    {
        path: "/500",
        name: "500",
        meta: { title: "Server Error" },
        component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
    }
]

export const protectedRoute = [
    {
        path: "/",
        component: DefaultLayout,
        meta: { title: "Home", group: "apps", icon: "" },
        redirect: "/auth/login",
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: { title: "Home", group: "apps", icon: "dashboard" },
                component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
            },

            {
                path: "/403",
                name: "Forbidden",
                meta: { title: "Access Denied", hiddenInMenu: true },
                component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
            }
        ]
    },

    //list
    {
        path: "/cms",
        component: DefaultLayout,
        redirect: "/cms/table",
        meta: { title: "CMS", icon: "view_compact", group: "cms" },
        children: [
            {
                path: "/cms/table",
                name: "ListTable",
                meta: { title: "CMS Table" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/list/Table.vue")
            }
        ]
    },

    //widgets
    {
        path: "/widgets",
        component: DefaultLayout,
        meta: { title: "用户管理", icon: "widgets", group: "advance" },
        redirect: "/widgets/chart",
        children: [
            {
                path: "/widgets/chart",
                name: "ChartWidget",
                meta: { title: "消息推送" },
                component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/widgets/Chart.vue")
            },
            {
                path: "/widgets/list",
                name: "ListWidget",
                meta: { title: "会员管理" },
                component: () => import(/* webpackChunkName: "list-widget" */ "@/views/widgets/List.vue")
            },
            {
                path: "/widgets/social",
                name: "SocialWidget",
                meta: { title: "用户列表" },
                component: () => import(/* webpackChunkName: "social-widget" */ "@/views/widgets/Social.vue")
            },
            {
                path: "/widgets/statistic",
                name: "StatisticWidget",
                meta: { title: "Statistic Widget" },
                component: () => import(/* webpackChunkName: "statistic-widget" */ "@/views/widgets/Statistic.vue")
            }
        ]
    },

    {
        path: "/widgets1",
        component: DefaultLayout,
        meta: { title: "用户管理", icon: "widgets", group: "advance1" },
        redirect: "/widgets1/User",
        children: [
            // {
            //   path: "/widgets1/permissions",
            //   name: "Permissions",
            //   meta: { title: "用户权限" },
            //   component: () => import(/* webpackChunkName: "table" */ "@/views/list/Permissions.vue"),
            // },
            // {
            //   path: "/widgets1/role",
            //   name: "Role",
            //   meta: { title: "角色管理" },
            //   component: () => import(/* webpackChunkName: "table" */ "@/views/list/Role.vue"),
            // },
            {
                path: "/widgets1/User",
                name: "User",
                meta: { title: "用户列表" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/table/User.vue")
            }
        ]
    },

    {
        path: "/widgets2",
        component: DefaultLayout,
        meta: { title: "产品管理", icon: "widgets", group: "advance2" },
        redirect: "/widgets2/Product",
        children: [
            {
                path: "/widgets2/Product",
                name: "Product",
                meta: { title: "版本迭代" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/product/Product.vue")
            },
            {
                path: "/widgets2/template",
                name: "template",
                meta: { title: "添加商铺" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/product/modelTemplate.vue")
            },
            {
                path: "/widgets2/pictures",
                name: "pictures",
                meta: { title: "热力图" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/product/pictures.vue")
            },
            {
                path: "/widgets2/engineering",
                name: "engineering",
                meta: { title: "模型" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/product/engineering.vue")
            },
            {
                path: "/widgets2/feedback",
                name: "feedback",
                meta: { title: "用户反馈" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/product/feedback.vue")
            },
            {
                path: "/widgets2/kefu",
                name: "kefu",
                meta: { title: "客服" },
                redirect: "/widgets2/kefu/chat",
                component: () => import(/* webpackChunkName: "table" */ "@/views/product/kefu.vue"),
                children: [
                    {
                        path: "/widgets2/kefu/chat",
                        meta: { title: "聊天" },
                        component: () => import(/* webpackChunkName: "table" */ "@/views/customer/chat/chat.vue")
                    },
                    {
                        path: "/widgets2/kefu/friend",
                        meta: { title: "朋友" },
                        component: () => import(/* webpackChunkName: "table" */ "@/views/customer/friend/friend.vue")
                    },
                    {
                        path: "/widgets2/kefu/my",
                        meta: { title: "动态" },
                        component: () => import(/* webpackChunkName: "table" */ "@/views/customer/resume/resume.vue")
                    }
                ]
            }
        ]
    },

    {
        path: "/widgets3",
        component: DefaultLayout,
        meta: { title: "订单管理", icon: "widgets", group: "advance3" },
        redirect: "/widgets3/Order",
        children: [
            {
                path: "/widgets3/Order",
                name: "Order",
                meta: { title: "订单管理" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/table/Order.vue")
            }
        ]
    },

    {
        path: "/widgets4",
        component: DefaultLayout,
        meta: { title: "管理员", icon: "widgets", group: "advance4" },
        redirect: "/widgets4/Order",
        children: [
            {
                path: "/widgets4/manager",
                name: "manager",
                meta: { title: "管理员列表" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/manager/manager.vue")
            },
            {
                path: "/widgets4/permission",
                name: "permission",
                meta: { title: "权限管理" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/manager/permission.vue")
            },
            {
                path: "/widgets4/audit",
                name: "audit",
                meta: { title: "审核" },
                component: () => import(/* webpackChunkName: "table" */ "@/views/manager/audit.vue")
            }
        ]
    },

    //media
    {
        path: "/media",
        meta: { title: "Media", group: "apps", icon: "media" },
        name: "Media",
        props: route => ({ type: route.query.type }),
        component: () => import(/* webpackChunkName: "routes" */ `@/views/Media.vue`)
    },

    // chat app
    {
        path: "/chat",
        name: "Chat",
        component: ChatLayout,
        redirect: {
            path: "/chat/messaging"
        },
        meta: { title: "Chat", group: "apps", icon: "chat_bubble" },
        children: [
            {
                path: "/chat/messaging/:uuid?",
                name: "ChatMessaging",
                props: true,
                components: () => import(/* webpackChunkName: "chat-messaging" */ `@/components/chat/ChatMessaging.vue`)
            },
            {
                path: "/chat/contact/:uuid?",
                meta: {
                    public: true
                },
                name: "ChatContact",
                components: () => import(/* webpackChunkName: "chat-contact" */ `@/components/chat/ChatContact.vue`)
            }
        ]
    },

    //mail app
    {
        path: "/mail",
        meta: {
            public: true
        },
        name: "Mail",
        component: () => import(/* webpackChunkName: "routes" */ `@/components/email/Layout.vue`),
        redirect: {
            path: "/mail/all"
        },
        children: [
            {
                path: "/mail/:mailType",
                meta: {
                    public: true
                },
                name: "MailIndex",
                component: () => import(/* webpackChunkName: "routes" */ `@/components/email/List.vue`)
            },
            {
                path: "/mail/0/:uuid",
                meta: {
                    public: true
                },
                name: "MailDetail",
                component: () => import(/* webpackChunkName: "routes" */ `@/components/email/Reply.vue`)
            }
        ]
    }
]
