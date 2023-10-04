<template>
    <div class="app-container">
        <el-button @click="addClick('添加商铺')">
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
            <el-table-column label="商铺名字" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.floorName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商铺地址" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.floorAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商铺图片" align="center">
                <template slot-scope="scope">
                    <a :href="scope.row.floorPic" target="_blank"
                        ><img :src="scope.row.floorPic" alt="" style="width: 60%; height: auto"
                    /></a>
                </template>
            </el-table-column>
            <el-table-column label="联系电话" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.floorIphone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商铺管理人" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.floorManager }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商铺类型" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.floorClass }}</span>
                </template>
            </el-table-column>
            <el-table-column label="所属大楼" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.floorTower }}</span>
                </template>
            </el-table-column>
            <el-table-column label="审核通过时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.auditTime }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-setting" circle @click="updateClick(scope.row, '更新')" />
            <el-button
              type="danger"
              size="mini"    
              circle
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column> -->
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
                    <el-form-item label="商铺名称: " prop="floorName">
                        <el-input
                            v-model="dataForm.floorName"
                            clearable
                            placeholder="请输入商铺名称"
                            style="width: 60%"
                        />
                    </el-form-item>
                    <el-form-item label="电话: " prop="floorIphone">
                        <el-input
                            v-model="dataForm.floorIphone"
                            clearable
                            placeholder="请输入商铺电话"
                            style="width: 60%"
                        />
                    </el-form-item>
                    <el-form-item label="大楼: " prop="floorTower">
                        <el-input v-model="dataForm.floorTower" clearable placeholder="请输入大楼" style="width: 60%" />
                    </el-form-item>
                    <el-form-item label="详细地址: " prop="floorAddress">
                        <el-input
                            type="textarea"
                            v-model="dataForm.floorAddress"
                            resize="none"
                            :show-word-limit="true"
                            :clearable="true"
                            rows="4"
                            placeholder="请输入详细地址"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商铺照片: " prop="floorPic">
                        <div class="upload1">
                            <input type="file" id="fileName1" @mouseout="upload1" />
                            <div class="uploadIcon" v-if="dataForm.floorPic != undefined">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-chenggong"></use>
                                </svg>
                            </div>
                            <div class="clear" v-if="dataForm.floorPic != undefined" @click="clearUpdata(1)">清除</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="商铺类型: " prop="floorClass">
                        <el-select v-model="dataForm.floorClass" placeholder="请选择">
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
                </el-form>
                <div slot="footer" style="text-align: center" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="updateFlag == false ? handleAdd(dataForm) : handleUpdate(dataForm)"
                        >提 交</el-button
                    >
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
    name: "orderProduct",
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
            if (this.dataForm.floorPic == undefined) {
                callback(new Error("请上传商铺图片"))
            } else {
                callback()
            }
        }
        var validatePass4 = (rule, value, callback) => {
            if (value == undefined || value == "") {
                callback(new Error("请上传预览图"))
            } else {
                callback()
            }
        }
        var validatePass5 = (rule, value, callback) => {
            if (value == undefined || value == "") {
                callback(new Error("请选择对应版本"))
            } else {
                callback()
            }
        }
        var validatePass6 = (rule, value, callback) => {
            if (value == undefined || value == "") {
                callback(new Error("请选择对应版本"))
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
                floorName: "",
                floorAddress: "",
                floorPic: "",
                floorClass: "",
                floorIphone: "",
                floorTower: "",
            }, // dialog 表单数据
            rules: {
                floorName: [{ validator: validatePass, trigger: "blur" }],
                floorAddress: [{ validator: validatePass2, trigger: "blur" }],
                floorPic: [{ validator: validatePass3, trigger: "blur" }],
                floorClass: [{ validator: validatePass4, trigger: "blur" }],
                floorIphone: [{ validator: validatePass5, trigger: "blur" }],
                floorTower: [{ validator: validatePass6, trigger: "blur" }],
            },
            fileList: [],
            fileList1: [],
            options: [
                {
                    label: "便利店",
                    value: "便利店",
                },
                {
                    label: "超市",
                    value: "超市",
                },
                {
                    label: "百货店",
                    value: "百货店",
                },
                {
                    label: "专业店",
                    value: "专业店",
                },
                {
                    label: "体验店",
                    value: "体验店",
                },
            ],
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        // 初始化数据
        fetchData() {
            this.dataLoading = true
            requestByGet(api.floorList, this.params)
                .then((value) => {
                    this.dataLoading = false

                    if (value.rspdata !== "" && value.rspdata !== null) {
                        console.log(value.rspdata.records)

                        this.dataList = value.rspdata.records.filter((item) => {
                            return item.floorAuditProcess == 2
                        })

                        console.log(this.dataList)
                        this.totalSize = this.dataList.length
                    }
                    if (value.code == 403) {
                        localStorage.removeItem("jwt")
                    }
                })
                .catch((error) => {
                    msgBox(1000)
                    this.dataLoading = true
                })
        },
        // 多选
        handleSelectionChange(val) {
            this.dialogVisible = true
            this.multipleSelection = val
        },
        // 添加数据
        handleAdd(formdata) {
            this.$refs.oneForm.validate((valid) => {
                formdata.floorManager = localStorage.getItem("userName")

                if (valid) {
                    requestByPost(api.floor, formdata).then((value) => {
                        if (value.code === 200) {
                            this.dialogFormVisible = false
                            this.fetchData()
                            // 清空填写内容
                            this.dataForm = {}

                            customizeMsgBox(1, "添加审核成功")
                        }
                    })
                } else {
                    msgBox(300)
                }
            })
        },
        // 更新数据
        handleUpdate(formdata) {
            this.$refs.oneForm.validate((valid) => {
                let reqdata = {
                    templateDesc: formdata.desc,
                    templateJson: formdata.model,
                    templateName: formdata.name,
                    templatePreview: formdata.preview,
                    templateVersion: formdata.version.join(","),
                    templateId: formdata.id,
                }

                console.log(reqdata)

                if (valid) {
                    requestByPut(api.template, JSON.stringify(reqdata)).then((value) => {
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
                        cancelButtonText: "取消",
                    }).then(() => {
                        requestByDelete(api.template, JSON.stringify(idArr)).then((value) => {
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
                type: "warning",
            })
                .then(() => {
                    console.log(index, row)

                    let idArr = { ids: [] }

                    idArr.ids.push(row.templateId)

                    requestByDelete(api.template, JSON.stringify(idArr)).then((value) => {
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
            let data = {
                name: val.templateName,
                desc: val.templateDesc,
                model: val.templateJson,
                preview: val.templatePreview,
                version: val.templateVersion.split(","),
                id: val.templateId,
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

            if (file == undefined || this.dataForm.model != undefined) {
                return
            }

            const that = this

            const loading = this.$loading({
                lock: true,
                text: "正在上传请勿关闭",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            })

            var client = new OSS({
                region: "oss-cn-qingdao", //阿里云获取
                accessKeyId: "LTAI5t7QeaVRqWBiZ11KukvM",
                accessKeySecret: "dagZEVmFWoaHxilPvapIzlijY2dVeJ",
                bucket: "vrupload", //要存储的目录名
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
                .then(function (result) {
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
                        that.dataForm.model = url.substr(0, length)
                    } else {
                        that.dataForm.model = url
                    }
                    that.$forceUpdate()
                    console.log(that.dataForm.model)
                })
                .catch(function (err) {
                    loading.close()
                    customizeMsgBox(4, "上传失败")
                    console.log(err)
                })
        },

        upload1() {
            var file = document.getElementById("fileName1").files[0]

            if (file == undefined || this.dataForm.floorPic != undefined) {
                return
            }

            const that = this

            const loading = this.$loading({
                lock: true,
                text: "正在上传请勿关闭",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            })

            var client = new OSS({
                region: "oss-cn-qingdao", //阿里云获取
                accessKeyId: "LTAI5t7QeaVRqWBiZ11KukvM",
                accessKeySecret: "dagZEVmFWoaHxilPvapIzlijY2dVeJ",
                bucket: "vrupload", //要存储的目录名
            })

            var val = document.getElementById("fileName1").value
            // 取出文件后缀名
            var suffix = val.substr(val.indexOf("."))
            var obj = suffix.substr(suffix.lastIndexOf(".") + 1) + unit.getNowFormatDate("/") + this.timestamp()
            // var storeAs = 'upload-file/' + "/" + obj + suffix;
            var storeAs = obj + suffix
            client
                .multipartUpload(storeAs, file)
                .then(function (result) {
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
                        that.dataForm.floorPic = url.substr(0, length)
                    } else {
                        that.dataForm.floorPic = url
                    }
                    that.$forceUpdate()
                    console.log(that.dataForm.floorPic)
                })
                .catch(function (err) {
                    loading.close()
                    customizeMsgBox(4, "上传失败")
                    console.log(err)
                })
        },
        upload2() {
            var file = document.getElementById("fileName2").files[0]

            if (file == undefined || this.dataForm.Abmodel != undefined) {
                return
            }

            const that = this

            const loading = this.$loading({
                lock: true,
                text: "正在上传请勿关闭",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            })

            var client = new OSS({
                region: "oss-cn-qingdao", //阿里云获取
                accessKeyId: "LTAI5t7QeaVRqWBiZ11KukvM",
                accessKeySecret: "dagZEVmFWoaHxilPvapIzlijY2dVeJ",
                bucket: "vrupload", //要存储的目录名
            })

            var val = document.getElementById("fileName2").value
            // 取出文件后缀名
            var suffix = val.substr(val.indexOf("."))
            var obj = suffix.substr(suffix.lastIndexOf(".") + 1) + unit.getNowFormatDate("/") + this.timestamp()
            // var storeAs = 'upload-file/' + "/" + obj + suffix;
            var storeAs = obj + suffix
            client
                .multipartUpload(storeAs, file)
                .then(function (result) {
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
                .catch(function (err) {
                    loading.close()
                    customizeMsgBox(4, "上传失败")
                    console.log(err)
                })
        },
        clearUpdata(val) {
            if (val == 0) {
                document.getElementById("fileName").value = ""
                this.dataForm.model = undefined
            } else if (val == 1) {
                document.getElementById("fileName1").value = ""
                this.dataForm.floorPic = undefined
            } else if (val == 2) {
                document.getElementById("fileName2").value = ""
                this.dataForm.Abmodel = undefined
            }
            this.$forceUpdate()
        },

        switchChange(callback) {
            this.dataForm.status = callback == true ? 1 : 0
        },
    },
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
