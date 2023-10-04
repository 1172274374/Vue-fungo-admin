import { Message } from "element-ui"
import router from "@/router/index"

/**
 * 提示函数
 * 显示一秒后关闭
 */

// 提示信息框
export function msgBox(code) {
    if (code === 5000) {
        Message({
            type: "error",
            message: "请求失败",
            center: true
        })
    } else if (code === 4030) {
        Message({
            type: "error",
            message: "过期或无效令牌,请重新登录",
            center: true
        })
        router.push("/login")
    } else if (code === 4010) {
        Message({
            type: "error",
            message: "异地登录,请重新登录",
            center: true
        })
        router.push("/login")
    } else if (code === 4120) {
        Message({
            type: "error",
            message: "版本号错误",
            center: true
        })
    } else if (code === 4160) {
        Message({
            type: "error",
            message: "权限不足",
            center: true
        })
    } else if (code === 300) {
        Message({
            type: "warning",
            message: "未能通过表单验证",
            center: true
        })
    }
}

export function customizeMsgBox(no, msg) {
    if (no === 1) {
        Message({
            type: "success",
            message: msg,
            center: true
        })
    } else if (no === 2) {
        Message({
            type: "info",
            message: msg,
            center: true
        })
    } else if (no === 3) {
        Message({
            type: "warning",
            message: msg,
            center: true
        })
    } else {
        Message({
            type: "error",
            message: msg,
            center: true
        })
    }
}
