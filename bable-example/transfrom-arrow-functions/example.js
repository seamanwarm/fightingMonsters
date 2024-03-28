const core = require('@babel/core');
let types = require("@babel/types");
let arrowFunction = require('babel-plugin-transform-es2015-arrow-functions') // 转换箭头函数插件
let sourceCode1 = `
const sum = (a,b) =>{
    return a+b
}
`

let sourceCode2 = `
const sum = (a,b) =>a+b
`
/**
 * 思路：
 * 第一步：找到当前箭头函数要使用哪个作用域内的this，暂时称为父作用域
 * 第二步：往父作用域中加入_this变量，也就是var _this=this
 * 第三步：找出当前箭头函数内所有用到this的地方
 * 第四步：将当前箭头函数中的this，统一替换成_this
 */
function hoistFunctionEnvironment(path){
    // 父节点是函数且不是箭头函数，找不到就返回根节点
   const thisEnv = path.findParent((parent)=>{
      return (parent.isFunction() && !parent.isArrowFunctionExpression()) || parent.isProgram()
   })

   // 向父作用域内加入一个_this变量
    thisEnv.scope.push({
        id:types.identifier("_this"), // 生成标识符节点，变量名
        init:types.thisExpression(), // 生成this节点，变量值
    })
    // 获取当前节点this的路径
    let thisPaths = [];

    path.traverse({
        ThisExpression(thisPath){
            thisPaths.push(thisPath)
        }
    })

    // 替换 把this 替换为_this

    thisPaths.forEach((thisPath)=>{
        thisPath.replaceWith(types.identifier('_this'))
    })
}



const arrowFunctionPlugin = {
    visitor:{
        ArrowFunctionExpression(path){
            let {node} = path;

            hoistFunctionEnvironment(path)
            node.type = 'FunctionExpression'
            // 如果不是函数体语块
            if(!types.isBlockStatement(node.body)){
                // 生成一个块语句，并将内容return
                node.body = types.blockStatement([types.returnStatement(node.body)])
            }
        }
    }
}

let targetSource = core.transform(sourceCode2,{
    plugins:[arrowFunctionPlugin] //使用插件
})

console.log(targetSource.code)