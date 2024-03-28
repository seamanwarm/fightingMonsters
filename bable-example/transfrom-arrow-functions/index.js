const arrowFunctionPlugin = {
    visitor:{
        ArrowFunctionExpression(path){
            let {node} = path;
            node.type = 'FunctionExpress'
        }
    }
}

module.export =  arrowFunctionPlugin