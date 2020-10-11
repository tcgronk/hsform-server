require('dotenv').config()
const express = require('express')
const Hubspot = require('hubspot')
var cors = require('cors')
const jsonParser = express.json();
const app = express()

app.use(cors())

app.get('/', (request, response,next) => {
    let apiKey='c4861f90-7f85-4f56-9330-183e75299607';
    let hubspot = new Hubspot({ apiKey: apiKey });
    hubspot.contacts.getAll().then(results => {
        response.send(results)
      }).catch(next);

})

app.post("/",  jsonParser,(req,res,next)=>{
    let apiKey='c4861f90-7f85-4f56-9330-183e75299607';
    let hubspot = new Hubspot({ apiKey: apiKey });
    let {firstname, email, phone}=req.body;
    if(phone.length<10){
        console.log('phone error')
        return res.status(400).json({error: "Phone number error. Please try again"})
    }


    let newContact = {"properties":[
            { "property": "firstname","value": firstname },
            { "property": "email", "value": email},
            { "property": "phone", "value": phone }
    ]
    }

    hubspot.contacts.create(newContact)
    .then(newContact =>{
        return res.json({
            error: 'Information added to our database!',
          });
    }).catch(next)
})


module.exports = app















