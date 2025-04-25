import path from 'path'
import fs from 'fs'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import DefineOptions from 'unplugin-vue-define-options/vite'
import qiankunPlugin from 'vite-plugin-qiankun'
import { createHtmlPlugin } from 'vite-plugin-html'
import packageInfor from './package.json'

export default async ({command, mode}) => {
    const envConfig = loadEnv(mode, './')

    const p = {
        artus: {
            importStyle: true,
            plugins: [excludePublicFilesPlugin(['mars3d-cesium'])],
            additionalData: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/selfStyle.scss";`
        },
        qiankun: {
            importStyle: false,
            plugins: [
                qiankunPlugin(packageInfor.name, {useDevMode: true}),
                initHtml()
            ],
            additionalData: `@import "@/assets/styles/variables.scss";`
        },
        dualmode: {
            importStyle: true, plugins: [qiankunPlugin(packageInfor.name, { // 微应用名字，与主应用注册的微应用名字保持一致
                useDevMode: true,
                additionalData: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/selfStyle.scss";`
            }), initHtml()]
        },
        artusTemplate: {importStyle: true, plugins: [],  additionalData: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/selfStyle.scss";`}
    }
    const modeType = p[envConfig.VITE_NODE_ENV]
        console.log(modeType.additionalData)
    return defineConfig({
        define: {
            'process.env': {}
        },
//配置路径别名
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        css: {
            postcss: {
                plugins: [
                    // require('autoprefixer'), //css自动前缀
                    // require('postcss-import') //支持@import写法
                ]
            },
            preprocessorOptions: {
                scss: {
                    //注意这里sass变成了scss
                    additionalData: modeType.additionalData
                }
            }
        },
        base: envConfig.VITE_GATEWAY,
        server: {
            overlay: { // 让浏览器 overlay 同时显示警告和错误
                warnings: true,
                errors: true
            },
            headers: {
                'Access-Control-Allow-Origin': '*' // 重要
            },
            disableHostCheck: true,
            //host: "localhost",
            // port: 5177, // 端口号
            proxy: {
                '/api/': { // 可视化平台服务
                    target: 'http://139.186.201.161:8100/',
                    // target: 'http://192.168.5.31:10009',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        //vite 在 build 的时候默认会进行压缩计算，但 vite 实际上不提供 gzip 压缩功能，所以不需要让他花时间算压缩后大小，关掉这个设置可以提升打包速度。
        build: {
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                output: {
                    manualChunks (id) { //静态资源分拆打包
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            },
            brotliSize: false // 默认为true
        },
        plugins: [
            vue(),
            DefineOptions(),
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: 'gzip',
                ext: '.gz'
            }),
            createHtmlPlugin({
                minify: true,
                filename: "index",//该项默认是template文件名
                entry: envConfig.VITE_INPUT || 'src/main.js',
                template: "./index.html",
                inject: {
                    data: {
                        injectScript: injectScript(modeType)
                    }
                }

            }),
            AutoImport({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: modeType.importStyle // 指示element-plus使用预处理样式
                    })
                ]
            }),
            Components({
                resolvers: [
                    ElementPlusResolver(
                        {importStyle: modeType.importStyle}
                    )
                ]
            }),
            ...modeType.plugins
        ]

    })
}

function injectScript (p) {
    let s = ''
    if (p.importStyle) {
        s += `<link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" /> `
        s += `<link rel="stylesheet" href="//unpkg.com/element-plus/theme-chalk/dark/css-vars.css" /> `
    }
    return s
}

function initHtml () {
    return {
        name: 'init-html',
        transformIndexHtml (html) {
            const regex = /update\(props\)\);\s*(\s|.)*?}/
            return html.replace(regex, () => {
                return "update(props)); return}window.proxy.vitebootstrap(() => Promise.reject('资源错误'))"
            });
        }
    }
}

function excludePublicFilesPlugin (excludePaths) {
    const publicDir = path.resolve(__dirname, 'dist')

    return {
        name: 'exclude-public-files',
        buildStart () {
            this.addWatchFile('public') // 确保 Vite 监听 `public` 文件夹
        },
        generateBundle (options, bundle) {
            // 读取并移除不需要的文件
            excludePaths.forEach(excludePath => {
                const fullPath = path.resolve(publicDir, excludePath);
                if (fs.existsSync(fullPath)) {
                    fs.rmdir(fullPath, {recursive: true}, (err) => {
                        if (err) {
                            console.error(`Error deleting folder: ${err}`);
                        }
                    })
                } else {
                    console.warn(`File not found: ${excludePath}`); // 添加调试信息
                }
            })
        }
    }
}

