/*
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-27 10:52:46
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')

const code = `const hello = ()=> {}`
// 1.解析 2.转换 3. 生成
const ast = parser.parse(code)

const visitor = {
    Identifier(path){
        const {node} = path 
        if(node.name==='hello'){
            node.name = 'world'
        }
    }
}

traverse.default(ast,visitor)

const result = generator.default(ast,{},code)
console.log(result.code)


