import {MindMap} from './model'

const mindMapSerice = {

  create: async function(mindMap) {
    const newMindMap = new MindMap(mindMap)

    try {
      return await newMindMap.save()
    } catch (error) {
      throw error
    }
  },

  update: async function(_id, mindMap) {
    try {
      return await MindMap.updateOne({_id}, mindMap)
    } catch (error) {
      throw error
    }
  },

  delete: async function(mapId) {
    const mindMap = await this.getById(mapId)

    if (!mindMap) {
      throw {status: 404, message: 'mind map not found'}
    }

    try {
      return await mindMap.remove()
    } catch(error) {
      throw error
    }
  },

  getById: async function(_id, filter = {}, options = {}) {
    try {
      return await MindMap.findById(_id, filter, options)
    } catch(error) {
      throw error
    }
  },

  getAll: async function() {
    try {
      return await MindMap.find()      
    } catch(error) {
      throw error
    }
  },

  bulkDelete(filter) {
    try {
      MindMap.deleteMany(filter)
    } catch(error) {
      throw error
    }
  }
}

export default mindMapSerice