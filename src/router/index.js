import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store"

let gateway = import.meta.env.VITE_GATEWAY
let routerPatch = {
    '/dataOrigin': () => import('@/views/dome/index.vue'),
    '/example1': () => import('@/views/dome/index1.vue'),
    '/example2': () => import('@/views/dome/index2.vue'),
    '/example3': () => import('@/views/dome/index3.vue')
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
            meta: {hidden: true},
            redirect: '/login',
        },
        {
            path: '/login',
            name: '/login',
            hidden: true,
            meta: {title: '登录', hidden: true, btnJurisdiction: ['change', 'delete'], icon: 'OfficeBuilding'},
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/content',
            name: '/content',
            meta: {hidden: true},
            component: () => import('@/layout/index.vue'),
            children: [
                {
                    path: '/example',
                    name: '/example',
                    meta: {title: '布局1', btnJurisdiction: ['change', 'delete']},
                    component: routerPatch['/example']
                },
                {
                    path: '/example1',
                    name: '/example1',
                    meta: {title: '布局2', btnJurisdiction: ['change', 'delete']},
                    component: routerPatch['/example1']
                },
                {
                    path: '/example2',
                    name: '/example2',
                    meta: {title: '布局3', btnJurisdiction: ['change', 'delete']},
                    component: routerPatch['/example2']
                },
                {
                    path: '/example3',
                    name: '/example3',
                    meta: {title: '布局4', btnJurisdiction: ['change', 'delete']},
                    component: routerPatch['/example3']
                }
            ]
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
