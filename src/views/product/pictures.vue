<template>
    <div>
        <div id="container">
            <div class="chooseTime">
                <div class="block">
                    <span class="demonstration">选择时间：</span>
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" @change="changeTime">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="timebar">
            <div class="lastTime"><el-button style="margin-top: 12px" @click="lasttime">上一时段</el-button></div>
            <el-steps :active="stepActive" align-center finish-status="success" class="bar">
                <el-step :title="item" description="" v-for="(item, index) in dataName" :key="index"></el-step>
            </el-steps>
            <div class="nextTime"><el-button style="margin-top: 12px" @click="nexttime">下一时段</el-button></div>
        </div>
    </div>
</template>

<script>
import heatData from "./data"
import util from "@/util/index"
import { requestByGet, requestByPost, requestByPut, requestByDelete } from "@/api/globalApi"
import api from "@/api/apis"
import { customizeMsgBox, msgBox } from "@/util/msgbox"
export default {
    data() {
        return {
            markerUrl: require("@/assets/marker.png"),
            focusrUrl: require("@/assets/focus.png"),
            map: "",
            zoom: 16,
            center: new window.TMap.LatLng(29.557626, 106.579131),
            markerLayer: "",
            focusLayer: "",
            value1: "",
            stepActive: 1,
            heatData: [],
            heat: null,
            dataName: [],
        }
    },
    mounted() {
        this.initMap(this.center, this.zoom)

        this.heat = new window.TMap.visualization.Heat({
            max: 220, // 热力最强阈值
            min: 0, // 热力最弱阈值
            height: 0, // 峰值高度
            opacity: 0.6, //全局透明度
            enableAggregation: false,
            gradientColor: {
                // 渐变颜色
                0.2: "#9da6ea",
                0.4: "#6be774",
                0.6: "#d5fbd7",
                0.9: "#ef2c0f",
            },
            radius: 120, // 最大辐射半径
        }).addTo(this.map)

        let dataTime = util.formatDate(new Date(), "yyyy-MM-dd-HH-00-00")
        let reqdata = {
            time: dataTime,
        }

        requestByGet(api.heatTime, reqdata)
            .then((value) => {
                if (value.code === 500) {
                    customizeMsgBox(4, "数据还未生成")
                }

                this.heatData = value.rspdata.data

                this.dataName = value.rspdata.data.map((data) => {
                    return data.time
                })
                
                this.heat.setData(this.heatData[this.stepActive - 1].points) //设置数据
                console.log("initialize map succeed.")
            })
            .catch((error) => {
                msgBox(1000)
            })
    },
    methods: {
        initMap(center, zoom) {
            this.map = new window.TMap.Map(document.getElementById("container"), {
                center: center, //设置地图中心点坐标
                zoom: zoom, //设置地图缩放级别
                pitch: 0, //设置俯仰角
                rotation: 0, //设置地图旋转角度
            })
        },
        changeTime() {
            let dataTime = util.formatDate(this.value1, "yyyy-MM-dd-HH-00-00")

            if (this.value1.getMinutes() > 30) {
                this.stepActive = 2
            } else {
                this.stepActive = 1
            }

            let reqdata = {
                time: dataTime,
            }

            requestByGet(api.heatTime, reqdata)
                .then((value) => {
                    if (value.code === 500) {
                        customizeMsgBox(4, "数据还未生成")
                    }

                    this.heatData = value.rspdata.data

                    this.dataName = value.rspdata.data.map((data) => {
                        return data.time
                    })

                    this.heat.setData(this.heatData[this.stepActive - 1].points) //设置数据
                })
                .catch((error) => {
                    msgBox(1000)
                })
        },
        lasttime() {
            if (this.stepActive === 1) return
            this.stepActive = this.stepActive - 1
            this.heat.setData(this.heatData[this.stepActive - 1].points) //设置数据
        },
        nexttime() {
            if (this.stepActive === 3) return
            this.stepActive = this.stepActive + 1
            this.heat.setData(this.heatData[this.stepActive - 1].points) //设置数据
        },
    },
}
</script>

<style lang="less" scoped>
#container {
    /*地图(容器)显示大小*/
    width: 100%;
    height: 70vh;
    position: relative;

    .chooseTime {
        width: auto;
        height: 8%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9999;
        background: rgb(255, 255, 255);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 25px;
    }
}
.timebar {
    width: 100%;
    margin-top: 4vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .bar {
        margin-top: 2vh;
        width: 70%;
    }
    .lastTime {
        width: 10%;
        display: flex;
        justify-content: flex-end;
    }

    .nextTime {
        width: 10%;
    }
}
</style>
