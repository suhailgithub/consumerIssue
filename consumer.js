const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  

  
  app.use(bodyParser.json())

app.post("/consumer", (request, response) =>{
    console.log("POST in Consumer is called")
    console.log(request.body);
    response.status(200);
    response.send("success")
})

app.get("/consumeData", (request, response) =>{
    console.log("calling from consumer ----> ")
    axios.get("http://localhost:3001/consumeData",{timeout: 10}
    ).then(result =>{
        console.log(result.data);
        response.status(200)
        response.send(JSON.stringify(result.data))
    }).catch(error =>{
        response.status(500)
        response.send(error)
        console.log(error.message);
    });
})

app.get("/consumeDataAsync", (request, response) =>{
    axios.get("http://localhost:3001/consumeDataAsync",{timeout: 10}
    ).then(result =>{
        console.log(result.data);
        response.status(200)
        response.send(JSON.stringify(result.data))
    }).catch(error =>{
        response.status(500)
        response.send(error)
        console.log(error);
    });
})



app.listen(3000,()=>{
    console.log("consumer has started on port 3000")
})