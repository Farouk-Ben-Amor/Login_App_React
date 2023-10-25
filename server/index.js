const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const EmployeeModel = require('./models/Employee')
app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://farouk:farouk1919@mydb.mxhyr0e.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post("/login",(req,res) =>{
  const {email,password} = req.body
  EmployeeModel.findOne({email:email})
  .then(user=>{
    if(user) {
      if(user.password ===password) {
        res.json("Success")
      }else{
        res.json("The password is incorrect")
      }
    }else{
      res.json("No record existed")
    }
  })
} )
app.post('/register',(req,res) =>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err=>res.json(err))

})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.listen(3001, () => {
  console.log('Server is running');
});
