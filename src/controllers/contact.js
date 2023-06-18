const Joi = require("joi")
const Contact = require("../models/contact")
const jwt = require("jsonwebtoken")


const sendMessage = async(req, res) =>{
    try{
        const token = await req.headers["authorization"].split(" ")[1];
        const {message } = req.body;

        console.log(req.body);
        const userID = await jwt.verify(token, process.env.JWT_KEY);
        const id = userID.id;
        console.log(id);
  const scheme = Joi.object({
    message: Joi.string().required()    

  });
  const { error } = scheme.validate({ message });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
 
  const newUser = await Contact.contactadd(message,id);
  return res.status(200).json({ message: "successfully sent", new:newUser });
    }catch(error){
    // return res.status(500).json({message:error.message})
    console.log(error.message);
    }
}

const getAllcontacts = async (req, res) => {
  try {
    const contacts = await Contact.getcontact();
    return res.status(200).json({contacts:contacts});
  }catch (error) {
    console.log(error.message);
  }
}

module.exports = {sendMessage, getAllcontacts}