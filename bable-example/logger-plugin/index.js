/*
 * @Author: wangsimin wangsimin@tuzhanai.com
 * @Date: 2024-03-27 16:05:01
 * Copyright © 2014-2023 Rabbitpre.com. All Rights Reserved.
 */
// const parser = require("@babel/parser");
const types = require("@babel/types");
const core = require("@babel/core");
const template = require('@babel/template')

const sourceCode = `
//四种声明函数的方式
  function sum(a, b) {
    return a + b;
  }
  const multiply = function (a, b) {
    return a * b;
  };
  const minus = (a, b) => a - b;

  const add = (a,b)=>{
    return a+b
  }
  class Calculator {
    divide(a, b) {
      return a / b;
    }
  }

`;

const autoImportLogPlugin = {
  visitor: {
    // 用来保证此模块内一定会引入一个日志的模块
    Program(path,state) {
      let loggerId;
      // 遍历子节点
      path.traverse({
        ImportDeclaration(path) {
          const { node } = path;
          if (node.source.value === "logger") {
            // 说明导入过了
            const specifiers = node.specifiers[0];
            loggerId = specifiers.local.name;
            path.stop(); // 找到了就跳出循坏 居然还有跳出循环的语句
          }
        },
      });

      if (!loggerId) {
        // 如果loggerId没有值,说明源代码中还没有导入此模块，需要我们手动插入一个import语句
        loggerId = path.scope.generateUid("loggerLib"); // 防止冲突 这又是另外一个api
        // path.node.body.unshift(
        //   types.ImportDeclaration(
        //     [types.importDefaultSpecifier(types.identifier(loggerId))],
        //     types.stringLiteral("logger")
        //   )
        // );
        path.node.body.unshift(template.statement(`import ${loggerId} from logger`)())
      }

      //在state上面挂着一个节点 - loggerLib()
    //   state.loggerNode = types.expressionStatement(
    //     types.callExpression(types.identifier(loggerId), [])
    //   );

      state.loggerNode = template.statement(`import ${loggerId} from 'logger`)();

    },
    // 在函数中插入埋点的loggerLib()
    FunctionDeclaration(path, state) {
      const { node } = path;
      if (types.isBlockStatement(node.body)) {
        // 如果是块级语句
        node.body.body.unshift(state.loggerNode);
      } else {
        //处理没有块级语句的箭头函数
        const newBody = types.blockStatement([
          state.loggerNode,
          //这里应该查找有没有returnStatement？
          types.returnStatement(node.body),
        ]);
        //替换
        node.body = newBody;
      }
    },
    FunctionExpression(path, state) {
      const { node } = path;
      if (types.isBlockStatement(node.body)) {
        // 如果是块级语句
        node.body.body.unshift(state.loggerNode);
      } else {
        //处理没有块级语句的箭头函数
        const newBody = types.blockStatement([
          state.loggerNode,
          //这里应该查找有没有returnStatement？
          types.returnStatement(node.body),
        ]);
        //替换
        node.body = newBody;
      }
    },
    ArrowFunctionExpression(path, state) {
      const { node } = path;
      if (types.isBlockStatement(node.body)) {
        // 如果是块级语句
        node.body.body.unshift(state.loggerNode);
      } else {
        //处理没有块级语句的箭头函数
        const newBody = types.blockStatement([
          state.loggerNode,
          //这里应该查找有没有returnStatement？
          types.returnStatement(node.body),
        ]);
        //替换
        node.body = newBody;
      }
    },
    ClassMethod(path, state) {
        const { node } = path;
        if (types.isBlockStatement(node.body)) {
          // 如果是块级语句
          node.body.body.unshift(state.loggerNode);
        } else {
          //处理没有块级语句的箭头函数
          const newBody = types.blockStatement([
            state.loggerNode,
            //这里应该查找有没有returnStatement？
            types.returnStatement(node.body),
          ]);
          //替换
          node.body = newBody;
        }
      },
  },
};

const targetCode = core.transform(sourceCode, {
  plugins: [autoImportLogPlugin], // 使用插件
});

console.log(targetCode.code);
