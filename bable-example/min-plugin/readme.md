<!--
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-28 10:28:58
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
-->
<!--
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-28 10:28:58
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
-->
## 目的
了解代码压缩工作原理

## 原理
第一步：需要捕获能够生成作用域的节点（函数、类的函数、函数表达式、语句块），只有作用域，就有可能使用变量

第二步：给这些作用域内的捕获到的变量重新命名，进行简化

