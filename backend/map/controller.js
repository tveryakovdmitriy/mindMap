import {MindMap} from './model'
import blockController from '../block/controller'
import handleErrors from '../helpers/handleErrors'

const mindMapController = {

  create: (mindMapData) => {
    const {blocks, ...restData} = mindMapData
    const mindMap = new MindMap(restData)

    mindMap.save(function(err,res) {
      if (!err) {
        blockController.bulkCreate(blocks, res._id)
      }
    })
  },

  get: async (filter = {}) => {
    const {_id, ...rest} = filter
    const lookupFunc = _id ? () => MindMap.findById(_id, null, rest) : () => MindMap.findOne(filter)

    return await lookupFunc()
  },

  getMapWithBlocks: async (filter) => {
      return await MindMap.findOne(filter).
      populate({path: 'blocks', populate: {path: 'blocks'}})
  },

  delete: async (mapId) => {
    const mindMap = await MindMap.findById(mapId)

    if (mindMap) {
      mindMap.remove({_id: mapId})
    }

  }
}

export default mindMapController