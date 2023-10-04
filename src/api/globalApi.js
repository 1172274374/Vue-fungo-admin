import request from "../util/request"

// 获取数据列表
export function requestByGet(api, params) {
    return request({
        url: api,
        method: "get",
        params: params,
    })
}

// 新增数据
export function requestByPost(api, formData, params) {
    return request({
        url: api,
        method: "post",
        data: formData,
        params: params,
    })
}

// 更新数据
export function requestByPut(api, formData) {
    return request({
        url: api,
        method: "put",
        data: formData,
    })
}

// 删除数据
export function requestByDelete(api, ids) {
    return request({
        url: api,
        method: "delete",
        data: ids,
    })
}
