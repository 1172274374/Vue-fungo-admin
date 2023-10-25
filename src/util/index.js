// export function camel (str) {
//   const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase());

//   return capitalize(camel);
// }

// export function camelActual (str) {
//   return (str || '').replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
// }

// export function kebab (str) {
//   return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
// }

// export function capitalize (str) {
//   str = str || '';

//   return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
// }

// export function findProduct (store, id) {
//   return store.state.store.products.find(p => p.id === id);
// }

// export function isOnSale (variants) {
//   return variants.some(variant => {
//     return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
//   });
// }

// export function randomNumber (min, max) {
//   return Math.floor(Math.random() * max) + min;
// }

// export function randomString (length = 5) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }

//   return text;
// }
const randomElement = (arr = []) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const kebab = str => {
    return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

const toggleFullScreen = () => {
    let doc = window.document
    let docEl = doc.documentElement

    let requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen
    let cancelFullScreen =
        doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

    if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
    ) {
        requestFullScreen.call(docEl)
    } else {
        cancelFullScreen.call(doc)
    }
}

const getNowFormatDate = seperator1 => {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    var currentdate = seperator1 + year + seperator1 + month + seperator1 + strDate + seperator1
    return currentdate
}

function formatDate(date, format) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    format = format.replace("yyyy", year)
    format = format.replace("MM", month < 10 ? "0" + month : month)
    format = format.replace("dd", day < 10 ? "0" + day : day)
    format = format.replace("HH", hour < 10 ? "0" + hour : hour)
    format = format.replace("mm", minute < 10 ? "0" + minute : minute)
    format = format.replace("ss", second < 10 ? "0" + second : second)
    return format
}

const downloadFile = (res, type, filename) => {
    // 创建blob对象，解析流数据
    const blob = new Blob([res], {
        // 设置返回的文件类型
        // type: 'application/pdf;charset=UTF-8' 表示下载文档为pdf，如果是word则设置为msword，excel为excel
        type: type
    })

    console.log(blob)
    // 这里就是创建一个a标签，等下用来模拟点击事件
    const a = document.createElement("a")
    // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
    const URL = window.URL || window.webkitURL
    // 根据解析后的blob对象创建URL 对象
    const herf = URL.createObjectURL(blob)
    // 下载链接
    a.href = herf
    // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
    a.download = filename
    document.body.appendChild(a)
    // 点击a标签，进行下载
    a.click()
    // 收尾工作，在内存中移除URL 对象
    document.body.removeChild(a)
    window.URL.revokeObjectURL(herf)
}

const buildTree = (data, idKey, parentKey) => {
    const findParentChildren = (data, idKey, parentKey) => {
        let parnetWrapper = new Map()
        data.forEach(item => {
            if (parnetWrapper.has(item[parentKey])) {
                let children = parnetWrapper.get(item[parentKey])
                children.push(item)
            } else {
                parnetWrapper.set(item[parentKey], [item])
            }
        })
        return parnetWrapper
    }

    const findRoots = (data, rootVal) => {
        if (rootVal) {
            return data.filter(ele => ele[parentKey] === rootVal)
        } else {
            return data.filter(parent => !data.find(item => item[idKey] === parent[parentKey]))
        }
    }

    const buildTree = (roots, wrapper) => {
        return roots.map(item => {
            if (wrapper.has(item[idKey])) {
                return {
                    ...item,
                    children: buildTree(wrapper.get(item[idKey]), wrapper)
                }
            } else {
                return item
            }
        })
    }

    const parnetWrapper = findParentChildren(data, idKey, parentKey)

    const roots = findRoots(data, "")

    return buildTree(roots, parnetWrapper)
}

export default {
    randomElement,
    toggleFullScreen,
    kebab,
    getNowFormatDate,
    formatDate,
    downloadFile,
    buildTree
}
