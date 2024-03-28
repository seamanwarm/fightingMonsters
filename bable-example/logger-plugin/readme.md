## 使用示例
```ts
// 四种函数声明的方式
function sum (a,b){ 
    return a+b
}

const multiply = function (a,b){
    return a*b
}

const minus = (a-b)=> a - b

class Calculator {
  divide(a,b){
    return a/b
  }
}

// 每个函数里面注入 loggerLib()
```

## 整体思路
- 第一步：先判断源代码中是否引入了logger库
- 第二步：如果引入了，就找出导入的变量名，后面直接使用该变量名即可
- 第三步：如果没有引入我们就在源代码的顶部引用一下
- 第四步：在函数中插入引入的函数