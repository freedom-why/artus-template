
/**
 *
 * @param {*} fmt 指定格式化字符串
 * @param {*} date 需要被转换的日期Date对象
 */
export const formateDate = function (fmt, date) {
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

export const changeDateformat = function (today, type) { // 转换日期格式为 '2018-03-09' 格式
    let arr = []
    let year = today.getFullYear().toString()
    let month = (today.getMonth() + 1).toString()
    let date = today.getDate().toString()

    month = month.length === 1 ? '0' + month : month
    date = date.length === 1 ? '0' + date : date

    arr.push(year)
    arr.push(month)
    if (type !== 'month') {
        arr.push(date)

    }
    return arr.join('-')
}

export const downloadFile = function (ref) {
    let blob = new Blob([ref.data], {type: "application/x-xls"})
    let temp = ref.headers["content-disposition"].split(";")[1].split("filename=")[1]
    // 获取heads中的filename文件名
    let downloadElement = document.createElement('a')
    // 创建下载的链接
    let href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    // 下载后文件名
    downloadElement.download = temp
    document.body.appendChild(downloadElement)
    // 点击下载
    downloadElement.click()
    // 下载完成移除元素
    document.body.removeChild(downloadElement)
    // 释放掉blob对象
    window.URL.revokeObjectURL(href)
}
export const chartLoading = function (myChart) {
    if (myChart) {
        myChart.showLoading({
            text: '数据正在努力加载...',
            color: '#1890FF',
            textColor: '#1890FF',
            fontSize: '14px',
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
        })
    }
}
export const chartHideLoading = function (myChart) {
    if (myChart) {
        myChart.hideLoading()
    }
}


/**
 * 导出流文件
 * @param res 返回的文件流
 * @param xlsxName 导出的文件名称
 */
export const exportStreamFile = function (res, xlsxName) { // suffix
    const blob = new Blob([res])
    const fileName = `${xlsxName}.xls` // 文件名字
    const elink = document.createElement('a') // 创建a标签
    elink.download = fileName // 为a标签添加download属性
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click() // 点击下载
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink) // 释放标签
}




/**
 * 解析时间戳 将时间戳解析为标准时间 yyyy-MM-dd HH:mm:ss
 * @param date 传递过来的时间戳
 * @returns {string}
 */
export const parsingTimestamp = function (date) {
    let _date = new Date(date) // 如果date为13位不需要乘1000
    let Y = _date.getFullYear() + '-'
    let M = (_date.getMonth() + 1 < 10 ? '0' + (_date.getMonth() + 1) : _date.getMonth() + 1) + '-'
    let D = (_date.getDate() < 10 ? '0' + (_date.getDate()) : _date.getDate()) + ' '
    let h = (_date.getHours() < 10 ? '0' + _date.getHours() : _date.getHours()) + ':'
    let m = (_date.getMinutes() < 10 ? '0' + _date.getMinutes() : _date.getMinutes()) + ':'
    let s = (_date.getSeconds() < 10 ? '0' + _date.getSeconds() : _date.getSeconds())
    return Y + M + D + h + m + s
}
/**
 * 树形结构递归添加值
 * @param arr 传递的数组
 * @param key 需要添加的key名
 * @param value 需要添加的value
 * 使用方法 let _treeList = rebuildData(this.$attrs.value, 'disabled', true)
 * 返回的值所有的对象下都添加一个 disabled: true
 * @returns {*}
 */
export const rebuildData = (arr, key, value) => {
    if (arr && arr.length > 0) {
        arr.forEach(element => {
            element[key] = value
            if (element.children && element.children.length > 0) {
                rebuildData(element.children, key, value)
            }
        })
    }
    return arr
}
export function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}