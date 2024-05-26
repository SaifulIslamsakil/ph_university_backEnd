import { z } from "zod";


const userValidationSchema = z.object({
    id: z.number(),
    password: z.string().max(20, {message:"password can be more then 20 chatetars"}),
    needsPasswordChange: z.boolean().optional().default(true),
    role: z.enum(["admin", "faculty", "student"]),
    status: z.enum(["in_progress", "blocked"]).default("in_progress"),
    isDeleted: z.boolean()
}) 

export default userValidationSchema
