// Bindings 变量引用的集合

const  core = require('@babel/core')
const sourceCode = `
 function getAge(){
    var age = 12;
    console.log(age);
    var name = 'zhufeng';
    console.log(name);
  }
`
const uglifyPlugin = ()=>{
    return {
        visitor:{
            Scopable(path){
                Object.entries(path.scope.bindings).forEach(([key,bindings])=>{
                    const newName = path.scope.generateUid()
                    bindings.path.scope.rename(key,newName);
                })
            }
        }
    }
}

const targetSource =  core.transform(sourceCode,{
    plugins:[uglifyPlugin]
})

console.log(targetSource.code)