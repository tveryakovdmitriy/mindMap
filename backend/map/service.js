import {MindMap} from './model'
import blockSerice from '../block/service'

const mindMapSerice = {

  create: async (mindMapData) => {
    const {blocks, ...restData} = mindMapData
    const mindMap = new MindMap(restData)
    if (blocks && blocks.length) {
      
      const createdBlockList = await blockSerice.bulkCreate(blocks)
      for (const createdBlock of createdBlockList) {
        mindMap.blocks.push(createdBlock)
      }
    }

    try {
      return await mindMap.save()
    } catch(error) {
      throw error
    }
  },

  update: async (mindMapData) => {
    if (!mindMapData._id) {
      return await this.create(mindMapData)
    }

    try {
      return await MindMap.update({_id: mindMapData._id}, mindMapData, {upsert: true})
    } catch (error) {
      throw error
    }
  },

  get: async (filter = {}) => {
    const {_id, ...rest} = filter
    const lookupFunc = _id ? () => MindMap.findById(_id, null, rest) : () => MindMap.findOne(filter)

    try {
      return await lookupFunc()
    } catch(error) {
      throw error
    }
  },

  getMapWithBlocks: async (filter) => {
      try {
        return await MindMap.findOne(filter).populate({path: 'blocks', populate: {path: 'blocks'}})
      } catch (error) {
        throw error
      }
  },

  delete: async (mapId) => {
    const mindMap = await this.get({_id: mapId})

    try {
      return await mindMap.remove()
    } catch(error) {
      throw error
    }
  }
}

export default mindMapSerice