import {Block} from './model'
import mindMapController from '../map/controller'
import traverseTree from '../../helpers/treehelper/traverse'
import addBlockToTree from './helpers/addBlockToTree'

const blockController = {
    createOne: (blockData, mapId) => {
        const block = new Block(blockData)

        const mindMap = mindMapController.get({_id: mapId})

        if (!mindMap) {
            return
        }

        mindMap.blocks.push(block)

        const blockSaveResult = block.save(onError)
        const mapSaveResult = mindMap.save(onError)

        if (blockSaveResult.err || mapSaveResult.err) {
            return { data: null, err: blockSaveResult.err || mapSaveResult.err }
        }

        return {data: block, err: null}
    },

    bulkCreate: async (blocks, mapId) => {
        const mindMap =  await mindMapController.get({_id: mapId})


        if (!mindMap) {
            return
        }

        const blockList = []

        for (const block of blocks) {
            traverseTree(block, addBlockToTree(blockList))
        }

        Block.insertMany(blockList)

        for (const block of blockList) {
            mindMap.blocks.push(block)
        }

        mindMap.save(onError)

    }
}

const onError = (err, data) => {
    if (err) {
        return {data: null, err}
    }

    return {data, err: null}
}

export default blockController