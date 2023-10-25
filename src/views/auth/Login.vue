<template>
    <div class="content">
        <div class="login">
            <h1 style="color: #fff">智赢族谱</h1>
            <form action="">
                <input type="text" placeholder="账号" v-model="loginForm.iphone" />
                <input type="password" placeholder="密码" v-model="loginForm.password" />
                <p style="color: #fff" @click="handleLogin">登录</p>
            </form>
            <img src="../../img/flower.png" alt="" class="flower" />
        </div>
    </div>
</template>

<script>
import { requestByGet } from "@/api/globalApi"
import api from "@/api/apis"
import { msgBox, customizeMsgBox } from "@/util/msgbox"

export default {
    name: "Login",
    data() {
        return {
            register: 2,
            loginWay: 3,
            loginForm: {
                iphone: "",
                password: ""
            }
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    created() {
        // this.checkWeiXin()

        if (localStorage.getItem("jwt") != null) {
            this.$router.push("/dashboard")
        }
    },
    mounted() {},
    methods: {
        handleLogin() {
            requestByGet(api.managerLogin, this.loginForm)
                .then(value => {
                    if (value.code == 200) {
                        this.loading = true
                        this.$router.push("/dashboard")

                        this.$store.dispatch("setMenus", value.rspdata.managePermission)

                        localStorage.setItem("jwt", value.jwt)

                        localStorage.setItem("userName", value.rspdata.manageName)
                    } else {
                        customizeMsgBox(4, value.msg)
                    }
                })

                .catch(error => {
                    customizeMsgBox(4, "登录失败")
                    this.dataLoading = true
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
}

.flower {
    width: 400px;
    height: 400px;
    position: absolute;
    bottom: -120px;
    left: -200px;
}

.login {
    /* 超出部分隐藏 */
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 450px;
    background-color: #34495e;
    border-radius: 10px;
    box-shadow: 10px 10px 20px rgba(33, 44, 55, 0.3);
}

h1 {
    font-size: 45px;
    font-weight: 400;
    /* 提高层级 */
    z-index: 1;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 230px;
    /* 提高层级 */
    z-index: 1;
}

input {
    width: 200px;
    height: 40px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #eee;
    font-size: 16px;
    outline: none;
    color: #ffffff;
}

input::placeholder {
    font-size: 12px;
    color: #eee;
}

p {
    width: 180px;
    height: 36px;
    border: 1px solid #eee;
    border-radius: 18px;
    background-color: transparent;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

span {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background-color: #916968;
    /* 鼠标居中 */
    transform: translate(-50%, -50%);
    /* 圆的形式展开 */
    border-radius: 50%;
}

/* 鼠标进入 login 时的动画 */

@keyframes in {
    0% {
        width: 0;
        height: 0;
    }

    100% {
        width: 1200px;
        height: 1200px;
    }
}

/* 鼠标离开 login 时的动画 */
@keyframes out {
    0% {
        width: 1200px;
        height: 1200px;
    }

    100% {
        width: 0;
        height: 0;
    }
}
</style>
