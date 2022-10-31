const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000 ;


app.use(cors());
app.use(express.json())

const users = [
    {id: 1, name: 'nahid inbe safi', email: 'nahid@gmail.com'},
    {id: 2, name: 'pcd pranto', email: 'pcdpranto@gmail.com'},
    {id: 3, name: 'Ashik billah', email: 'ashikbillah@gmail.com'}
];



// userName: dbUser1
// password: KOjTpnMc6qzWclSA

const uri = "mongodb+srv://dbUser1:KOjTpnMc6qzWclSA@cluster0.og8pjeq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const userCollection = client.db('simpleNone').collection('users');

        app.get('/users', async (req, res)=>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        });

        app.post('/users', async (req, res)=>{
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result)
            user._id = result.insertedId;
            res.send(user);

        })
    }
    finally{

    }
}
run().catch((err)=> console.log(err));



app.get('/', (res, req)=>{
    req.send("simple node server running");
});



// app.get('/users', (req, res)=>{
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLocaleLowerCase().indexOf(search) >= 0)
//         res.send(filtered);
//     }
//     else{
//         res.send(users);
//     }
// });

// app.post('/users', (req, res)=>{
//     // console.log('api called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     res.send(user);
// })

app.listen(port, (res, req)=>{
    console.log(`simple node server running on port ${port}`);
});