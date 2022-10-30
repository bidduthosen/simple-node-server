const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000 ;


const users = [
    {id: 1, name: 'nahid inbe safi', email: 'nahid@gmail.com'},
    {id: 2, name: 'pcd pranto', email: 'pcdpranto@gmail.com'},
    {id: 3, name: 'Ashik billah', email: 'ashikbillah@gmail.com'}
];



app.get('/', (res, req)=>{
    req.send("simple node server running");
});


app.use(cors());
app.use(express.json())

app.get('/users', (req, res)=>{
    res.send(users);
});

app.post('/users', (req, res)=>{
    // console.log('api called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    res.send(user);
})

app.listen(port, (res, req)=>{
    console.log(`simple node server running on port ${port}`);
});