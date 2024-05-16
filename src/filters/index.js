import store from "@/store";

export function getDictionariesList() { // 取得字典
    let data = store.state.app.dynDictionary
    if (!Object.keys(data).length) {
        store.commit('app/SET_DYN_DICTIONARY', dictionariesList)
        return dictionariesList
    }
    return data
}

// 全局过滤器
export function $filter(val, name) {
  // let data = getDictionariesList()
  let data = store.state.app.dynDictionary; // 取出字典
  if (data[name] === undefined) return val;
  return data[name][val] || val;
}

// 下拉列表
export function $option(key) {
  let optionList = store.state.app.optionList;
  let data = store.state.app.dynDictionary;
  if (optionList[key] !== undefined) {
    // vux是否存储该下拉枚举
    return optionList[key];
  }

  if (data[key] === undefined) {
    // 数据字典是否有该枚举
    console.error("未找到此类下拉枚举");
    return [];
  }
  let list = [];
  for (let i in data[key]) {
    list.push({
      label: data[key][i],
      value: isObj(i),
    });
  }
  store.commit("app/SET_OPTION_LIST", { key: key, list: list });
  return list;
}

function isObj(str) {
  if (typeof str === "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }
}
