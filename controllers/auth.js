import User from '../models/auth'
import { hashPassword,comparePassword } from '../utils/auth'
export const register = async (req,res) => {
    // console.log(req.body)
    // res.json("register user response from controller")
    try {
        // console.log(req.body)
        const {name,email,password} = req.body
        if (!name) return res.status(400).send("Name is required")
        if(!password || password.length <6 ) {
            return res
                .status(400)
                .send("Password is required and should be minimum 6 characters long")
        } 
        let userExist = await User.findOne({email}).exec();
        if (userExist) return res.status(400).send("Email is taken");

        //hash password 
        const hashedPassword = await hashPassword(password)

        //register
        const user = new User({
            name,email,password: hashedPassword
        }).save()

        console.log('saved used', user)
        return res.json({ok : true});
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error. Try Again')
    }
}