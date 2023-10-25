<template>
    <div class="app-container">
        <div class="top_search">
            <el-select v-model="params.branchName" placeholder="选择支系">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-input placeholder="房系名称" v-model="params.content" clearable class="search_input"></el-input>
            <el-button @click="searchList">
                <i class="el-icon-search" />
                查找
            </el-button>
            <el-button type="primary" @click="addClick('添加房系')">
                <i class="el-icon-plus" />
                新增房系
            </el-button>
            <el-button type="primary" @click="exportExcel">
                <i class="el-icon-download" />
                导出Excel
            </el-button>
        </div>
        <el-table
            v-loading="dataLoading"
            style="margin-top: 10px"
            :data="dataList"
            element-loading-text="Loading"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column label="地区" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.area }}</span>
                </template>
            </el-table-column>
            <el-table-column label="支系名称" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.houseBranch }}</span>
                </template>
            </el-table-column>
            <el-table-column label="房系名称" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.houseBranchName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="人数" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.houseNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="总系世次" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalBranch }}</span>
                </template>
            </el-table-column>
            <el-table-column label="总系简介" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalDescription }}</span>
                </template>
            </el-table-column>
            <el-table-column label="支系世次" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.secondBranchNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="支系简介" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.secondBranchDescription }}</span>
                </template>
            </el-table-column>
            <el-table-column label="房系简介" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.houseDescription }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建日期" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="建档人" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.establishPeople }}</span>
                </template>
            </el-table-column>
            <el-table-column label="提交码" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.submitCode }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新日期" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.updataTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button type="text" @click="updateClick(scope.row, '更新')">修改</el-button>
                    <el-button type="text">导出</el-button>
                    <el-button type="text">登记信息</el-button>
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
                    <div style="display: flex;justify-content: space-around">
                        <p style="width: 45%">
                            <el-form-item label="地区: " prop="area">
                                <el-cascader v-model="dataForm.area" size="large" :options="pcaTextArr"></el-cascader>
                            </el-form-item>

                            <el-form-item label="房系名称: " prop="houseBranchName">
                                <el-input
                                    v-model.lazy.trim="dataForm.houseBranchName"
                                    clearable
                                    placeholder="请输入房系名称"
                                />
                            </el-form-item>
                            <el-form-item label="入谱人数: ">
                                <el-input value="0" clearable disabled type="number" />
                            </el-form-item>

                            <el-form-item label="支系名称: " prop="houseBranch">
                                <el-select
                                    v-model.lazy.trim="dataForm.houseBranch"
                                    placeholder="请选择支系名称"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="总系简介: " prop="totalDescription">
                                <el-input v-model="dataForm.totalDescription" clearable placeholder="总系简介" />
                            </el-form-item>
                            <el-form-item label="总系世次: " prop="totalBranch">
                                <el-input
                                    v-model="dataForm.totalBranch"
                                    clearable
                                    placeholder="总系世次"
                                    type="number"
                                />
                            </el-form-item>
                            <el-form-item label="支系简介: " prop="secondBranchDescription">
                                <el-input v-model="dataForm.secondBranchDescription" clearable placeholder="支系简介" />
                            </el-form-item>
                        </p>
                        <p style="width: 45%;">
                            <el-form-item label="支系世次: " prop="secondBranchNumber">
                                <el-input
                                    v-model="dataForm.secondBranchNumber"
                                    clearable
                                    placeholder="支系世次"
                                    type="number"
                                />
                            </el-form-item>
                            <el-form-item label="房系简介: " prop="houseDescription">
                                <el-input v-model="dataForm.houseDescription" clearable placeholder="房系简介" />
                            </el-form-item>
                            <el-form-item label="房系世次: " prop="houseBranchNumber">
                                <el-input
                                    v-model="dataForm.houseBranchNumber"
                                    clearable
                                    placeholder="房系世次"
                                    type="number"
                                />
                            </el-form-item>
                            <el-form-item label="房系排序: " prop="houseSort">
                                <el-input v-model="dataForm.houseSort" clearable placeholder="房系排序" type="number" />
                            </el-form-item>
                            <el-form-item label="分房世次: " prop="roomNumber">
                                <el-input
                                    v-model="dataForm.roomNumber"
                                    clearable
                                    placeholder="分房世次"
                                    type="number"
                                />
                            </el-form-item>
                            <!--                            <el-form-item label="微信提交码: " prop="submitCode">-->
                            <!--                                <el-input-->
                            <!--                                    v-model="dataForm.submitCode"-->
                            <!--                                    clearable-->
                            <!--                                    type="number"-->
                            <!--                                    placeholder="不填自动生成"-->
                            <!--                                />-->
                            <!--                            </el-form-item>-->
                            <!--                            <el-form-item label="微信登记信息: " prop="resource">-->
                            <!--                                <el-radio-group v-model="resource" size="medium">-->
                            <!--                                    <el-radio border label="是"></el-radio>-->
                            <!--                                    <el-radio border label="否"></el-radio>-->
                            <!--                                </el-radio-group>-->
                            <!--                            </el-form-item>-->
                        </p>
                    </div>
                </el-form>
                <div slot="footer" style="text-align: center" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="updateFlag === false ? handleAdd(dataForm) : handleUpdate(dataForm)"
                        >提 交
                    </el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>
import { msgBox, customizeMsgBox } from "@/util/msgbox"
import { requestByGet, requestByPost, requestByPut, requestByDelete } from "@/api/globalApi"
import api from "@/api/apis"
import { pcaTextArr } from "element-china-area-data"
import util from "@/util/index"

export default {
    name: "OrderProduct",
    components: {},
    // eslint-disable-next-line vue/require-prop-types
    props: ["superiorId"],
    data() {
        var validatePass = (rule, value, callback) => {
            if (value == "" || value == undefined) {
                callback(new Error("不能为空"))
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
            params: { pageNum: 1, pageSize: 10, branchName: "", content: "" }, // 默认页数为 1,默认页大小为10 ---- 条件查询 页码+参数
            pcaTextArr,
            dialogFormVisible: false, // dialog 是否显示
            dialogTitle: "", // dialog标题
            updateFlag: false, // 是否是更新操作，否则新增
            dataForm: {
                area: [],
                houseBranchName: "",
                houseBranch: "",
                totalBranch: "",
                totalDescription: "",
                secondBranchNumber: "",
                secondBranchDescription: "",
                houseBranchNumber: "",
                houseSort: "",
                roomNumber: "",
                houseDescription: ""
            },

            rules: {
                area: [{ validator: validatePass, trigger: "blur" }],
                houseBranchName: [{ validator: validatePass, trigger: "blur" }],
                houseBranch: [{ validator: validatePass, trigger: "blur" }],
                totalBranch: [{ validator: validatePass, trigger: "blur" }],
                totalDescription: [{ validator: validatePass, trigger: "blur" }],
                secondBranchNumber: [{ validator: validatePass, trigger: "blur" }],
                secondBranchDescription: [{ validator: validatePass, trigger: "blur" }],
                houseBranchNumber: [{ validator: validatePass, trigger: "blur" }],
                houseSort: [{ validator: validatePass, trigger: "blur" }],
                roomNumber: [{ validator: validatePass, trigger: "blur" }],
                houseDescription: [{ validator: validatePass, trigger: "blur" }]
            },
            fileList: [],
            options: [],
            resource: "是"
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

            requestByGet(api.allBranch)
                .then(value => {
                    this.options = value.rspdata.map(item => {
                        return {
                            value: item,
                            label: item
                        }
                    })

                    this.options.push({
                        value: "全部",
                        label: "全部"
                    })
                })
                .catch(error => {})

            requestByGet(api.houseList, this.params)
                .then(value => {
                    this.dataLoading = false

                    if (value.rspdata !== "" && value.rspdata !== null) {
                        this.dataList = value.rspdata.records
                        this.totalSize = value.rspdata.total
                    } else {
                        this.dataList = []
                        this.totalSize = 0
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
                    formdata.area = formdata.area.join(",")
                    requestByPost(api.house, JSON.stringify(formdata)).then(value => {
                        if (value.code === 200) {
                            this.dialogFormVisible = false
                            this.fetchData()
                            // 清空填写内容
                            this.dataForm = {}
                            customizeMsgBox(1, "添加成功")
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
            console.log()
            if (Array.isArray(formdata.area)) formdata.area = formdata.area.join(",")

            this.$refs.oneForm.validate(valid => {
                if (valid) {
                    requestByPut(api.house, JSON.stringify(formdata)).then(value => {
                        if (value.code === 200 || value.code === 300) {
                            if (value.code === 300) customizeMsgBox(3, "数据未发生变化")

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
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let idArr = { ids: [] }

                    idArr.ids.push(row.houseBranchID)

                    requestByDelete(api.house, JSON.stringify(idArr)).then(value => {
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
            this.dataForm = { resource: "是" }
        },
        // 更新按钮事件
        updateClick(val, title) {
            let data = {
                houseBranchID: val.houseBranchID,
                area: val.area.split(","),
                houseBranchName: val.houseBranchName,
                houseBranch: val.houseBranch,
                totalBranch: val.totalBranch,
                totalDescription: val.totalDescription,
                secondBranchNumber: val.secondBranchNumber,
                secondBranchDescription: val.secondBranchDescription,
                houseBranchNumber: val.houseBranchNumber,
                houseSort: val.houseSort,
                roomNumber: val.roomNumber,
                houseDescription: val.houseDescription
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
        searchList() {
            this.fetchData()
        },
        clearUpdata() {
            document.getElementById("fileName").value = ""
            this.dataForm.productUrl = undefined
            this.$forceUpdate()

            console.log(document.getElementById("fileName").files[0])
        },
        exportExcel() {
            requestByGet(api.excel, { num: 2 }, "blob").then(value => {
                util.downloadFile(value, "application/vnd.ms-excel", "房系" + ".xlsx")
                // if (value.code === 2000) {
                //     this.fetchData()
                // }
            })
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

    .top_search {
        div {
            &:nth-child(2) {
                margin: 0 20px;
            }
        }

        .search_input {
            width: 13vw;
            max-width: 400px;
            min-width: 100px;
        }
    }
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
