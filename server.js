const { response } = require('express')
const express = require('express')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

let users = [] //// todo:to persist

app.get('/users',(request,response)=>{
    response.json(users)
})

app.post('/users',async (request,response)=>{
    try {
        const salt = await bcrypt.genSalt() //default is 10
        const hashedPassword = await bcrypt.hash( request.body.password,salt)
        console.log(request.body)
        const user = {
            name:request.body.name,
            password:hashedPassword

        }
        users.push(user)
        response.status(201).send()
        console.log(users)
    } catch (error) {
        response.status(500).send()
        
    }
    
    

})
app.post('/users/login',async (request,response)=>{

    const user = users.find(user=>user.name === request.body.name)
    if(users===null){return response.status(400).send("user doesnt exist")}
    try {
       const isValidPassword = await bcrypt.compare(request.body.password, user.password)
       isValidPassword?response.send("success"):response.send("not Allowed")       
    } catch (error) {
        response.status(500).send()
        
    }
    
    

})

app.post('/comments',(request,response)=>{
    console.log(request.body)
    const user = {
        name:request.body.userName,
        description:request.body.description

    }
    users.push(user)
    response.status(201).send()
    console.log(users)

})

app.listen(3000)

console.log(":::::::runinng")
console.log(":::::::users",users)