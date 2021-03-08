export function queryEach(query, callback) {
  const node = document.querySelectorAll(query);
  if (node) {
    for (let i=0; i<node.length; i++) {
      callback(node[i]);
    }
  } else {
    return false;
  }
}
export function queryEachChild(parentNode, query) {
  if (parentNode) {
    const node = parentNode.querySelectorAll(query);
    if (node) {
      for (let i=0; i<node.length; i++) {
        callback(node[i]);
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export function queryEachEvent(query, event, callback) {
  const node = document.querySelectorAll(query);
  if (node) {
    for (let i=0; i<node.length; i++) {
      node[i].addEventListener(event, function() {
        callback(node[i]);
      });
    }
  } else {
    return false;
  }
}