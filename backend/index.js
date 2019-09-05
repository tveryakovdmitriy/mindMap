import express from 'express'
import mongoose from 'mongoose'
import apimiddleware from './middlewares/apimiddleware';


const API_URL = '/api'

const app = express()

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

app.use(API_URL, apimiddleware)
app.use((req, res) => {console.log('test'); res.send('hello world')})

const port = process.env.PORT || '3000'; app.listen(port); 

console.log(`Listening on port ${port}`);