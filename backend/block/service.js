import {Block} from './model'
import mindMapService from '../map/service'
import { MindMap } from '../map/model'
import mindMapSerice from '../map/service'
import mongoose from 'mongoose'

const blockService = {

    getAll: async function(mapId) {
        try {
            const mindMap = await mindMapSerice.getById(mapId, {}, {populate: 'blocks'})
            return mindMap.blocks
        } catch(error) {
            throw error
        }
    },

    getById: async function(blockId) {
        try {
            return await Block.findById(blockId)
        } catch(error) {
            throw error
        }
    },

    create: async function(mapId, blockData) {
        const block = new Block(blockData)

        const mindMap = await mindMapService.getById(mapId)

        mindMap.blocks.push(block)

        try {
            mindMap.save()
            return await block.save()
        } catch (error) {
            throw error
        }
    },

    update: async function(blockId, block) {
        try {
            return await Block.updateOne({_id: blockId}, block)
        } catch(error) {
            throw error
        }
    },

    delete: async function(mapId, blockId) {
        try {
            const mindMap = await mindMapSerice.getById(mapId)            
            mindMap.blocks = mindMap.blocks.filter(id => !blockId.equals(id))
            mindMap.save()
            return await Block.deleteOne({_id: blockId})            
        } catch(error) {
            throw error
        }
    }
    
}

export default blockService