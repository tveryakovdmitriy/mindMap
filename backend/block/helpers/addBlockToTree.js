import { Block } from '../model'

const addBlockToTree = function (blockList) {
  let parentBlock = null

  return function(blockData) {
    const {blocks: childBlockList, ...blockDataToCreate} = blockData

    const block = new Block(blockDataToCreate)
    blockList.push(block)

    if (parentBlock) {
      block.parentId = parentBlock._id
    }

    parentBlock = childBlockList && childBlockList.length ? block : null
  }
}

export default addBlockToTree