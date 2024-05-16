import {qiankunWindow} from "vite-plugin-qiankun/dist/helper"
import initQianKun from './qiankunMain'
async function getInfor() {
    return await import("./app")
}
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    getInfor().then(({appInit}) => {
        appInit()
    })
} else {
    initQianKun()
}
