export function dbInit(dbname) {
    return new Promise((resolve, reject) => {
        let connection = ''
       try {
            connection = window.indexedDB.open(dbname, 2)
       }catch (e) {
            connection = self.indexedDB.open(dbname, 2)
       }
        connection.onsuccess = function (event) {
            resolve(event.target.result)
        }
        connection.onupgradeneeded = function (event) {
            const db = event.target.result
            if (!db.objectStoreNames.contains(dbname)) { // 如果该表不存在新建该表
                db.createObjectStore('person', {autoIncrement: true}) //指定主键为一个递增的整数
            }
        }
        connection.onerror = function (err) {
            reject(err)
        }
    })
}

export class dbOperation {
    constructor(dbname, type, data) {
        return this.init(type, data, dbname)
    }

    async init(type, data, dbname) {
        if (!dbname) {
            console.error('未定义数据库名称')
            return
        }
        let fun = {
            add: addRecord,
            get: read,
            getAll: readAll,
            update: updateDate,
            remove: remove,
            clear: clear,
        }
        let readType = fun[type]
        if (!readType) {
            throw new Error(`操作类型错误, 仅支持: ${fun.toString()} 方法`)
        }
        let typeList = {
            'clear': 'readwrite',
            'add': 'readwrite',
            'update': 'readwrite',
            'remove': 'readwrite'
        }
        this.db = await dbInit(dbname)
        let transaction = this.db.transaction(["person"], typeList[type]) //写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（“只读”或“读写”）
        this.objectStore = transaction.objectStore("person")
        return fun[type].call(this, data)
    }
}


function addRecord({data}) { // 添加入库
    let request = this.objectStore.add(data) //再通过表格对象的add()方法，向表格写入一条记录
    request.onsuccess = function (e) {
        console.log("数据写入成功")
    }
    request.onerror = function (e) {
        console.log("数据写入失败:", e.srcElement.error)
    }
}

function read({key: primaryKey}) { // 读取索引消息
    if (!primaryKey) {
        console.error('读取的key错误')
        return
    }
    let request = this.objectStore.get(parseInt(primaryKey)) //objectStore.get()方法用于读取数据，参数是主键的值。
    request.onerror = function (e) {
        console.log("事务失败");
    }
    return new Promise(resolve => {
        request.onsuccess = function (e) {
            resolve(request.result)
        }
    })
}

function readAll() {
    return new Promise(resolve => {
        this.objectStore.openCursor().onsuccess = function (e) {
            resolve(e.target.result)
        }
    })
}

function updateDate({key, data}) {

    /**
     * 更新数据要使用IDBObject.put()方法。
     * 第一个参数为新数据
     * 第二个参数为主键，该参数可选，且只在自动递增时才有必要提供，因为那时主键不包含在数据值里面
     * */
    let request = this.objectStore.put(data, parseInt(key))

    request.onsuccess = function (event) {
        console.log('数据更新成功');
    }

    request.onerror = function (event) {
        console.log('数据更新失败');
    }
}

function remove({key}) {
    let request = this.objectStore.delete(parseInt(key))

    request.onsuccess = function (event) {
        console.log('数据删除成功');
    }
}

function clear() {
    var request = this.objectStore.clear()
    request.onsuccess = function (e) {
        console.log("清空对象仓库成功")
    }
    request.onerror = function (e) {
        console.log("清空仓库失败")
    }
}
