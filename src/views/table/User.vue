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
        <div style="margin-top: 15px; width: 300px">
            <el-input placeholder="请输入用户id" v-model="params.userId" class="input-with-select" @blur="searchuser">
                <el-button slot="append" icon="el-icon-search" @click="searchuser"></el-button>
            </el-input>
        </div>
        <el-table
            v-loading="dataLoading"
            style="margin-top: 10px"
            :data="dataList"
            element-loading-text="Loading"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column label="用户名" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.nickname }}</span>
                </template>
            </el-table-column>
            <el-table-column label="手机号" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.iphone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="EMAIL" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.email }}</span>
                </template>
            </el-table-column>
            <el-table-column label="地址" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                </template>
            </el-table-column>
            <el-table-column label="会员等级" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.vip == "0" ? "试用会员" : "vip会员" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="warning"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="updateClick(scope.row, '用户信息')"
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
                    <el-form-item label="头像:" class="avatar">
                        <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            :size="100"
                            v-if="dataForm.headimgurl == null"
                        ></el-avatar>
                        <el-avatar :src="dataForm.headimgurl" :size="100" v-else></el-avatar>
                    </el-form-item>
                    <el-form-item label="用户id:">
                        <span>{{ dataForm.userId }}</span>
                    </el-form-item>
                    <el-form-item label="用户名:">
                        <span>{{ dataForm.nickname }}</span>
                    </el-form-item>
                    <el-form-item label="手机号:">
                        <span>{{ dataForm.iphone }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱:">
                        <span>{{ dataForm.email }}</span>
                    </el-form-item>
                    <el-form-item label="公司:">
                        <span>{{ dataForm.company }}</span>
                    </el-form-item>
                    <el-form-item label="地址:">
                        <span>{{ dataForm.address }}</span>
                    </el-form-item>
                    <el-form-item label="会员:">
                        <span>{{
                            dataForm.vip == "0"
                                ? "试用会员"
                                : dataForm.vip == "1"
                                ? "月费会员"
                                : dataForm.vip == "2"
                                ? "年费会员"
                                : "数据异常"
                        }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间:">
                        <span>{{ dataForm.createTime }}</span>
                    </el-form-item>
                    <el-form-item label="封禁:" prop="delivery">
                        <el-switch v-model="switchValue" active-color="red" @change="switchChange"> </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" style="text-align: center" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">关闭</el-button>
                    <!-- <el-button type="primary" @click="updateFlag == false ? handleAdd(dataForm) : handleUpdate(dataForm)"
            >提 交</el-button
          > -->
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
            params: { pageNum: 1, pageSize: 10, userId: "" }, // 默认页数为 1,默认页大小为10 ---- 条件查询 页码+参数
            dialogFormVisible: false, // dialog 是否显示
            dialogTitle: "", // dialog标题
            updateFlag: false, // 是否是更新操作，否则新增
            dataForm: {}, // dialog 表单数据
            rules: {}, // 表单验证
            switchValue: false,
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        // 初始化数据
        fetchData() {
            this.dataLoading = true
            requestByGet(api.userList, this.params)
                .then((value) => {
                    console.log(value)
                    this.dataLoading = false
                    if (value.code == 200) {
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
            if (val.interdiction == 1) {
                this.switchValue = true
            } else {
                this.switchValue = false
            }
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
        switchChange(val) {
            val == true ? (this.dataForm.interdiction = 1) : (this.dataForm.interdiction = 0)

            let req = {
                code: this.dataForm.interdiction,
                userId: this.dataForm.userId,
            }

            console.log(req)

            requestByPost(api.band, {}, req)
                .then((value) => {
                    console.log(value)
                })
                .catch((error) => {
                    msgBox(1000)
                    this.dataLoading = true
                })
        },
        searchuser() {
            this.fetchData()
        },
    },
}
</script>

<style lang="less" scoped>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.inputStyle {
    width: 200px;
}

.app-container {
    width: 96%;
    margin: auto;
}

.avatar {
    display: flex;
    justify-content: left;
    align-items: center;
    &::v-deep .el-form-item__content {
        margin-left: 0 !important;
    }
}
</style>
