import { Block } from '../model'

const addBlockToTree = function (blockList) {
  let parentBlock = null

  return function(blockData) {
    const {blocks: childBlockList, ...blockDataToCreate} = blockData

    const block = new Block(blockDataToCreate)
    blockList.push(block)

    if (parentBlock) {
      parentBlock.blocks.push(block)
    }

    parentBlock = childBlockList && childBlockList.length ? block : null
  }
}

export default addBlockToTree