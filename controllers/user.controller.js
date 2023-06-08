import userSignup from "../mongodb/models/userSignup.js";
// import Statement from "../mongodb/models/transactionDetails.js";
import Statement from "../mongodb/models/userBankAccount.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const createUser = async (req, res) => {
  try {
    const {  name, email, Password } = req.body;
    console.log(req.body);
    const userExists = await userSignup.findOne({ email });
    if (userExists) {
      res.status(500).json({ message: "user already exists" });
      console.log("response", res.statusCode);
    } else {
      bcrypt.hash(Password, 10, function (err, hash) {
        
        const Password = hash;
        const id = uuidv4();
        userSignup.create({ id, name, email, Password });
        res.status(200).json({ message: "User successfully created" });
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userSignup.findOne({ email });
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      bcrypt.compare(password, user.Password, function (err, result) {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }
  
        if (result) {
         
          res.status(200).json({ message: "Login successful",user });
        } else {
          
          res.status(401).json({ message: "Invalid password" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const { userId } = req.body.id;
      const user = await userSignup.findOne({ id: userId });
  
      if (user) {
     
        res.status(200).json({ user });
      } else {
      
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




  const updateAmount = async (req, res) => {
    const { id1, amount1 } = req.body;
    const amount=parseInt(amount1)
    console.log(req.body);
  
    try {
      const statement = await userSignup.findOne({ id: id1 });
      console.log(statement);
      if (!statement) {
        return res.status(404).json({ error: "Statement not found" });
      }
  
      let amountEntry = await Statement.findOne({ id: statement.id });
     console.log(amountEntry);
      if (!amountEntry) {
        // Amount entry doesn't exist, create a new one
        amountEntry = new Statement({
          id: statement.id,
          amount: amount
        });
      } else {
        // Amount entry exists, update the amount field
        amountEntry.amount += amount;
      }
  
      await amountEntry.save();
  
      res.status(200).json(statement);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };

  const getAmount = async (req, res) => {
    const { id } = req.params;
    console.log(req.params,"bodyyyy");
    console.log(id);
    
  
    try {
      const statement = await Statement.findOne({id});
      console.log("veranilla",statement);
      if (!statement) {
        return res.status(404).json({ error: "Statement not found" });
      }
      
      res.status(200).json({ amount: statement.amount });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  
  



  
  

export { createUser,login,getUserById,updateAmount,getAmount };
