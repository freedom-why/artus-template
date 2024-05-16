import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store"

let gateway = import.meta.env.VITE_GATEWAY
let routerPatch = {
    '/example': () => import('@/views/dome/index.vue')
}


// // 无需权限路由
// export let constantRoutes = List()

function List(list, routerListAll, rootGateWay) {
    if (list) { // 不等于undfind就是乾坤过里的路由信息
        let l = []
        for (let i of list) {
            let {name, url, setRouter, reportParam, btnJurisdiction = ['change', 'delete'], systemId} = i
            if (setRouter) {
                l.push({
                    path: setRouter,
                    name: setRouter,
                    meta: {
                        title: name,
                        params: reportParam || '{}',
                        btnJurisdiction: btnJurisdiction,
                        systemId: systemId,
                        url: url,
                        rootGateWay,
                        routerListAll: routerListAll
                    },
                    component: routerPatch[url]
                })
            }
        }
        return l
    }
    return [ // 路由权限路由
        {
            path: '/',
            name: 'root',
            redirect: '/example',
        },
        {
            path: '/example',
            name: '/example',
            meta: {title: '示例', btnJurisdiction: ['change', 'delete']},
            component: routerPatch['/example']
        }
    ]
}

function init({activeRule, routerList, routerListAll}, props) {
    const router = createRouter({
        history: createWebHistory(activeRule || gateway),
        routes: List(routerList, routerListAll, props?.rootGateWay)
    })
    if (props) {
        router.afterEach(() => {
            props.setGlobalState({loading: false, name: 'reportPage'})
        })
    }
    router.beforeEach((to, from, next) => {
        let {meta: {btnJurisdiction}} = to
        if (btnJurisdiction && btnJurisdiction.length) { // 按钮权限码
            store.commit("app/SET_BtnJurisdiction", btnJurisdiction)
        } else {
            store.commit("app/SET_BtnJurisdiction", [])
        }
        props?.setGlobalState?.({loading: true, name: 'reportPage'})
        next()
    })
    return router
}

export default init
