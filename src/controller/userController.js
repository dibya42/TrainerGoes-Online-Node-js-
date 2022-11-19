const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validate = require('validator');
const axios = require('axios');
const url = require("url");

const isValid = function(value){
    if(typeof value === 'undefined' || value === null)
    return false
    return true;
}

const isValidRequestBody = function(requestBody){     //Object.keys() ====> It returns an array of a given object
    return Object.keys(requestBody).length > 0
}


const createUser = async function (req, res) {
    try {

        let body = req.body;

        if (!isValidRequestBody(body)) {
            res.status(400).send({ status: false, msg: "Please provide valid details" })
            return
        }

        const { email, password } = body;

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: 'Email is required' })
            return
        }

        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: 'Password is required' })
            return
        }

        const isEmailAlreadyUsed = await userModel.findOne({ email }); // {email: email} object shorthand property

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, msg: `${email} email address is already exist` })
            return
        }

        const userData = { email, password }
        const saveUser = await userModel.create(userData);

        res.status(201).send({ status: false, msg: 'User created sucessfully', data: saveUser });

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }

}

const loginUser = async function (req, res) {
    try {

        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg: 'Invalid requeat, please provide login details' })
            return
        }

        // Exatract params
        const { email, password } = requestBody;

        //validation starts 

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: 'Email is required' })
            return
        }

        if (!(validate)) {
            res.status(400).send({ status: false, msg: 'Enter a valid email' })
            return
        }

        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: 'Password is required' })
            return
        }

        const findUser = await userModel.findOne({ email, password });

        if (!findUser) {
            res.status(401).send({ status: false, msg: 'Invalid login credentials' })
            return
        }

        const genToken = jwt.sign({
            userId: findUser._id.toString()
        }, "trainerGoes online");
        res.header('x-api-key', genToken)
        res.status(200).send({ status: true, msg: 'User Login Successfull', userId:findUser._id,data: genToken });

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }


}


const axiousCall = async function(req,res){
    try{

       
        const queryParams = req.query;
        const params = new url.URLSearchParams(queryParams);
        console.log(params);
        axios
          .get(` https://trackapi.nutritionix.com/v2/search/instant${params}`)
          .then(function (response) {
            console.log(response.data)
            res.status(200).send({status: ture, msg:"data",data:response.data});
          });



    }catch(error){
        console.log(error)
        res.status(500).send({msg: error.message})
    }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.axiousCall = axiousCall;


