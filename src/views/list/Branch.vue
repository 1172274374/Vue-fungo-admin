<template>
    <div class="app-container">
        <div class="top_search">
            <el-select v-model="params.isEnable" placeholder="启用或者禁用">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-input placeholder="支系名称或堂号" v-model="params.content" clearable class="search_input"></el-input>
            <el-button @click="searchList">
                <i class="el-icon-search" />
                查找
            </el-button>
            <!--            <el-button type="primary" >-->
            <!--                <i class="el-icon-plus" />-->
            <!--                新增房系-->
            <!--            </el-button>-->
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
                    <span>{{ scope.row.branArea }}</span>
                </template>
            </el-table-column>
            <el-table-column label="支系名称" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.branName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="堂号" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.branNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="字辈" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.branZhiBei }}</span>
                </template>
            </el-table-column>
            <el-table-column label="联系人" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.branContact }}</span>
                </template>
            </el-table-column>
            <el-table-column label="联系电话" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.branContactIphone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建日期" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建人" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.branEstablishPeople }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <span :style="scope.row.branStatue == 1 ? 'color:green' : 'color:red'">{{
                        scope.row.branStatue == 1 ? "启用" : "禁用"
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button type="text" @click="updateClick(scope.row, '更新')">修改</el-button>
                    <el-button type="text">授权</el-button>
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
                    <el-form-item label="地区: " prop="area">
                        <el-cascader v-model="dataForm.area" size="large" :options="pcaTextArr"></el-cascader>
                    </el-form-item>

                    <el-form-item label="支系名称: " prop="branchName">
                        <el-input
                            v-model.lazy.trim="dataForm.branchName"
                            clearable
                            placeholder="请输入支系名称"
                            style="width: 60%"
                        />
                    </el-form-item>
                    <el-form-item label="堂号: " prop="branchNumber">
                        <el-input
                            v-model.lazy.trim="dataForm.branchNumber"
                            clearable
                            placeholder="请输入堂号"
                            style="width: 60%"
                        />
                    </el-form-item>
                    <el-form-item label="所属姓氏: " prop="lastName">
                        <el-select v-model.lazy.trim="dataForm.lastName" placeholder="请选择">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="字辈: " prop="branchZhi">
                        <el-input
                            v-model.lazy.trim="dataForm.branchZhi"
                            clearable
                            placeholder="请输入字辈"
                            style="width: 60%"
                        />
                    </el-form-item>
                    <el-form-item label="字辈启用次数: " prop="enableNumber">
                        <el-input
                            v-model="dataForm.enableNumber"
                            clearable
                            placeholder="请输入字辈启用次数"
                            style="width: 60%"
                            type="number"
                        />
                    </el-form-item>
                    <el-form-item label="是否: " prop="enableNumber">
                        <el-switch v-model="dataForm.branStatue" active-text="启用" inactive-text="禁用"></el-switch>
                    </el-form-item>
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
//   import { UTCToformat } from "@/utils";
import { requestByGet, requestByPost, requestByPut, requestByDelete } from "@/api/globalApi"
import api from "@/api/apis"
import { pcaTextArr } from "element-china-area-data"
import util from "@/util/index"
import { BranchOption } from "@/api/project"

export default {
    name: "OrderProduct",
    components: {},
    // eslint-disable-next-line vue/require-prop-types
    props: ["superiorId"],
    data() {
        var validatePass = (rule, value, callback) => {
            console.log(value)
            if (value == "" || value == undefined) {
                callback(new Error("请选择地区"))
            } else {
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value == "" || value == undefined) {
                callback(new Error("请填写名称"))
            } else {
                callback()
            }
        }
        var validatePass3 = (rule, value, callback) => {
            if (value == "" || value == undefined) {
                callback(new Error("请填写堂号"))
            } else {
                callback()
            }
        }
        var validatePass4 = (rule, value, callback) => {
            if (value == "" || value == undefined) {
                callback(new Error("请选择姓氏"))
            } else {
                callback()
            }
        }
        var validatePass5 = (rule, value, callback) => {
            if (value == "" || value == undefined) {
                callback(new Error("请输入字辈"))
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
            params: { pageNum: 1, pageSize: 10, isEnable: "", content: "" }, // 默认页数为 1,默认页大小为10 ---- 条件查询 页码+参数
            pcaTextArr,
            dialogFormVisible: false, // dialog 是否显示
            dialogTitle: "", // dialog标题
            updateFlag: false, // 是否是更新操作，否则新增
            dataForm: {
                area: [],
                branchName: "",
                branchNumber: "",
                lastName: "",
                branchZhi: "",
                enableNumber: 0,
                branStatue: false
            },

            rules: {
                area: [{ validator: validatePass, trigger: "blur" }],
                branchName: [{ validator: validatePass2, trigger: "blur" }],
                branchNumber: [{ validator: validatePass3, trigger: "blur" }],
                lastName: [{ validator: validatePass4, trigger: "blur" }],
                branchZhi: [{ validator: validatePass5, trigger: "blur" }]
            },
            fileList: [],
            options: BranchOption,

            options2: [
                {
                    value: "罗",
                    label: "罗"
                },
                {
                    value: "冉",
                    label: "冉"
                }
            ]
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
            requestByGet(api.branchList, this.params)
                .then(value => {
                    this.dataLoading = false

                    console.log(value)
                    if (value.rspdata !== "" && value.rspdata !== null) {
                        console.log(value.rspdata.records)

                        this.dataList = value.rspdata.records
                        this.totalSize = value.rspdata.total
                    } else {
                        this.dataList = []
                        this.totalSize = 0
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
            let reqData = {
                branId: formdata.branId,
                branArea: formdata.area.join(","),
                branName: formdata.branchName,
                branNumber: formdata.branchNumber,
                branStatue: formdata.branStatue === true ? 1 : 0,
                branZhiBei: formdata.branchZhi,
                enableNumber: formdata.enableNumber,
                lastName: formdata.lastName
            }

            this.$refs.oneForm.validate(valid => {
                if (valid) {
                    requestByPut(api.branch, JSON.stringify(reqData)).then(value => {
                        console.log(value)
                        if (value.code === 200 || value.code === 300) {
                            if (value.code === 300) customizeMsgBox(3, "数据未发生变化")

                            this.dialogFormVisible = false
                            this.fetchData()
                            // 清空填写内容
                            this.dataForm = {}

                            customizeMsgBox(1, "修改成功")
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

                    idArr.ids.push(row.branId)

                    requestByDelete(api.branch, JSON.stringify(idArr)).then(value => {
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
                branId: val.branId,
                area: val.branArea.split(","),
                branchName: val.branName,
                branchNumber: val.branNumber,
                lastName: val.lastName,
                branchZhi: val.branZhiBei,
                enableNumber: val.enableNumber,
                branStatue: val.branStatue !== 0
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
            requestByGet(api.excel, { num: 1 }, "blob").then(value => {
                util.downloadFile(value, "application/vnd.ms-excel", "族谱" + ".xlsx")
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
