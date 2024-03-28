/*
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-27 14:42:12
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */

/**
 * 
 * console.log('hello world')
 * console.log('hello world','当前文件名','具体代码位置信息')
 *  第一步：先找出console节点的部分
 *  第二步：判断是否是这几个方法名中的某一个："log"、"info"、"warn"、"error"
 *  第三步：往节点的arguments中添加参数
 */

const core = require("@babel/core");
let types = require("@babel/types");
const pathLib = require("path");
let sourceCode = `
console.log('日志')
`
const logPlugin = {
    visitor:{
        CallExpression(path,state){
            const {node} = path;
            if(types.isMemberExpression(node.callee)){
                if(node.callee.object.name === 'console'){
                    // 找到console
                    if(['log','info','warn','error'].includes(node.callee.property.name)){
                        //找到符合的方法名
                        const {line,column} = node.loc.start;// 找到所处位置的列和行
                        node.arguments.push(types.stringLiteral(`line:${line} column:${column}`))
                        // 找到文件名
                        const filename = state.file.opts.filename;
                        //输出文件的相对路径
                        const relativeName = pathLib
                        .relative(__dirname,filename)
                        .replace(/\\/g,'/') // 兼容window
                        // 向右边添加行&列
                        node.arguments.push(types.stringLiteral(relativeName))

                    }
                }
            }
        }
    }
    
}

let targetSource = core.transform(sourceCode,{
    plugins:[logPlugin], // 使用插件
    filename:"hello.js"
})

console.log(targetSource.code)

