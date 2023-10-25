import store from "@/store"

let socket
const now = new Date()

if (typeof WebSocket == "undefined") {
    console.log("您的浏览器不支持WebSocket")
} else {
    console.log("您的浏览器支持WebSocket")
    let socketUrl = "ws://localhost:9090/estate/socket/" + store.state.kefuName
    console.log(socketUrl)
    if (socket != null) {
        socket.close()
        socket = null
    }
    // 开启一个websocket服务
    socket = new WebSocket(socketUrl)
    //打开事件
    socket.onopen = function() {
        console.log("websocket已打开")
    }
    //  浏览器端收消息，获得从服务端发送过来的文本消息
    socket.onmessage = function(msg) {
        let data = JSON.parse(msg.data)
        if (data.userNames) {
            // userNames存在则是有人登录，获取在线人员信息

            let chatList = []
            if (data.userNames.length !== 0) {
                data.userNames.forEach((item, index) => {
                    chatList.push({
                        id: index + 1,
                        user: {
                            name: item,
                            img: "/static/images/mother.jpg"
                        },
                        messages: [
                            {
                                content: "你好",
                                date: now
                            }
                        ],
                        index: index + 1 // 当前在聊天列表中的位置,从1开始
                    })
                })
            } else {
                chatList.push({
                    id: 1,
                    user: {
                        name: "机器人",
                        img: "/static/images/vue.jpg"
                    },
                    messages: [
                        {
                            content: "我会跟你聊聊天的哟",
                            date: now
                        }
                    ],
                    index: 1
                })
            }

            store.dispatch("addChatLis", chatList)
        } else if (data.msg) {
            // userNames不存在则是有人发消息
            let result = store.state.chatlist.find(session => session.user.name === data.from)
            setTimeout(() => {
                console.log(result.messages)
                result.messages.push({
                    content: data.msg,
                    date: new Date(),
                    self: false
                })
            }, 500)
        } else {
            console.log("收到数据====" + msg.data)
        }
    }

    //关闭事件
    socket.onclose = function() {
        console.log("websocket已关闭")
    }
    //发生了错误事件
    socket.onerror = function() {
        console.log("websocket发生了错误")
    }
}

// 监听聊天列表的值， 发生变化就保存在localStorage中
store.watch(
    state => state.chatlist,
    val => {
        localStorage.setItem("vue-chat", JSON.stringify(val))
    },
    {
        deep: true
    }
)
