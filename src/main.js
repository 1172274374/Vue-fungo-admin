import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router/"
import store from "./store"

import "./registerServiceWorker"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "font-awesome/css/font-awesome.css"
import i18n from "./lang/lang"
import "../src/alibbIcon/iconfont"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import locale from "element-ui/lib/locale/lang/zh-CN" // lang i18n

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

const vuemain = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app")

// 刷新时删除页面缓存
window.addEventListener("beforeunload", () => {
    localStorage.clear()
})
export default vuemain
