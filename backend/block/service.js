import {Block} from './model'
import mindMapService from '../map/service'
import traverseTree from '../../helpers/treehelper/traverse'
import addBlockToTree from './helpers/addBlockToTree'

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

    bulkCreate: async (blocks) => {
        const blockList = []

        for (const block of blocks) {
            traverseTree(block, addBlockToTree(blockList))
        }
        try {
           return await Block.insertMany(blockList)
        } catch (error) {console.log(error)}
    },

    bulkDelete: async (blockIds) => {
        const parents = Block.find({_id: {$in:[blockIds]}})
        try {
            return await Block.deleteMany( {_id:{ $in: blockIds}})
        } catch(error) {
            throw error
        }
    },

    bulkUpdate: async (newBlockDataList, oldBlockDataList) => {
        const mindMap = await mindMapService.get({_id: mapId})

        if (!mindMap) {return}
        

        const dataToDelete = [...oldBlockDataList].reduce((result, currentBlock) =>  {
            if (!newBlockDataList.find(block => block._id && block._id === currentBlock._id)) {
                result.push(currentBlock)
            }
        })

        try {
          if (dataToDelete.length) {
              Block.deleteMany({id: {$in: [dataToDelete.map(block => block._id)]}})
          }  

          if (newBlockDataList.length) {
              Block.updateMany({})
          }
        } catch (error) {
            throw error
        }

    }

    
}

export default blockSerice