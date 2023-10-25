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
            <el-table-column label="版本" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.productVersion }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新信息" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.productDesc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="上传时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
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
                    <el-form-item label="版本号: " prop="productVersion">
                        <el-input
                            v-model="dataForm.productVersion"
                            clearable
                            placeholder="请输入产品版本"
                            style="width: 60%"
                            type="number"
                        />
                    </el-form-item>
                    <el-form-item label="上传: " prop="productUrl">
                        <div class="upload">
                            <input type="file" id="fileName" @mouseout="upload" />
                            <div class="uploadIcon" v-if="dataForm.productUrl != undefined">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-chenggong"></use>
                                </svg>
                            </div>
                            <div class="clear" v-if="dataForm.productUrl != undefined" @click="clearUpdata">清除</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="版本描述: " prop="productDesc">
                        <el-input
                            type="textarea"
                            v-model="dataForm.productDesc"
                            resize="none"
                            :show-word-limit="true"
                            :clearable="true"
                            rows="8"
                        >
                        </el-input>
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
//   import { UTCToformat } from "@/utils";
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
            if (value == undefined) {
                callback(new Error("请输入版本号"))
            } else {
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (this.dataForm.productUrl == undefined) {
                callback(new Error("请上传软件"))
            } else {
                callback()
            }
        }
        var validatePass3 = (rule, value, callback) => {
            if (this.dataForm.productDesc == undefined) {
                callback(new Error("请填写更新内容"))
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
                productVersion: "",
                productUrl: "",
                productDesc: ""
            }, // dialog 表单数据
            rules: {
                productVersion: [{ validator: validatePass, trigger: "blur" }],
                productUrl: [{ validator: validatePass2, trigger: "blur" }],
                productDesc: [{ validator: validatePass3, trigger: "blur" }]
            },
            fileList: []
        }
    },
    created() {
        // console.log(this.superiorId)
        this.fetchData()
    },
    methods: {
        // 初始化数据
        fetchData() {
            this.dataLoading = true
            requestByGet(api.productList, this.params)
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
        },
        // 多选
        handleSelectionChange(val) {
            this.dialogVisible = true
            this.multipleSelection = val
        },
        // 添加数据
        handleAdd(formdata) {
            this.$refs.oneForm.validate(valid => {
                if (valid) {
                    requestByPost(api.Product, JSON.stringify(formdata)).then(value => {
                        if (value.code === 200) {
                            this.dialogFormVisible = false
                            this.fetchData()
                            // 清空填写内容
                            this.dataForm = {}
                        } else {
                            customizeMsgBox(4, "添加失败")
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
                if (valid) {
                    requestByPut(api.orderProduct, JSON.stringify(formdata)).then(value => {
                        if (value.code === 2000) {
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

                    idArr.ids.push(row.productId)

                    requestByDelete(api.Product, JSON.stringify(idArr)).then(value => {
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
            this.dialogTitle = title
            this.dialogFormVisible = true
            this.updateFlag = true
            this.dataForm = val
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
            console.log(this.dataForm.productUrl)

            if (file == undefined || this.dataForm.productUrl != undefined) {
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
            var suffix = val.substr(val.indexOf("."))
            var obj = this.timestamp()
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

                    if (file.type == "image/jpeg") {
                        that.dataForm.productUrl = url.substr(0, length)
                    } else {
                        that.dataForm.productUrl = url
                    }
                    that.$forceUpdate()
                    console.log(that.dataForm.productUrl)
                })
                .catch(function(err) {
                    loading.close()
                    customizeMsgBox(4, "上传失败")
                    console.log(err)
                })
        },
        clearUpdata() {
            document.getElementById("fileName").value = ""
            this.dataForm.productUrl = undefined
            this.$forceUpdate()

            console.log(document.getElementById("fileName").files[0])
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

.upload {
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
