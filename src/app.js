import { createApp } from 'vue'
import router from "@/router"
import '@/assets/styles/index.scss'
import store from '@/store'
import * as artusComponents from 'artus-components/lib'
import 'artus-components/lib/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as filters from "@/filters"
import '@/assets/styles/fonts/iconfont.css'
import * as directive from '@/directive/auth'

export function appInit (container, routerConfig = {}, props) {
    return new Promise(resolve => {
        loadLayout(container).then(d => {
            let app = createApp(d.default)
            app.use(artusComponents.default)
            app.use(router(routerConfig, props))
            app.use(store)
            for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                app.component(key, component)
            }
            container && app.provide('cachedViews', props.cachedViews)
            app.mount('#app')
            app.directive(directive.name, directive.fun)
            artusComponents.componentConfig.auth = directive.fun
            artusComponents.componentConfig.filter = filters.$filter
            resolve(app)
        })

    })
}

async function loadLayout (type) {
    if (type) {
        artusComponents.componentConfig.namespace = 'why'
        return await import ('./App.vue')
    }
    return await import('./App2.vue')
}

