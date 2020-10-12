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
    let {firstname,lastname,company, email, phone}=req.body;
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
        return res.json({
            error: 'Information added to our database!',
          });
    }).catch(next)
})


module.exports = app















