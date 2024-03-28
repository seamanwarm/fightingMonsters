/*
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-28 16:19:45
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */
var modules = {
    './src/name.js':(module,exports,require)=>{
        const author = 'wangwang';
        const age = '18';
        const DEFAULT_EXPORT = author;

    }
}

var cache = {};
// import 语句会被编译成require
function require(modulePath){
    var cachedModule = cache[modulePath];
    if(cachedModule!=undefined){
        return cachedModule.exports
    }
    var module = (cache[modulePath]={
        exports:{}
    })
    modules[modulePath](module,module.exports,require)
    return module.exports
}


// 对exports对象做代理
require.defineProperty = (exports,definition)=>{
    for(var key in definition){
        Object.defineProperties(exports,key,{
            enumerable:true,
            get:definition[key]
        })
    }
}

require.setModuleTag = (exports)=>{
    Object.defineProperty('exports',Symbol.toStringTag,{
        value:"Module"
    })

    Object.defineProperty('exports',"__esModule",{
        value:true
    })
}

