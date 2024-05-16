import request from './request'
import BASE_API from './config.js'

export function dome() {
    return request({
        url: `${BASE_API.base}/1`,
        method: 'get'
    })
}
