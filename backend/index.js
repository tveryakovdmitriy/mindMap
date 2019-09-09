import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import apimiddleware from './middlewares/apimiddleware';
import Block from './block/model'
import MindMap from './map/model'

import {connectOptions} from '../database/config'
import mindMapController from './map/controller';

const API_URL = '/api'

const app = express()
try {
  mongoose.connect('mongodb://localhost:27017/myapp', connectOptions);
}catch(error) {
  console.log(`error occured while initial connection to database, error: ${error}`)
}

mongoose.connection.on('error', error => {
  console.log(`database error occured ${error}`)
});

// mindMapController.delete('5d7225b98bf9e66e6fe1a6c7')

// const testMindMap = {
//   name: 'test',
//   blocks: [{title: '1'}, {title: '2'}, {title: '3'}]
// }

// mindMapController.create(testMindMap)

mindMapController.delete('5d75db1ad25bed2bb137f481')

app.use(bodyParser.json());
app.use(API_URL, apimiddleware)
app.use((req, res) => {console.log('test'); res.send('hello world')})

const port = process.env.PORT || '3000'; app.listen(port); 

console.log(`Listening on port ${port}`);