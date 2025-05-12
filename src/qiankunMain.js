import {qiankunWindow, renderWithQiankun} from "vite-plugin-qiankun/dist/helper"
import BASE_API from '@/api/config.js'

let instance = null


async function getInfor() {
    return await import("./app")
}

const initQianKun = () => {
    window.CESIUM_BASE_URL = qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + "mars3d-cesium/"
    renderWithQiankun({
        mount(props) {
            const {
                container, routerConfig,
                api: {
                    base, iot, upload, showImg, mapKey, mapJson, nameSpace
                }
            } = props;

            if (process.env.NODE_ENV !== 'development') {
                base && (BASE_API.base = base)
                iot && (BASE_API.iot = iot)
                upload && (BASE_API.upload = upload)
                showImg && (BASE_API.showImg = showImg)
                mapKey && (BASE_API.mapKey = mapKey)
                mapJson && (BASE_API.mapJson = mapJson)
            }
            BASE_API.nameSpace = nameSpace || 'why'
            getInfor().then(({appInit}) => {
                appInit(container, routerConfig, props).then((app) => {
                    instance = app
                })
            })
        },
        bootstrap() { //activeRule = 乾坤路由规则 ，systemLogo系统图标， 左下小导航
        },
        unmount() {
            if (instance && instance.unmount) {
                instance.unmount()
                instance = null
            }
        }
    })

}
if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    initQianKun()
}

export default initQianKun
