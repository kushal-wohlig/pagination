const express = require('express');

const app = express();
const mongoose = require('mongoose');
const users = require('./users');
mongoose.connect("mongodb+srv://kushal-wohlig:Wohlig%40123@cluster0.vbyug.mongodb.net/sample_airbnb?retryWrites=true&w=majority");
const db= mongoose.connection
db.once('open', async() =>{
    if(await users.countDocuments().exec()) return

    Promise.all([
        users.create({name:"User 1"}),
        users.create({name:"User 2"}),
        users.create({name:"User 3"}),
        users.create({name:"User 4"}),
        users.create({name:"User 5"}),
        users.create({name:"User 6"}),
        users.create({name:"User 7"}),
        users.create({name:"User 8"}),
        users.create({name:"User 9"}),
        users.create({name:"User 10"})

    ])
})
const users1 = [
    {
        id:1,
        name:"User 1"
    },
    {
        id:2,
        name:"User 2"
    },
    {
        id:3,
        name:"User 3"
    },
    {
        id:4,
        name:"User 4"
    },
    {
        id:5,
        name:"User 5"
    },
    {
        id:6,
        name:"User 6"
    },
    {
        id:7,
        name:"User 7"
    },
    {
        id:8,
        name:"User 8"
    },
    {
        id:9,
        name:"User 9"
    },
    {
        id:10,
        name:"User 10"
    },
];

//paginate users array
app.get('/users',paginatedData(users), (req,res) =>{

    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);
    // const startIndex = (page -1)*limit;

    // const endIndex = page*limit;
    // const result = users.slice(startIndex,endIndex);
    // res.json(result);
    res.json(res.paginatedResult);
}); 

function paginatedData(model){
    return async(req,res,next) =>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page -1)*limit;

        const endIndex = page*limit;

        const results={};
        if(startIndex>0)
        {
            results.previous={
                page:page-1,
                limit:limit
            };
        }

        if(endIndex< await model.countDocuments().exec()){
            results.next={
                page:page+1,
                limit:limit
            };
        }
        try{
            const result = await model.find().limit(limit).skip(startIndex).exec();

            res.paginatedResult=result;
            next();
        }
        catch(e){
            res.status(500).json({message:e.message})
        }
    }
}


app.listen(3000,()=> {
    console.log('Server is listening on port 3000');
});
