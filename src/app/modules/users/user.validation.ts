import { z } from "zod";


const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error:"password must be string"
    }).max(20, {message:"password can be more then 20 chatetars"}).optional(),

}) 

export default userValidationSchema
