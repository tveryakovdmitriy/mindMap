import {Block} from './model'
import mindMapService from '../map/service'
import traverseTree from '../../helpers/treehelper/traverse'
import addBlockToTree from './helpers/addBlockToTree'
import { MindMap } from '../map/model'

const blockSerice = {
    createOne: async (blockData, mapId) => {
        const block = new Block(blockData)

        const mindMap = await mindMapService.get({_id: mapId})

        if (!mindMap) {
            return 
        }

        mindMap.blocks.push(block)

        try {
            mindMap.save()
            return await block.save()
        } catch (error) {
            throw error
        }
    },
    
}

export default blockSerice