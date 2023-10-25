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
            <el-cascader v-model="dataForm.area" size="large" :options="pcaTextArr"></el-cascader>
            <el-select v-model="params.isEnable" placeholder="启用或者禁用">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-select v-model="params.isEnable" placeholder="启用或者禁用">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-button @click="searchList">
                <i class="el-icon-search" />
                查找房系
            </el-button>
        </div>
        <div class="statistics" style="margin-top: 10px">
            <el-descriptions class="margin-top" title="家族数据统计" :column="3" :size="size" border>
                <template slot="extra">
                    <el-button type="primary" size="small">操作</el-button>
                </template>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        族谱人数
                    </template>
                    112
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        族谱路径
                    </template>
                    豫章羅氏大成谱
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        男女比例
                    </template>
                    56/34
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        备注
                    </template>
                    本族共112人
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        联系地址
                    </template>
                    江苏省苏州市吴中区吴中大道 1188 号
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <el-row>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <p class="btnList">
                    <el-button type="primary" @click="exportExcel" size="small">
                        <i class="el-icon-download" />
                        新增子女
                    </el-button>
                </p>
            </el-col>

            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <p class="btnList">
                    <el-button type="info" @click="exportExcel" size="small">
                        <i class="el-icon-download" />
                        修改本人
                    </el-button>
                </p>
            </el-col>

            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <p class="btnList">
                    <el-button type="success" @click="exportExcel" size="small">
                        <i class="el-icon-download" />
                        删除本人
                    </el-button>
                </p>
            </el-col>

            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <p class="btnList">
                    <el-button type="warning" @click="exportExcel" size="small">
                        <i class="el-icon-download" />
                        创建房系
                    </el-button>
                </p>
            </el-col>

            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <p class="btnList">
                    <el-button type="danger" @click="exportExcel" size="small">
                        <i class="el-icon-download" />
                        合并房系
                    </el-button>
                </p>
            </el-col>

            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <p class="btnList">
                    <el-button type="primary" @click="exportExcel" size="small">
                        <i class="el-icon-download" />
                        快速查找
                    </el-button>
                </p>
            </el-col>

            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <p class="btnList">
                    <el-button type="primary" @click="exportExcel" size="small">
                        <i class="el-icon-download" />
                        导出世系图表
                    </el-button>
                </p>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            @node-click="handleNodeClick"
                            :default-expand-all="true"
                            :expand-on-click-node="false"
                        ></el-tree>
                    </el-card>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="grid-content bg-purple-light">
                    <el-card class="box-card">
                        <el-descriptions title="本人信息" :column="2" border>
                            <el-descriptions-item
                                label="用户名"
                                label-class-name="my-label"
                                content-class-name="my-content"
                                :content-style="{ 'text-align': 'center' }"
                            >
                                {{ personalData?.peopleName }}
                            </el-descriptions-item>
                            <el-descriptions-item label="电话" :content-style="{ 'text-align': 'center' }"
                                >{{ personalData?.iphone }}
                            </el-descriptions-item>
                            <el-descriptions-item label="居住地" :content-style="{ 'text-align': 'center' }"
                                >{{ personalData?.address }}
                            </el-descriptions-item>
                            <el-descriptions-item label="照片" :content-style="{ 'text-align': 'center' }">
                                <img :src="personalData?.peoplePic" alt="" style="width: 100px" />
                            </el-descriptions-item>
                            <el-descriptions-item label="支系" :content-style="{ 'text-align': 'center' }"
                                >{{ personalData?.branch }}
                            </el-descriptions-item>
                            <el-descriptions-item label="房系" :content-style="{ 'text-align': 'center' }"
                                >{{ personalData?.houseBranch }}
                            </el-descriptions-item>
                            <el-descriptions-item label="备注" :content-style="{ 'text-align': 'center' }"
                                >{{ personalData?.remarks }}
                            </el-descriptions-item>
                            <el-descriptions-item label="本人行传" :content-style="{ 'text-align': 'center' }"
                                >{{ personalData?.peopleDescription }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                    <el-card class="box-card" style="margin-top: 10px">
                        <el-descriptions title="妻子信息" :column="3" border>
                            <el-descriptions-item
                                label="用户名"
                                label-class-name="my-label"
                                content-class-name="my-content"
                                :content-style="{ 'text-align': 'center' }"
                            >
                                kooriookami
                            </el-descriptions-item>
                            <el-descriptions-item label="手机号" :content-style="{ 'text-align': 'center' }"
                                >18100000000
                            </el-descriptions-item>
                            <el-descriptions-item label="居住地" :content-style="{ 'text-align': 'center' }"
                                >苏州市
                            </el-descriptions-item>
                            <el-descriptions-item label="备注" :content-style="{ 'text-align': 'center' }">
                                <el-tag size="small">学校</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址" :content-style="{ 'text-align': 'center' }"
                                >江苏省苏州市吴中区吴中大道 1188 号
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址" :content-style="{ 'text-align': 'center' }"
                                >江苏省苏州市吴中区吴中大道 1188 号
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址" :content-style="{ 'text-align': 'center' }"
                                >江苏省苏州市吴中区吴中大道 1188 号
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址" :content-style="{ 'text-align': 'center' }"
                                >江苏省苏州市吴中区吴中大道 1188 号
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址" :content-style="{ 'text-align': 'center' }"
                                >江苏省苏州市吴中区吴中大道 1188 号
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址" :content-style="{ 'text-align': 'center' }"
                                >江苏省苏州市吴中区吴中大道 1188 号
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                </div>
            </el-col>
        </el-row>
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
                <el-form ref="oneForm" label-position="center" label-width="150px" :model="dataForm" :rules="rules">
                    <el-form-item label="地区: " prop="area"></el-form-item>

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
import { customizeMsgBox, msgBox } from "@/util/msgbox"
import { requestByDelete, requestByGet, requestByPost, requestByPut } from "@/api/globalApi"
import api, { peopleList } from "@/api/apis"
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
        return {
            dataLoading: false, // 是否显示加载窗
            personalData: null,
            idKey: "peopleName",
            multipleSelection: [], // 多选集合
            parentKey: "peopleParent",
            treeData: [],
            totalSize: 0, // 总条数
            pageSizes: [10, 30, 50], // 可选页大小
            params: { pageNum: 1, pageSize: 10, branchName: "赣州上坝友亮公世系" }, // 默认页数为 1,默认页大小为10 ---- 条件查询 页码+参数
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
            like: true,
            value1: 4154.564,
            value2: 1314,
            title: "增长人数",
            rules: {
                area: [{ validator: validatePass, trigger: "blur" }]
            },
            fileList: [],
            options: BranchOption,

            defaultProps: {
                children: "children",
                label: "label"
            },

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
    computed: {},
    created() {
        this.fetchData()
    },
    methods: {
        peopleList() {
            return peopleList
        },
        // 初始化数据
        fetchData() {
            this.dataLoading = true
            requestByGet(api.peopleList, this.params)
                .then(value => {
                    this.dataLoading = false
                    this.treeData = util.buildTree(value.rspdata, this.idKey, this.parentKey)
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
        handleNodeClick(event) {
            this.personalData = event

            console.log(this.personalData)
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
            &:nth-child(2n) {
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

.el-col {
    border-radius: 4px;
}

.btnList {
    margin-top: 15px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
