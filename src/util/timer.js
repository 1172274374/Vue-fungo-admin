//全局监听

window.addEventListener("unload", () => {
    console.log("upload")
})

window.addEventListener("beforeunload", () => {
    console.log("beforeunlload")
})
