/** axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import Axios from "axios"
import router from "@/router/index"
import { msgBox, customizeMsgBox } from "@/util/msgbox"
import api from "@/api/apis"

// 不同环境不同地址
const apis = {
    production: "http://zhupu.zhiying2023.cn/estate/v1", // 线上 (生成环境)
    development: "http://localhost:9090/estate/v1", // 本地 (开发环境)
    accessHomeData: "http://www.xmyxapp.com" // 其他api
}

const axios = Axios.create({
    baseURL: process.env.NODE_ENV === "production" ? apis.production : apis.development,
    timeout: 1000 * 12
})

const releaseUrl = [api.managerLogin]
// 请求拦截器
axios.interceptors.request.use(
    config => {
        if (releaseUrl.indexOf(config.url) > -1) {
            config.headers = {
                "Content-Type": "application/json"
            }
            return config
        } else {
            const jwt = localStorage.getItem("jwt")
            if (jwt !== "" && jwt !== undefined && jwt !== null) {
                config.headers = {
                    "Content-Type": "application/json",
                    jwt: jwt
                }
                return config
            } else {
                msgBox(4030)
                router.push("/auth/login")
            }
        }
    },
    error => {
        // 对请求错误做些什么
        msgBox(1000)
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    // 请求成功
    response => {
        console.log(response)
        const token = response.data.token
        const code = response.data.code
        if (token !== null && token !== "" && token !== undefined) {
            localStorage.setItem("token", token)
        }
        if (code !== 2000 && code !== "" && code !== undefined) {
            // 响应成功无需提示
            msgBox(code)
        }
        if (code === 6000) {
            customizeMsgBox(3, response.data.msg)
        }
        return Promise.resolve(response.data)
    }
)

export default axios
