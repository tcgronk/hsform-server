require('dotenv').config()
const express = require('express')
const hubspot = require('@hubspot/api-client')
const cors = require('cors')
const helmet = require("helmet");
const app = express()
const { api_key } = require("./config");

app.use(cors())
app.use(helmet());
app.use(express.json());

const logResponse = (data) => {
    console.log('Response from API', JSON.stringify(data, null, 1))
}

app.get('/', async (req, res) => {
    res.redirect('/contacts')
})
app.post("/", async(req,res)=>{
    try{

    let properties = req.body
    
    const hubspotClient = new hubspot.Client({ apiKey: api_key });
    const createResponse = await hubspotClient.crm.contacts.basicApi.create({properties})
    logResponse(createResponse)
    res.send(res.json())
    } catch(e){
        console.log("error")
    }
})


module.exports = app















