import store from "@/store"
export const fun = (el, binding) => {
    let choose = typeof binding.value === 'string'
    const authlist = choose ? store.state.app.btnJurisdiction :  binding.value?.[1] // s.context.$store.state.app.permissionCode
    const matchVal = choose ? binding.value : binding.value?.[0]
    const btnFilter = (list) => {
        const btnArr = list || ''
        if (btnArr.indexOf(matchVal) === -1) {
            if(el.parentNode) {
                el.parentNode.removeChild(el)
            }
        }
    }
    if (binding.value !== undefined) btnFilter(authlist)
}
export const name = 'auth'
