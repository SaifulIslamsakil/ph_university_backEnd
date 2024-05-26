import { Schema, model } from "mongoose";
import { Tuser } from "./users.interface";

const UserSchema = new Schema<Tuser>({
    id:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    needsPasswordChange:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        enum:["admin", "faculty", "student"]
    },
    status:{
        type:String,
        enum:["in_progress","blocked"],
        default:"in_progress"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
})

const UserModel = model<Tuser>("User", UserSchema)

export default UserModel