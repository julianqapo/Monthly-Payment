const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const users = require("./users")
const lookPretty = require("js-beautify")

const port = 8080

app.set("view engine", "ejs")

//handle post request
app.use(express.urlencoded({extended : false}))

//change views location
app.set("views",path.join(__dirname, "vie") )
app.get("/", (req,res)=> res.render("years", {users : users}))
app.get("/:id", (req,res)=> {
    
    Object.keys(users).filter(e=>{
        if (req.params.id.trim() == e){
            res.render("index",{users : users[e],
            year : e,
            url : req.params.id} )
            console.log(e)
        }
    })
    
})

//adding new year

app.post("/addyear", (req,res)=>{
    //from
    let year = req.body.year
    let x = Object.keys(users)
    let last = x[x.length -1]
    if (year == Number(last) +1){
        users[year] = users[last]
    let z = JSON.stringify(users)
    fs.writeFileSync("users.json", lookPretty(z))
    res.render("years", {users : users})
    } else{
        res.send("you have added incorrect year")
    }   
})



//adding user

app.get("/:id/adduser", (req,res)=>{
    res.render("addUser", {url : req.params.id})
    res.end
})

app.post("/:id/adduser", (req,res)=>{
        let user = {
        name : req.body.name,
        number : req.body.number,
        username : req.body.username,
        password : req.body.password,
        type : req.body.type,
        jan : "",
        feb : "",
        march : "",
        april:"",
        may : ""
        }
        let year = req.params.id.trim()
        users[year].push(user)
        let finalusers = JSON.stringify(users)
        res.render("addedsuc", {user : user,
                                url : req.params.id.trim()})
        fs.writeFileSync("users.json", finalusers)
    })
    //to here
    /*
    users.push(user)
    console.log(user)
    let finalusers = JSON.stringify(users)
    res.render("addedsuc", {user : user})
    fs.writeFileSync("users.json", finalusers)
    */


app.listen(port, ()=> console.log(`listening to port : ${port}`))

