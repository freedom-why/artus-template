import axios from 'axios'
import {ElMessage} from 'element-plus'

const service = axios.create({
    withCredentials: true,
    timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = token // 新权限
    }

    return config
}, error => {
    Promise.reject(error)
})

// respone interceptor
// 200                         OK
// 203                         need refresh(token timeout)
// 205                         need relogin(修改用户的权限后，需要重新登录，以获取最新权限)
// 401                         UNAUTHORIZED
// 405                         METHOD_NOT_ALLOWED
// 503                         SERVICE_UNAVAILABLE

service.interceptors.response.use(
    response => { // 只会200
        const {data: responseData, headers} = response
        const {datatype} = headers
        let {code, data, msg = '系统错误，请稍后再试'} = responseData
        if (datatype === 'stream') { // 流文件处理
         return response
        }
        if (code === undefined) {
            return responseData
        }
        switch (code) {
            case 0:
                return data
            case 203:
                break
            case 205:
                needRelogin('token无效，请重新登录')
                break
            case 401:
                statusCode401(data)
                break
            case 405:
                errorMessage('系统错误')
                break
            case 503:
                errorMessage('网络异常')
                break
            default:
                errorMessage(msg)
        }
        if (code !== 0) {
            return Promise.reject(responseData)
        }
    }, error => {
        const request = error.request
        const response = error.response
        if (/^4\d+$/.test(request.status)) {
            if (response && response.data && response.data.msg) {
                errorMessage(response.data.msg)
            }
        } else if (/^5\d+$/.test(request.status)) {
            errorMessage(response.data.error)
        } else {
            localStorage.clear()
        }
        return Promise.reject(error)
    })

function success(body) { // 接口请求返回200
    let {success, message, data} = body
    if (success) { // 判断后台业务逻辑是否处理成功
        return data
    }
    errorMessage(message)
    return Promise.reject(message)
}

function errorMessage(message) {
    ElMessage.closeAll()
    ElMessage({
        customClass: 'zZindex',
        message: message,
        type: 'error',
        duration: 3 * 1000,

    })
}

function statusCode401() {
    needRelogin('登录超时，请重新登录')
}

function needRelogin(tip) {
    errorMessage(tip)
}


export default service
