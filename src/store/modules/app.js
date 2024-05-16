
import dictionariesList from "@/filters/dictionariesList.js";

const state = {
    btnJurisdiction: [],
    dynDictionary: dictionariesList, // 本地字典
    optionList: {}, // 根据数据字典生成的select选项
};
const mutations = {
    SET_BtnJurisdiction: (state, data) => {
        state.btnJurisdiction = data
    },
    SET_DYN_DICTIONARY: (state, data) => {
        state.dynDictionary = {
            ...state.dynDictionary,
            ...data,
        };
        sessionStorage.setItem("dictionary", JSON.stringify(state.dynDictionary));
    },
    SET_OPTION_LIST: (state, obj) => {
        let {key, list} = obj
        state.optionList[key] = list
    }

}

const actions = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
