<template>
    <div class="customer">
        <div id="kefu">
            <div class="sidebar">
                <mycard></mycard>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
        <div class="zhanwei"></div>
    </div>
</template>

<script>
import mycard from "@/components/chatbox/mycard/mycard"
// import { mapActions } from 'vuex'
let socket
export default {
    components: {
        mycard
    },
    data() {
        return {
            // 登录用户
            user: "",
            // 消息记录列表
            msgList: [],
            // 发送的消息
            message: {
                time: null, //时间
                to: "", //发给谁
                from: "",
                msg: ""
            },
            // 在线用户列表
            userList: []
        }
    },
    created() {
        this.$store.dispatch("initData")
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // 如果sessionStorage中没有用户信息，则跳转登录页面
            this.user = localStorage.getItem("userName")
            if (!this.user) {
                this.$router.push("/dashboard")
            }
        }
    }
}
</script>

<style lang="less" scoped>
.customer {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    background: url("../../img/bg.png");

    #kefu {
        display: flex;
        border-radius: 50px;
        width: 860px;
        height: 600px;
        margin: 5vh auto;

        .sidebar {
            width: 60px;
            height: 600px;
            background: #2b2c2f;
        }

        .main {
            flex: 1;
            height: 600px;
            background: #f2f2f2;
        }
    }

    .zhanwei {
        width: 100%;
        height: 200px;
    }
}

@media (max-width: 876px) {
    .customer #kefu {
        // display: none
        width: 100%;
    }
}

@media (max-width: 600px) {
    .customer {
        #kefu .sidebar {
            display: none;
        }
    }
}
</style>
