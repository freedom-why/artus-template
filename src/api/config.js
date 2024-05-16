const mps = window.mps


const {
    base,
    nameSpace
} =  mps.config
const BASE_API = {
    development: {
        // 开发环境
        base: `/statement/report`,
        nameSpace:'el'
    },
    production: {
        // 生产环境
        base: base,
        nameSpace: nameSpace
    },
};
let baseUrl = BASE_API[process.env.NODE_ENV];
export default baseUrl;
