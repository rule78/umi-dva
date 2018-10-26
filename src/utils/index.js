function extend(child, parent) {
    for (var i in parent) {
        child[i] = parent[i];
    }
    return child;
}
function formatParams(params) {
    var str = '?'
    for (var key in params) {
        str = `${str}${key}=${params[key]}&`
    }
    var n = str.slice(0,str.length-1)
    return n
}
export  { extend, formatParams }