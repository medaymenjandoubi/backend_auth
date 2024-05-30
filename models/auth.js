import mongoose from "mongoose";
const {Schema} =mongoose
const { ObjectId } = mongoose.Types; 
const userSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required : true,
    }, 
    email: {
        type :String,
        trim : true ,
        required: true ,
        unique : true,
    },
    password: {
        type :String,
        required: true ,
        min : 6,
        max: 64,
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
    passwordResetCode: {
        data: String,
        default: "",
    },
},{timeStamps: true}
);
export default mongoose.model("User", userSchema)