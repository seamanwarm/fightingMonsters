<!--
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-27 11:22:15
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
-->
```ts
const arrowFunctionPlugin = {
    visitor:{
        [type]:(path)=>{
            
        }
    }
}
```
- babel插件其实就是一个对象，对象里面有个visitor属性，它也是一个对象，key为类型，value为函数，接受path作为参数

- 作用域大致结构

```ts   
{
    path:path,
    block:path.node,
    parentBlock: parentScope
    bindings:[...]
}

```

- 要想在作用域加一个_this变量，需要在AST树种的scope新增一个节点