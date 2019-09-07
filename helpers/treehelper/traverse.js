const traverseTree = function(root, callback) {
  callback(root)
  const childNodeList = root.blocks
  if (!childNodeList || !childNodeList.length) {
    return
  }

  for (const childNode of childNodeList) {
    traverseTree(childNode, callback)
  }
}

export default traverseTree