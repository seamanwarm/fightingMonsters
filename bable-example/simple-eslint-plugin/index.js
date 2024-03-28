const core = require('@babel/core'); // babel核心模块
const { visitors } = require('@babel/traverse');
const path = require("path");

const sourceCode = `
const a = 123
console.log(123)
`

//no-console fix=true: 自动修复

const eslintPlugin = ({fix})=>{
  return {
    pre(file){
      
        file.set('errors',[])
    },
    visitor:{
        CallExpression(path,state){
            const errors = state.file.get('errors');
            const { node } = path
            if(node.callee.object.name ==='console'){
                errors.push(path.buildCodeFrameError(`代码中不能出现console语句`,Error))
            
                if(fix){ 
                    path.parentPath.remove();
                }
            }
        }
    },
    post(file){
        // console.log('file',...file.get('errors'))
        // console.log('file',file)
    }
  }  
}

const targetSource = core.transform(sourceCode,{
    plugins:[eslintPlugin({
        fix:false
    })]
})

console.log(targetSource.code)