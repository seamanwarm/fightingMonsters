## 目的
了解eslint工作原理
## 原理
本质是检测代码
babel的ast里面的AST遍历也是有生命周期的，有两个钩子：在遍历开始之前或遍历结束之后，它们可以用于设置或清理/分析工作。
```
export default  function (){
    return {
        //遍历开始之前
        pre(state){
            this.cache = new Map();
        }
        
        visitor:{
            StringLiteral(path){
                ...code
            }
        }
        //遍历结束之后
        post(state){
            console.log(this.cache)
        }

    }
}
```
## 思路