<template>
    <div class="app-container">
        <!-- <el-button @click="addClick('添加')">
    <i class="el-icon-plus" />
    添加
  </el-button> -->
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
            <el-table-column label="用户Id" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="反馈信息" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.feedbackDesc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="反馈手机" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.feedbackIphone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="反馈邮箱" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.feedbackEmail }}</span>
                </template>
            </el-table-column>
            <el-table-column label="反馈状态" align="center">
                <template slot-scope="scope">
                    <span :style="scope.row.feedbackStatus == 0 ? 'color:red' : 'color:green'">{{
                        scope.row.feedbackStatus == 0 ? "未处理" : "已处理"
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="反馈时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="warning"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="detail(scope.$index, scope.row)"
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
                width="40%"
                modal
                :close-on-click-modal="true"
                :append-to-body="true"
                :modal-append-to-body="false"
            >
                <el-form ref="oneForm" label-position="right" label-width="150px" :model="dataForm" :rules="rules">
                    <el-form-item label="版本号: " prop="feedbackStatus">
                        <el-switch
                            v-model="dataForm.feedbackStatus"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="已处理"
                            inactive-text="未处理"
                        >
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="处理结果: " prop="productUrl">
                        <el-input
                            type="textarea"
                            v-model="dataForm.feedbackResult"
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
                    <el-button type="primary" @click="handleUpdate(dataForm)">提 交</el-button>
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
import router from "@/router/index"

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
                feedbackStatus: false,
                feedbackResult: ""
            }, // dialog 表单数据
            rules: {
                feedbackStatus: [{ validator: validatePass, trigger: "blur" }],
                feedbackResult: [{ validator: validatePass2, trigger: "blur" }]
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
            requestByGet(api.feedbackList, this.params)
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
                        }
                    })
                } else {
                    msgBox(300)
                }
            })
        },
        // 更新数据
        handleUpdate(formdata) {
            console.log(formdata)

            formdata.feedbackStatus = formdata.feedbackStatus == false ? 0 : 1

            this.$refs.oneForm.validate(valid => {
                if (valid) {
                    requestByPut(api.feedback, JSON.stringify(formdata)).then(value => {
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

        handleRemove(file) {
            console.log(file)

            this.dataForm.productUrl = undefined
        },
        handleSucess(response) {
            if (response.code == 500) {
                this.$refs.upload.clearFiles()
            } else if (response.code == 200) {
                this.dataForm.productUrl = response.rspdata.returnFileUrl
            } else {
                customizeMsgBox(4, "上传失败")
            }
        },
        handleBeforeUpload() {},
        handleError() {
            this.dataForm.productUrl = undefined
            this.$refs.upload.clearFiles()
        },
        handleChange(file) {
            const loading = this.$loading({
                lock: true,
                text: "正在上传请勿关闭",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            })

            if (file.response != undefined && file.status == "success") {
                loading.close()

                switch (file.response.code) {
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
            } else if (file.response == undefined && file.status == "fail") {
                loading.close()
                customizeMsgBox(4, "上传失败")
            }

            console.log(file, file.response)
        },

        detail(index, row) {
            this.dialogTitle = "反馈详情"
            this.dialogFormVisible = true
            console.log(index, row)
            this.dataForm = row
            this.dataForm.feedbackStatus = row.feedbackStatus == 0 ? false : true
        }
    }
}
</script>

<style>
.inputStyle {
    width: 200px;
}

.app-container {
    width: 96%;
    margin: auto;
}
</style>
