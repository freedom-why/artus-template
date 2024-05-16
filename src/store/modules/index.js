/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */


const files = import.meta.glob('./*.js',{ eager: true })
const modules = {}
for (const [key, value] of Object.entries(files)) {
    var moduleName = key.replace(/(\.\/|\.js)/g, '')
    modules[moduleName] = value.default
}
export default modules
