/*
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-28 11:12:33
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */
const core = require('@babel/core');
const sourceCode = `var age:number ="12";`;

/**
 * 思路
 * 第一步：获取到声明的类型
 * 第二步：获取真实值的类型
 * 第三步：比较声明的类型和值的类型是否相同
 */
const TypeAnnotationMap = {
    TSNumberKeyword: "NumericLiteral",
};

const tsCheckPlugin = ()=>{
    return {
        pre(file){
            file.set('errors',[])
        },
        visitor:{
            VariableDeclarator(path,state){
                const error = state.file.get('errors')
                const {node} = path;
                //第一步获取拿到的声明类型 number
                const idType = TypeAnnotationMap[node.id.typeAnnotation.typeAnnotation.type];
                console.log('idType1',idType)
                //第二步获取真实值得类型
                const initType = node.init.type
                // 第三：比较声明类型和值类型是否相同
                if(idType != initType){
                    errors.push(
                        path
                        .get('init')
                        .buildCodeFrameError(`无法把${initType}类型赋值给${idType}`,Error)
                    )
                }
            }
        },
        post(file){
            console.log(...file.get('errors'))
        }
    }
    
}

let targetSource = core.transform(sourceCode,{
    parserOpts:{
        plugin:['typescript'], //解析的参数
    },
    plugins:[tsCheckPlugin]
})

console.log(targetSource.code)
