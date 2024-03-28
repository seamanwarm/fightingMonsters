/*
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-28 15:30:03
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */
function component() {
    const element = document.createElement('div');
  
    // 执行这一行需要引入 lodash（目前通过 script 脚本引入）
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());