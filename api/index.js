const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json());


// fake usedRules  server memories
const users = [
    {
        id: "1",
        name: "John",
        password: "John0908",
        isAdmin: true,
    }, {
        id: "2",
        name: "Jane",
        password: "Jane0908",
        
    }
];


app.post("/api/login", (req, res) => {

   const {username,password} =req.body;
   const user = users.find((u) =>{
       return u.username ===username && u.password ===password;
   });

   if(user){
       // generate an access token for
       const accessToken =jwt.sign(
           {id:user.id,
            isAdmin:user.isAdmin,
        },
        "mySecretKey"
       );
       res.json({
           username:user.username,
           isAdmin:user.isAdmin,
           accessToken,
       })
   }else{
       res.status(400).json("username or password incorrect")
   }

   
});


app.listen(5000, () => {
    console.log(`Backend server is running now`)
}) 