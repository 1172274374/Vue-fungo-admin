/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function validDouble(value) {
    var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
    return reg.test(value)
}

export function validTel(value) {
    var reg = /^1[3456789]\d{9}$/
    return reg.test(value)
}
