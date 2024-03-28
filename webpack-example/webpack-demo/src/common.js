/*
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-28 16:06:56
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */

/**
 * 主要分为以下几个部分
 * 初始化：定义modules对象
 * 定义缓存对象cache
 * 定义加载模块函数require
 * 执行函数入口
 * 
 */

// 大概原理
// var modules = {
//     "./name.js": () => {
//       var module = {};
//       module.exports = "不要秃头啊";
//       return module.exports;
//     },
//   };
//   const require = (modulePath) => {
//     return modules[modulePath]();
//   };
  
//   let author = require("./name.js");
//   console.log(author, "author");


// 模块
  var modules = {
    './src/name.js':(module)=>{
        module.exports = '汪汪'
    }
  }
// 缓存
  var cache = {}

  // 定义加载函数require
 function require(modulePath){
    var cachedModule = cache[modulePath] //获取缓存
    if(cachedModule!=undefined){
        return cachedModule.exports
    }
    // 无缓存
    var module = (
        cache[modulePath] = {
            exports:{}
        }
    )

    modules[modulePath](module,module.exports,require)

    return modules[path]
 }


 (()=>{
    let author = require('./src/name.js')
    console.log(author,'author')
 })