require('dotenv').config()
const express = require('express')
const Hubspot = require('hubspot')
const cors = require('cors')
const helmet = require("helmet");
const jsonParser = express.json();
const app = express()
const { api_key } = require("./config");

app.use(cors())
app.use(helmet());
app.use(express.json());



app.post("/",  jsonParser,(req,res,next)=>{
    let {firstname,lastname,email, phone,company}=req.body;
    let newContact = {"properties":[
            { "property": "firstname","value": firstname },
            { "property": "lastname","value": lastname },
            { "property": "email", "value": email},
            { "property": "phone", "value": phone },
            { "property": "company", "value": company }
    ]
    }
    const hubspot = new Hubspot({ apiKey: api_key });
    hubspot.contacts.create(newContact)
    .then(newContact =>{
        console.log(newContact)
        res.send('User is added')
    }).catch(next)
})


module.exports = app















