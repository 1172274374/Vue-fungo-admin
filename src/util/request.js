/** axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import Axios from "axios"
import router from "@/router/index"
import { msgBox, customizeMsgBox } from "@/util/msgbox"
import api from "@/api/apis"

const axios = Axios.create({
    baseURL: "http://localhost:9090/estate/v1",
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
        var token = response.data.token
        var code = response.data.code
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
    },
    // 请求失败
    error => {
        const { response } = error
        if (response) {
            // 请求已发出，但是不在200的范围
            msgBox(1001)
            return Promise.reject(response)
        }
    }
)

export default axios
