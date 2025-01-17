
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import userModel from '../models/user.js'
import { createToke } from '../middlewares/auth.js'
const  saltRounds = 10

const registerUserController = async(req,res) => {

    const {password, ...otherDatauser} = req.body

    const hashedPassword = await bcrypt.hash(password,saltRounds)
    
    const userData ={
        id:uuidv4(),
        password:hashedPassword,
        ...otherDatauser
    }
    try {
        const user = await userModel.registerUserModel(userData)
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }

}



const loginUserController = async (req,res) => {

    const {username, password} = req.body

    try {
        const user = await userModel.loginUserModel(username,password)
        delete user.password
        const token = createToke(user)

        res.status(200).json({user,token})

    } catch (error) {
        res.status(500).json(error.msg)
    }


}


export {
    registerUserController,
    loginUserController
}
