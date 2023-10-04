<template>
    <div class="content">
        <div class="msglist">
            <search class="search"></search>
            <chatlist></chatlist>
        </div>
        <div class="chatbox">
            <message></message>
            <v-text></v-text>
        </div>
    </div>
</template>

<script>
import search from "@/components/chatbox/search/search"
import chatlist from "@/components/chatbox/chatlist/chatlist"
import message from "@/components/chatbox/message/message"
import vText from "@/components/chatbox/text/text"
export default {
    components: {
        search,
        chatlist,
        message,
        vText,
    },
}
</script>

<style lang="less" scoped>
.content {
    display: flex;
    width: 800px;
    .msglist {
        width: 250px;
        background: rgb(230, 230, 230);
    }

    .chatbox {
        flex: 1;
    }
}

@media (max-width: 876px) {
    .content {
        width: 88vw;
    }
}

@media (max-width: 600px) {
    .content {
        width: 88vw;

        .msglist {
            width: 140px;
            background: rgb(230, 230, 230);

            .search {
                display: none;
            }
        }
    }
}
</style>
