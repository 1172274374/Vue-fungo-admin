<template>
    <div class="app-container">
        <el-button @click="addClick('添加')">
            <i class="el-icon-plus" />
            添加
        </el-button>
        <!-- <el-button @click="handleMultiDelete">
    <i class="el-icon-delete" />
    全部删除
  </el-button> -->
        <el-table
            v-loading="dataLoading"
            style="margin-top: 10px"
            :data="dataList"
            element-loading-text="Loading"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column label="名字" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.engineeringName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.engineeringDesc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="GLB" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.engineeringGlb }}</span>
                </template>
            </el-table-column>
            <el-table-column label="AB" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.engineeringAb }}</span>
                </template>
            </el-table-column>
            <el-table-column label="预览图" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.engineeringPreview" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <span :style="scope.row.engineeringStatus == 1 ? 'color:green' : 'color:red'">{{
                        scope.row.engineeringStatus == 1 ? "已上线" : "已下线"
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="版本" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.productVersion }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="success"
                        size="mini"
                        icon="el-icon-setting"
                        circle
                        @click="updateClick(scope.row, '更新')"
                    />
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="handleDelete(scope.$index, scope.row)"
                    />
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 30px; float: right">
            <el-pagination
                background
                :current-page="params.pageNum"
                :page-sizes="pageSizes"
                :page-size="params.pageSize"
                layout="total, prev, pager, next, sizes"
                :total="totalSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <template v-if="dialogFormVisible">
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogFormVisible"
                width="50%"
                modal
                :close-on-click-modal="true"
                :append-to-body="true"
                :modal-append-to-body="false"
            >
                <el-form ref="oneForm" label-position="right" label-width="150px" :model="dataForm" :rules="rules">
                    <el-form-item label="工程模板名称: " prop="name">
                        <el-input v-model="dataForm.name" clearable placeholder="请输入产品名称" style="width: 60%" />
                    </el-form-item>
                    <el-form-item label="描述: " prop="desc">
                        <el-input
                            type="textarea"
                            v-model="dataForm.desc"
                            resize="none"
                            :show-word-limit="true"
                            :clearable="true"
                            rows="8"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传GLB模型: " prop="Glbmodel">
                        <div class="upload">
                            <input type="file" id="fileName" @mouseout="upload" />
                            <div class="uploadIcon" v-if="dataForm.Glbmodel != undefined">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-chenggong"></use>
                                </svg>
                            </div>
                            <div class="clear" v-if="dataForm.Glbmodel != undefined" @click="clearUpdata(0)">清除</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="上传AB模型: " prop="Abmodel">
                        <div class="upload">
                            <input type="file" id="fileName2" @mouseout="upload2" />
                            <div class="uploadIcon" v-if="dataForm.Abmodel != undefined">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-chenggong"></use>
                                </svg>
                            </div>
                            <div class="clear" v-if="dataForm.Abmodel != undefined" @click="clearUpdata(2)">清除</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="上传预览图: " prop="preview">
                        <div class="upload1">
                            <input type="file" id="fileName1" @mouseout="upload1" />
                            <div class="uploadIcon" v-if="dataForm.preview != undefined">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-chenggong"></use>
                                </svg>
                            </div>
                            <div class="clear" v-if="dataForm.preview != undefined" @click="clearUpdata(1)">清除</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="对应版本: " prop="version">
                        <el-select v-model="dataForm.version" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否上线: " prop="status">
                        <el-switch
                            v-model="dataForm.switch"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="上线"
                            inactive-text="下线"
                            @change="switchChange"
                        >
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" style="text-align: center" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="updateFlag == false ? handleAdd(dataForm) : handleUpdate(dataForm)"
                        >提 交
                    </el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>
import { msgBox, customizeMsgBox } from "@/util/msgbox"
import unit from "@/util/index"
import { requestByGet, requestByPost, requestByPut, requestByDelete } from "@/api/globalApi"
import api from "@/api/apis"
import OSS from "ali-oss"

export default {
    name: "OrderProduct",
    components: {},
    // eslint-disable-next-line vue/require-prop-types
    props: ["superiorId"],
    data() {
        var validatePass = (rule, value, callback) => {
            if (value == undefined || value == "") {
                callback(new Error("请输入名称"))
            } else {
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value == undefined || value == "") {
                callback(new Error("请填写描述"))
            } else {
                callback()
            }
        }
        var validatePass3 = (rule, value, callback) => {
            if (this.dataForm.Glbmodel == undefined) {
                callback(new Error("请上传glb模型"))
            } else {
                callback()
            }
        }
        var validatePass4 = (rule, value, callback) => {
            if (this.dataForm.preview == undefined) {
                callback(new Error("请上传预览图"))
            } else {
                callback()
            }
        }
        var validatePass5 = (rule, value, callback) => {
            if (this.dataForm.version.length == 0) {
                callback(new Error("请选择对应版本"))
            } else {
                callback()
            }
        }
        var validatePass6 = (rule, value, callback) => {
            if (this.dataForm.Abmodel == undefined) {
                callback(new Error("请上传ab模型"))
            } else {
                callback()
            }
        }
        return {
            dataLoading: false, // 是否显示加载窗
            dataList: [], // 数据列表
            multipleSelection: [], // 多选集合
            totalSize: 0, // 总条数
            pageSizes: [10, 30, 50], // 可选页大小
            params: { pageNum: 1, pageSize: 10 }, // 默认页数为 1,默认页大小为10 ---- 条件查询 页码+参数

            dialogFormVisible: false, // dialog 是否显示
            dialogTitle: "", // dialog标题
            updateFlag: false, // 是否是更新操作，否则新增
            dataForm: {
                name: "",
                desc: "",
                Glbmodel: "",
                Abmodel: "",
                preview: "",
                version: [],
                status: 0,
                switch: false
            }, // dialog 表单数据
            rules: {
                name: [{ validator: validatePass, trigger: "blur" }],
                desc: [{ validator: validatePass2, trigger: "blur" }],
                Glbmodel: [{ validator: validatePass3, trigger: "blur" }],
                Abmodel: [{ validator: validatePass6, trigger: "blur" }],
                preview: [{ validator: validatePass4, trigger: "blur" }],
                version: [{ validator: validatePass5, trigger: "blur" }]
            },
            fileList: [],
            fileList1: [],
            options: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        // 初始化数据
        fetchData() {
            this.dataLoading = true
            requestByGet(api.engineeringList, this.params)
                .then(value => {
                    this.dataLoading = false

                    console.log(value)
                    if (value.rspdata !== "" && value.rspdata !== null) {
                        console.log(value.rspdata.records)

                        this.dataList = value.rspdata.records
                        this.totalSize = value.rspdata.total
                    }
                    if (value.code == 403) {
                        localStorage.removeItem("jwt")
                    }
                })
                .catch(error => {
                    msgBox(1000)
                    this.dataLoading = true
                })

            requestByGet(api.productList, this.params)
                .then(value => {
                    console.log(value)
                    if (value.rspdata.records !== "") {
                        let options = value.rspdata.records.map(item => {
                            return {
                                label: item.productVersion,
                                value: item.productVersion
                            }
                        })
                        this.options = options
                    }
                    if (value.code == 403) {
                        localStorage.removeItem("jwt")
                    }
                })
                .catch(error => {
                    msgBox(1000)
                })
        },
        // 多选
        handleSelectionChange(val) {
            this.dialogVisible = true
            this.multipleSelection = val
        },
        // 添加数据
        handleAdd(formdata) {
            this.$refs.oneForm.validate(valid => {
                console.log(formdata)

                let reqdata = {
                    engineeringDesc: formdata.desc,
                    engineeringGlb: formdata.Glbmodel,
                    engineeringAb: formdata.Abmodel,
                    engineeringName: formdata.name,
                    engineeringPreview: formdata.preview,
                    engineeringStatus: formdata.status,
                    productVersion: formdata.version.join(",")
                }

                if (valid) {
                    requestByPost(api.engineering, reqdata).then(value => {
                        console.log(value)
                        if (value.code === 200) {
                            this.dialogFormVisible = false
                            this.fetchData()
                            // 清空填写内容
                            this.dataForm = {}
                        }
                    })
                } else {
                    msgBox(300)
                }
            })
        },
        // 更新数据
        handleUpdate(formdata) {
            this.$refs.oneForm.validate(valid => {
                let reqdata = {
                    engineeringDesc: formdata.desc,
                    engineeringGlb: formdata.Glbmodel,
                    engineeringAb: formdata.Abmodel,
                    engineeringName: formdata.name,
                    engineeringPreview: formdata.preview,
                    engineeringStatus: formdata.status,
                    engineeringId: formdata.id
                }

                console.log(reqdata)

                if (valid) {
                    requestByPut(api.engineering, JSON.stringify(reqdata)).then(value => {
                        console.log(value)

                        if (value.code === 200) {
                            this.dialogFormVisible = false
                            this.fetchData()
                            // 清空填写内容
                            this.dataForm = {}
                            customizeMsgBox(1, "更新成功")
                        }
                    })
                } else {
                    msgBox(300)
                }
            })
        },
        // 批量删除
        handleMultiDelete() {
            if (this.multipleSelection !== "" && this.multipleSelection != null) {
                var idArr = { c: [] }
                this.multipleSelection.forEach((item, index) => {
                    idArr.c.push(item.productId)
                })
                if (idArr.c.length > 0) {
                    this.$confirm("确认删除", "全部删除", {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消"
                    }).then(() => {
                        requestByDelete(api.orderProduct, JSON.stringify(idArr)).then(value => {
                            if (value.code === 2000) {
                                this.fetchData()
                            }
                        })
                    })
                }
            }
        },
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    console.log(index, row)

                    let idArr = { ids: [] }

                    idArr.ids.push(row.engineeringId)

                    requestByDelete(api.engineering, JSON.stringify(idArr)).then(value => {
                        if (value.code === 200) {
                            customizeMsgBox(1, "删除成功")
                            this.fetchData()
                        }
                    })
                })
                .catch(() => {
                    customizeMsgBox(4, "删除失败")
                })
        },
        // 添加按钮事件
        addClick(title) {
            this.dialogTitle = title
            this.dialogFormVisible = true
            this.updateFlag = false
            // 清空填写内容
            this.dataForm = {}
        },
        // 更新按钮事件
        updateClick(val, title) {
            console.log(val)

            let data = {
                name: val.engineeringName,
                desc: val.engineeringDesc,
                Glbmodel: val.engineeringGlb,
                Abmodel: val.engineeringAb,
                preview: val.engineeringPreview,
                status: val.engineeringStatus,
                version: val.productVersion.split(","),
                switch: val.engineeringStatus == 0 ? false : true,
                id: val.engineeringId
            }

            this.dialogTitle = title
            this.dialogFormVisible = true
            this.updateFlag = true
            this.dataForm = data

            this.$forceUpdate
        },
        // 每页/条切换事件
        handleSizeChange(val) {
            this.params.pageSize = val
            this.fetchData()
        },
        // 当前页切换事件
        handleCurrentChange(val) {
            this.params.pageNum = val
            this.fetchData()
        },
        timestamp() {
            var time = new Date()
            var y = time.getFullYear()
            var m = time.getMonth() + 1
            var d = time.getDate()
            var h = time.getHours()
            var mm = time.getMinutes()
            var s = time.getSeconds()
            return "" + y + this.add0(m) + this.add0(d) + this.add0(h) + this.add0(mm) + this.add0(s)
        },
        add0(m) {
            return m < 10 ? "0" + m : m
        },
        upload() {
            var file = document.getElementById("fileName").files[0]

            console.log(file)
            console.log(this.dataForm.Glbmodel)

            if (file == undefined || this.dataForm.Glbmodel != undefined) {
                return
            }

            const that = this

            const loading = this.$loading({
                lock: true,
                text: "正在上传请勿关闭",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            })

            var client = new OSS({
                region: "oss-cn-qingdao", //阿里云获取
                accessKeyId: "LTAI5t7QeaVRqWBiZ11KukvM",
                accessKeySecret: "dagZEVmFWoaHxilPvapIzlijY2dVeJ",
                bucket: "vrupload" //要存储的目录名
            })

            var val = document.getElementById("fileName").value
            // 取出文件后缀名

            console.log(this.timestamp())

            var suffix = val.substr(val.indexOf("."))

            var obj = suffix.substr(suffix.lastIndexOf(".") + 1) + unit.getNowFormatDate("/") + this.timestamp()
            // var storeAs = 'upload-file/' + "/" + obj + suffix;
            var storeAs = obj + suffix
            client
                .multipartUpload(storeAs, file)
                .then(function(result) {
                    loading.close()

                    switch (result.res.statusCode) {
                        case 200:
                            customizeMsgBox(1, "上传成功")
                            break
                        case 500:
                            customizeMsgBox(4, "上传失败")
                            break
                        default:
                            customizeMsgBox(4, "上传失败")
                            break
                    }
                    console.log(result)

                    var url = result.res.requestUrls[0]
                    var length = url.lastIndexOf("?")
                    var imgUrl = url.substr(0, length) //文件最终路径
                    // $("#img").attr("src",url.substr(0,length))

                    if (length !== -1) {
                        that.dataForm.Glbmodel = url.substr(0, length)
                    } else {
                        that.dataForm.Glbmodel = url
                    }
                    that.$forceUpdate()
                    console.log(that.dataForm.Glbmodel)
                })
                .catch(function(err) {
                    loading.close()
                    customizeMsgBox(4, "上传失败")
                    console.log(err)
                })
        },

        upload1() {
            var file = document.getElementById("fileName1").files[0]

            console.log(file)
            console.log(this.dataForm.preview)

            if (file == undefined || this.dataForm.preview != undefined) {
                return
            }

            const that = this

            const loading = this.$loading({
                lock: true,
                text: "正在上传请勿关闭",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            })

            var client = new OSS({
                region: "oss-cn-qingdao", //阿里云获取
                accessKeyId: "LTAI5t7QeaVRqWBiZ11KukvM",
                accessKeySecret: "dagZEVmFWoaHxilPvapIzlijY2dVeJ",
                bucket: "vrupload" //要存储的目录名
            })

            var val = document.getElementById("fileName1").value
            // 取出文件后缀名
            var suffix = val.substr(val.indexOf("."))
            var obj = suffix.substr(suffix.lastIndexOf(".") + 1) + unit.getNowFormatDate("/") + this.timestamp()
            // var storeAs = 'upload-file/' + "/" + obj + suffix;
            var storeAs = obj + suffix
            client
                .multipartUpload(storeAs, file)
                .then(function(result) {
                    loading.close()

                    switch (result.res.statusCode) {
                        case 200:
                            customizeMsgBox(1, "上传成功")
                            break
                        case 500:
                            customizeMsgBox(4, "上传失败")
                            break
                        default:
                            customizeMsgBox(4, "上传失败")
                            break
                    }
                    console.log(result)

                    var url = result.res.requestUrls[0]
                    var length = url.lastIndexOf("?")
                    var imgUrl = url.substr(0, length) //文件最终路径
                    // $("#img").attr("src",url.substr(0,length))

                    console.log(length)

                    if (length !== -1) {
                        that.dataForm.preview = url.substr(0, length)
                    } else {
                        that.dataForm.preview = url
                    }
                    that.$forceUpdate()
                    console.log(that.dataForm.preview)
                })
                .catch(function(err) {
                    loading.close()
                    customizeMsgBox(4, "上传失败")
                    console.log(err)
                })
        },
        upload2() {
            var file = document.getElementById("fileName2").files[0]

            console.log(file)
            console.log(this.dataForm.Abmodel)

            if (file == undefined || this.dataForm.Abmodel != undefined) {
                return
            }

            const that = this

            const loading = this.$loading({
                lock: true,
                text: "正在上传请勿关闭",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            })

            var client = new OSS({
                region: "oss-cn-qingdao", //阿里云获取
                accessKeyId: "LTAI5t7QeaVRqWBiZ11KukvM",
                accessKeySecret: "dagZEVmFWoaHxilPvapIzlijY2dVeJ",
                bucket: "vrupload" //要存储的目录名
            })

            var val = document.getElementById("fileName2").value
            // 取出文件后缀名
            var suffix = val.substr(val.indexOf("."))
            var obj = suffix.substr(suffix.lastIndexOf(".") + 1) + unit.getNowFormatDate("/") + this.timestamp()
            // var storeAs = 'upload-file/' + "/" + obj + suffix;
            var storeAs = obj + suffix
            client
                .multipartUpload(storeAs, file)
                .then(function(result) {
                    loading.close()

                    switch (result.res.statusCode) {
                        case 200:
                            customizeMsgBox(1, "上传成功")
                            break
                        case 500:
                            customizeMsgBox(4, "上传失败")
                            break
                        default:
                            customizeMsgBox(4, "上传失败")
                            break
                    }
                    console.log(result)

                    var url = result.res.requestUrls[0]
                    var length = url.lastIndexOf("?")
                    var imgUrl = url.substr(0, length) //文件最终路径
                    // $("#img").attr("src",url.substr(0,length))

                    console.log(length)

                    if (length !== -1) {
                        that.dataForm.Abmodel = url.substr(0, length)
                    } else {
                        that.dataForm.Abmodel = url
                    }
                    that.$forceUpdate()
                    console.log(that.dataForm.Abmodel)
                })
                .catch(function(err) {
                    loading.close()
                    customizeMsgBox(4, "上传失败")
                    console.log(err)
                })
        },
        clearUpdata(val) {
            if (val == 0) {
                document.getElementById("fileName").value = ""
                this.dataForm.Glbmodel = undefined
            } else if (val == 1) {
                document.getElementById("fileName1").value = ""
                this.dataForm.preview = undefined
            } else if (val == 2) {
                document.getElementById("fileName2").value = ""
                this.dataForm.Abmodel = undefined
            }
            this.$forceUpdate()
        },

        switchChange(callback) {
            this.dataForm.status = callback == true ? 1 : 0
        }
    }
}
</script>

<style lang="less" scoped>
.inputStyle {
    width: 200px;
}

.app-container {
    width: 96%;
    margin: auto;
}

.upload,
.upload1 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .uploadIcon {
        width: 30px;
        height: 30px;

        .icon {
            width: 100%;
            height: 100%;
            font-size: 10px;
        }
    }

    .clear {
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
}
</style>
