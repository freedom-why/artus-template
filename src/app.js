import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router"
import '@/assets/styles/index.scss'
import store from '@/store'
import * as artusComponents from 'artus-components/lib'
import 'artus-components/lib/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as filters from "@/filters"
import '@/assets/styles/fonts/iconfont.css'
import * as directive from '@/directive/auth'
import layout from '@/layout/index.vue'
export function appInit(container, routerConfig = {}, props) {
    let style = ''
    if (container) {
        style = 'padding:10px'
    }
    return new Promise(resolve => {
        let app = null

        if (container) {

            app = createApp(App, {
                style: style,
            })
            artusComponents.componentConfig.namespace = 'why'
        } else {
            app = createApp(layout, {
                style: style,
            })
            styleFun()
        }
        app.use(artusComponents.default)
        app.use(router(routerConfig, props))
        app.use(store)
        app.config.globalProperties.$option = filters.$option
        app.config.globalProperties.$filter = filters.$filter
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.mount('#app')
        app.directive(directive.name, directive.fun)
        artusComponents.componentConfig.auth = directive.fun
        resolve(app)
    })
}

const styleFun = async () => {
    // await import("@/assets/styles/element.css")
    await import("animate.css")
    await import("element-plus/dist/index.css")
    await import("@/assets/styles/selfStyle.scss")
    await import ('element-plus/theme-chalk/dark/css-vars.css')
}
