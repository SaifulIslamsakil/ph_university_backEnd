import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { Tuser } from "./users.interface";

const UserSchema = new Schema<Tuser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["admin", "faculty", "student"]
    },
    status: {
        type: String,
        enum: ["in_progress", "blocked"],
        default: "in_progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    })

UserSchema.pre("save", async function (next) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
})

UserSchema.post("save", function (doc, next) {
    doc.password = ""
    next()
})

const UserModel = model<Tuser>("User", UserSchema)

export default UserModel