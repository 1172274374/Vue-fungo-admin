<template>
    <div class="app-container">
        <!-- <el-button @click="addClick('添加')">
      <i class="el-icon-plus" />
      添加
    </el-button>
    <el-button @click="handleMultiDelete">
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
            <el-table-column label="订单号" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderNo }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户id" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.payWay }}</span>
                </template>
            </el-table-column>
            <el-table-column label="支付金额" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalFee }}元</span>
                </template>
            </el-table-column>
            <el-table-column label="支付状态" align="center">
                <template slot-scope="scope">
                    <span
                        :style="
                            scope.row.orderStatus == '未支付'
                                ? 'color:red'
                                : scope.row.orderStatus == '支付成功'
                                ? 'color:green'
                                : 'color:#efc467'
                        "
                        >{{ scope.row.orderStatus }}</span
                    >
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="warning"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="updateClick(scope.row, '更新数据')"
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
                width="70%"
                modal
                :close-on-click-modal="false"
                :append-to-body="true"
            >
                <el-form ref="oneForm" label-position="right" label-width="150px" :model="dataForm" :rules="rules">
                    <el-form-item label="版本号: " prop="productName" required>
                        <el-input
                            v-model="dataForm.productName"
                            clearable
                            placeholder="请输入产品名称"
                            style="width: 60%"
                        />
                    </el-form-item>
                    <el-form-item label="上传: " prop="productNo" required>
                        <el-input
                            v-model="dataForm.productNo"
                            clearable
                            placeholder="请输入产品编号"
                            style="width: 60%"
                        />
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
//   import { UTCToformat } from "@/utils";
import { requestByGet, requestByPost, requestByPut, requestByDelete } from "@/api/globalApi"
import api from "@/api/apis"

export default {
    name: "orderProduct",
    components: {},
    // eslint-disable-next-line vue/require-prop-types
    props: ["superiorId"],
    data() {
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
            dataForm: {}, // dialog 表单数据
            rules: {}, // 表单验证
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        // 初始化数据
        fetchData() {
            this.dataLoading = true
            requestByGet(api.orderList, this.params)
                .then((value) => {
                    console.log(value)

                    this.dataLoading = false
                    if (value.rspdata !== "" && value.rspdata !== null) {
                        this.dataList = value.rspdata.records
                        this.totalSize = value.rspdata.total
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
                if (valid) {
                    formdata.orderId = this.superiorId
                    requestByPost(api.orderProduct, JSON.stringify(formdata)).then((v) => {
                        if (v.code === 2000) {
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
            this.$refs.oneForm.validate((valid) => {
                if (valid) {
                    requestByPut(api.orderProduct, JSON.stringify(formdata)).then((value) => {
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
                        cancelButtonText: "取消",
                    }).then(() => {
                        requestByDelete(api.orderProduct, JSON.stringify(idArr)).then((value) => {
                            if (value.code === 2000) {
                                this.fetchData()
                            }
                        })
                    })
                }
            }
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
    },
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
