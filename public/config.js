;
(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) { // AMD / RequireJS
        define(factory);
    } else {
        root.mps = factory.call(root);
    }
}(window, function () {
    'use strict';

    function mps() {
        var config = {
            nameSpace:'el',
            base :'/', // 可视化平台基础接口
        }
        return {
            initFunction: function () {
                mps.config = config
                // 兼容性处理
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                }
            },
            init: function () {
            }
        }
    }

    mps = new mps()
    mps.initFunction()
    window.onload = function (e) {
        mps.init()
    }
    return mps;
}));
