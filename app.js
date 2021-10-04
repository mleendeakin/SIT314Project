const express = require('express')
const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
const path = require('path')
const app = express()

//Mongo
const mongoose = require('mongoose');
const LightData = require('./models/lightData');
mongoose.connect('mongodb+srv://mleen:test@sit314.pzt0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')





//mqtt info
let topic = 'Mleen/Building'
let message = 'test test'



app.use(express.static('./web-app'))
app.use(express.json({limit: '1mb'}))

app.get('/',(req,res)=>{
    res.json([{name:'john'}, {name:'Michael'}])
})



client.on('connect', () =>{
    console.log('serverside mqtt connected')
    client.publish(topic, message)

    app.post('/api',(req,res)=>{
        console.log('We got a request!')
        console.log(req.body)
        const data = req.body
        res.json({
            status:'success',
            lightStatus: data.lightStatus
        })
        

        client.publish(topic, JSON.stringify({data}))


        //mongo save
        const newLightData = new LightData({
            levelID: data.levelID,
            roomID: data.roomID,
            lightStatus: data.lightStatus,
            time: Date.now(),
        })
            
        

        newLightData.save().then(doc => {
            console.log('Light Data sent to Mongo');
        }).then(() => {
            //try add something to close the connection via user input?
        })


    })
})



app.listen(5000, ()=>{
    console.log('listening on port 5000...')
})

// app.all('*', (req,res)=>{
//     res.status(200).status(404).send('<h1> Page not found </h1>')
// })