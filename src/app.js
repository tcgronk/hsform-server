require('dotenv').config()
const express = require('express')
const Hubspot = require('hubspot')
var cors = require('cors')
const jsonParser = express.json();
const app = express()

app.use(cors())

app.get('/', (request, response) => {
    let apiKey='c4861f90-7f85-4f56-9330-183e75299607';
    let hubspot = new Hubspot({ apiKey: apiKey });
    hubspot.contacts.getAll().then(results => {
        response.send(results)
      })

})

app.post("/",  jsonParser,(req,res)=>{
    let apiKey='c4861f90-7f85-4f56-9330-183e75299607';
    let hubspot = new Hubspot({ apiKey: apiKey });
    let {firstname, email, phone}=req.body;
    let newContact = {"properties":[
            { "property": "firstname","value": firstname },
            { "property": "email", "value": email},
            { "property": "phone", "value": phone }
    ]
    }
    
    hubspot.contacts.create(newContact).then(results=>{
        res.send(results)
    });


})


module.exports = app















